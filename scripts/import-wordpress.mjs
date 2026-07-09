import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourceFile = process.argv[2];
const mediaDir = path.resolve('public/wordpress-media');
const outputFile = path.resolve('src/wordpress-posts.json');

if (!sourceFile) {
  console.error('Usage: node scripts/import-wordpress.mjs /path/to/wordpress-export.xml');
  process.exit(1);
}

const xml = await readFile(sourceFile, 'utf8');
const itemBlocks = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => match[1]);

const attachments = new Map();
const attachmentsByParent = new Map();
const posts = [];
const remoteUrls = new Set();

function stripCdata(value = '') {
  return value
    .replace(/^<!\[CDATA\[/, '')
    .replace(/\]\]>$/, '')
    .trim();
}

function decodeXml(value = '') {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'");
}

function tag(block, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = block.match(new RegExp(`<${escaped}[^>]*>([\\s\\S]*?)<\\/${escaped}>`));
  return match ? decodeXml(stripCdata(match[1])) : '';
}

function rawTag(block, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = block.match(new RegExp(`<${escaped}[^>]*>([\\s\\S]*?)<\\/${escaped}>`));
  return match ? stripCdata(match[1]) : '';
}

function postMeta(block) {
  const meta = {};
  const matches = [...block.matchAll(/<wp:postmeta>([\s\S]*?)<\/wp:postmeta>/g)];
  for (const [, metaBlock] of matches) {
    const key = tag(metaBlock, 'wp:meta_key');
    const value = tag(metaBlock, 'wp:meta_value');
    if (key) meta[key] = value;
  }
  return meta;
}

function categories(block, domain) {
  const matches = [...block.matchAll(/<category\b([^>]*)>([\s\S]*?)<\/category>/g)];
  return matches
    .filter(([, attrs]) => attrs.includes(`domain="${domain}"`))
    .map(([, , value]) => decodeXml(stripCdata(value)))
    .filter(Boolean);
}

