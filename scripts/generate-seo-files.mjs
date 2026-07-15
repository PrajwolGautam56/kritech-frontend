import { readFile, writeFile } from 'node:fs/promises';

const siteUrl = 'https://kritechsolution.com';
const today = new Date().toISOString().slice(0, 10);

const corePages = [
  '/',
  '/services',
  '/about',
  '/pricing',
  '/blog',
  '/contact',
  '/sitemap'
];

const localPages = [
  '/it-training-institute-butwal',
  '/digital-marketing-training-butwal',
  '/seo-training-butwal',
  '/web-development-training-butwal',
  '/graphic-design-training-butwal',
  '/python-training-butwal',
  '/javascript-training-butwal',
  '/java-training-butwal',
  '/ai-ml-training-butwal',
  '/coding-classes-butwal',
  '/best-marketing-agency-butwal',
  '/digital-marketing-agency-kathmandu',
  '/digital-marketing-agency-pokhara',
  '/digital-marketing-agency-chitwan',
  '/digital-marketing-agency-biratnagar',
  '/digital-marketing-agency-birgunj',
  '/digital-marketing-agency-janakpur',
  '/digital-marketing-agency-butwal',
  '/seo-services-butwal',
  '/web-development-butwal',
  '/website-development-company-butwal',
  '/it-company-butwal',
  '/digital-marketing-nepal',
  '/digital-marketing-agency-nepal',
  '/seo-company-nepal',
  '/web-development-company-nepal',
  '/it-company-nepal',
  '/services-bhairahawa',
  '/services-tilottama',
  '/remote-digital-marketing-agency',
  '/digital-marketing-agency-uae',
  '/seo-company-uae',
  '/web-development-company-uae',
  '/digital-marketing-agency-dubai',
  '/seo-company-dubai',
  '/web-development-company-dubai',
  '/digital-marketing-agency-usa',
  '/seo-company-usa',
  '/web-development-company-usa',
  '/digital-marketing-agency-new-york',
  '/seo-company-new-york',
  '/web-development-company-new-york'
];

const wordpressPosts = JSON.parse(
  await readFile(new URL('../src/wordpress-posts.json', import.meta.url), 'utf8')
);

const blogPages = wordpressPosts
  .filter((post) => post.status === 'Published' && post.slug)
  .map((post) => ({
    path: `/blog/${post.slug}`,
    lastmod: normalizeDate(post.date)
  }));

const seedBlogPages = [
  '/blog/local-seo-nepal-business-leads',
  '/blog/best-digital-marketing-agency-butwal',
  '/blog/seo-services-nepal-local-business-plan'
].map((path) => ({ path, lastmod: today }));

const urls = [
  ...corePages.map((path) => ({ path, priority: path === '/' ? '1.0' : '0.8' })),
  ...localPages.map((path) => ({ path, priority: '0.9' })),
  ...blogPages.map((page) => ({ ...page, priority: '0.7' })),
  ...seedBlogPages.map((page) => ({ ...page, priority: '0.7' }))
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${siteUrl}${url.path === '/' ? '' : url.path}</loc>
    <lastmod>${url.lastmod || today}</lastmod>
    <changefreq>${url.path.startsWith('/blog/') ? 'monthly' : 'weekly'}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: /admin-login
Disallow: /admin-reset

Sitemap: ${siteUrl}/sitemap.xml
`;

await writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemap);
await writeFile(new URL('../public/robots.txt', import.meta.url), robots);

console.log(`Generated sitemap.xml with ${urls.length} URLs and robots.txt`);

function normalizeDate(value) {
  if (!value) return today;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return today;
  return parsed.toISOString().slice(0, 10);
}