function cleanContent(value = '') {
  return value
    .replace(/<!--\s*\/?wp:[\s\S]*?-->/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function stripHtml(value = '') {
  return decodeXml(value)
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function summarize(content, fallback = '') {
  const text = stripHtml(fallback || content);
  return text.length > 190 ? `${text.slice(0, 187).trim()}...` : text;
}

function slugFromUrl(url) {
  try {
    return decodeURIComponent(new URL(url).pathname.split('/').filter(Boolean).pop() || 'image');
  } catch {
    return 'image';
  }
}

function safeFilename(url, index) {
  const parsed = slugFromUrl(url).replace(/[^a-zA-Z0-9._-]/g, '-');
  const ext = path.extname(parsed) || '.jpg';
  const base = path.basename(parsed, ext).slice(0, 90) || 'wordpress-image';
  return `${String(index).padStart(3, '0')}-${base}${ext}`;
}

function collectImageUrls(content) {
  const urls = [...content.matchAll(/https?:\/\/blog\.kritechsolution\.com\/wp-content\/uploads\/[^\s"'<>),]+/g)]
    .map((match) => match[0].replace(/&amp;/g, '&'));
  for (const url of urls) remoteUrls.add(url);
}

function normalizeKritechContact(content = '') {
  return content
    .replaceAll('info@blog.kritechsolution.com', 'info@kritechsolution.com')
    .replaceAll('https://www.blog.kritechsolution.com/', 'https://www.kritechsolution.com/')
    .replaceAll('http://www.blog.kritechsolution.com/', 'https://www.kritechsolution.com/')
    .replaceAll('https://www.blog.kritechsolution.com', 'https://www.kritechsolution.com')
    .replaceAll('http://www.blog.kritechsolution.com', 'https://www.kritechsolution.com')
    .replaceAll('www.blog.kritechsolution.com', 'www.kritechsolution.com')
    .replaceAll('https://blog.kritechsolution.com/', 'https://www.kritechsolution.com/')
    .replaceAll('http://blog.kritechsolution.com/', 'https://www.kritechsolution.com/')
    .replaceAll('https://blog.kritechsolution.com', 'https://www.kritechsolution.com')
    .replaceAll('http://blog.kritechsolution.com', 'https://www.kritechsolution.com');
}

for (const block of itemBlocks) {
  const postType = tag(block, 'wp:post_type');
  const postId = tag(block, 'wp:post_id');
  const parent = tag(block, 'wp:post_parent');
  const attachmentUrl = tag(block, 'wp:attachment_url');

  if (postType === 'attachment' && attachmentUrl) {
    attachments.set(postId, attachmentUrl);
    remoteUrls.add(attachmentUrl);
    if (!attachmentsByParent.has(parent)) attachmentsByParent.set(parent, []);
    attachmentsByParent.get(parent).push(attachmentUrl);
    continue;
  }

  if (postType !== 'post') continue;

  const status = tag(block, 'wp:status');
  if (!['publish', 'draft'].includes(status)) continue;

  const meta = postMeta(block);
  const content = cleanContent(rawTag(block, 'content:encoded'));
  collectImageUrls(content);

  const postCategories = categories(block, 'category').filter((item) => item !== 'Uncategorized');
  const tags = categories(block, 'post_tag');
  const thumbnailId = meta._thumbnail_id;
  const firstImage = attachments.get(thumbnailId) || attachmentsByParent.get(postId)?.[0] || [...content.matchAll(/https?:\/\/blog\.kritechsolution\.com\/wp-content\/uploads\/[^\s"'<>),]+/g)][0]?.[0] || '';
  if (firstImage) remoteUrls.add(firstImage);

  const title = tag(block, 'title');
  const slug = tag(block, 'wp:post_name') || slugify(title);
  const description = meta.rank_math_description || meta._yoast_wpseo_metadesc || summarize(content, rawTag(block, 'excerpt:encoded'));

  posts.push({
    id: `wp-${postId}`,
    wpPostId: postId,
    title,
    slug,
    excerpt: summarize(content, rawTag(block, 'excerpt:encoded') || description),
    category: postCategories[0] || inferCategory(tags) || 'Blog',
    author: tag(block, 'dc:creator') || 'Kritech Team',
    date: (tag(block, 'wp:post_date') || tag(block, 'pubDate')).slice(0, 10),
    status: status === 'publish' ? 'Published' : 'Draft',
    tags,
    focusKeyword: tags[0] || '',
    canonicalUrl: `https://kritechsolution.com/blog/${slug}`,
    originalUrl: tag(block, 'link'),
    metaTitle: meta.rank_math_title || title,
    metaDescription: description,
    seoTitle: meta.rank_math_title || title,
    seoDescription: description,
    ogTitle: meta.rank_math_facebook_title || meta.rank_math_title || title,
    ogDescription: meta.rank_math_facebook_description || description,
    noIndex: false,
    scheduledAt: '',
    content,
    featuredImage: firstImage,
    cloudinaryPublicId: ''
  });
}

await mkdir(mediaDir, { recursive: true });

const urlMap = new Map();
let imageIndex = 1;
for (const url of remoteUrls) {
  const filename = safeFilename(url, imageIndex);
  const localPath = path.join(mediaDir, filename);
  const publicPath = `/wordpress-media/${filename}`;
  imageIndex += 1;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(localPath, buffer);
    urlMap.set(url, publicPath);
  } catch (error) {
    console.warn(`Could not download ${url}: ${error.message}`);
  }
}

for (const post of posts) {
  for (const [remoteUrl, publicPath] of urlMap) {
    post.content = post.content.split(remoteUrl).join(publicPath);
    if (post.featuredImage === remoteUrl) post.featuredImage = publicPath;
  }
  post.content = normalizeKritechContact(post.content);
}

posts.sort((a, b) => new Date(b.date) - new Date(a.date));
await writeFile(outputFile, `${JSON.stringify(posts, null, 2)}\n`);

console.log(`Imported ${posts.length} posts.`);
console.log(`Downloaded ${urlMap.size} images to ${mediaDir}.`);
console.log(`Wrote ${outputFile}.`);

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function inferCategory(tags) {
  const joined = tags.join(' ').toLowerCase();
  if (joined.includes('seo')) return 'SEO';
  if (joined.includes('facebook') || joined.includes('instagram') || joined.includes('marketing')) return 'Digital Marketing';
  if (joined.includes('hosting') || joined.includes('email')) return 'Hosting';
  if (joined.includes('software') || joined.includes('app') || joined.includes('saas')) return 'Software';
  if (joined.includes('web')) return 'Web Development';
  return '';
}
