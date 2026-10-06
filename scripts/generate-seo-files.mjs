import { readFile, writeFile } from 'node:fs/promises';

const siteUrl = 'https://kritechsolution.com';

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
  '/best-digital-marketing-agency-butwal',
  '/best-seo-company-butwal',
  '/best-website-development-company-butwal',
  '/best-software-company-butwal',
  '/best-it-company-butwal',
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
  '/software-company-butwal',
  '/custom-software-development-butwal',
  '/erp-software-butwal',
  '/it-company-butwal',
  '/digital-marketing-nepal',
  '/digital-marketing-agency-nepal',
  '/seo-company-nepal',
  '/web-development-company-nepal',
  '/software-company-nepal',
  '/software-development-company-nepal',
  '/custom-software-development-nepal',
  '/erp-software-nepal',
  '/accounting-software-nepal',
  '/inventory-management-software-nepal',
  '/pos-software-nepal',
  '/crm-software-nepal',
  '/mobile-app-development-nepal',
  '/custom-app-development-nepal',
  '/cyber-security-services-nepal',
  '/cyber-security-company-butwal',
  '/it-company-nepal',
  '/services-bhairahawa',
  '/digital-marketing-agency-bhairahawa',
  '/seo-services-bhairahawa',
  '/services-tilottama',
  '/digital-marketing-agency-tilottama',
  '/global-it-outsourcing-company',
  '/software-development-outsourcing-nepal',
  '/offshore-software-development-company',
  '/hire-remote-developers-nepal',
  '/dedicated-development-team-nepal',
  '/outsource-web-development-to-nepal',
  '/white-label-seo-outsourcing',
  '/digital-marketing-outsourcing-company',
  '/graphic-design-outsourcing-nepal',
  '/video-editing-outsourcing',
  '/erp-development-outsourcing',
  '/software-development-outsourcing-usa',
  '/software-development-outsourcing-uk',
  '/software-development-outsourcing-uae',
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
].map((path) => ({ path }));

const urls = [
  ...corePages.map((path) => ({ path, priority: path === '/' ? '1.0' : '0.8' })),
  ...localPages.map((path) => ({ path, priority: '0.9' })),
  ...blogPages.map((page) => ({ ...page, priority: '0.7' })),
  ...seedBlogPages.map((page) => ({ ...page, priority: '0.7' }))
];

const sitemap = renderSitemap(urls);

const softwareMatchers = ['software', 'erp', 'accounting', 'inventory', 'pos', 'crm', 'mobile-app', 'custom-app', 'cyber'];
const globalMatchers = ['outsourcing', 'remote', 'offshore', 'dedicated-development-team', 'white-label', 'usa', 'uk', 'uae', 'dubai', 'new-york'];
const trainingUrls = localPages.filter((path) => path.includes('training') || path.includes('classes')).map((path) => ({ path, priority: '0.8' }));
const softwareUrls = localPages.filter((path) => softwareMatchers.some((part) => path.includes(part))).map((path) => ({ path, priority: '0.9' }));
const globalUrls = localPages.filter((path) => globalMatchers.some((part) => path.includes(part))).map((path) => ({ path, priority: '0.9' }));
const localServiceUrls = localPages
  .filter((path) => !trainingUrls.some((url) => url.path === path))
  .filter((path) => !softwareUrls.some((url) => url.path === path))
  .filter((path) => !globalUrls.some((url) => url.path === path))
  .map((path) => ({ path, priority: '0.9' }));

const topicalSitemaps = [
  ['sitemap-core.xml', corePages.map((path) => ({ path, priority: path === '/' ? '1.0' : '0.8' }))],
  ['sitemap-local-services.xml', localServiceUrls],
  ['sitemap-software.xml', softwareUrls],
  ['sitemap-training.xml', trainingUrls],
  ['sitemap-global.xml', globalUrls],
  ['sitemap-blog.xml', [...blogPages.map((page) => ({ ...page, priority: '0.7' })), ...seedBlogPages.map((page) => ({ ...page, priority: '0.7' }))]]
];

const robots = `User-agent: *
Allow: /
Disallow: /admin-login
Disallow: /admin-reset
Disallow: /admin

Sitemap: ${siteUrl}/sitemap.xml
${topicalSitemaps.map(([file]) => `Sitemap: ${siteUrl}/${file}`).join('\n')}
`;

const llms = `# Kritech Solution

Kritech Solution is a Butwal, Nepal based software, ERP, cybersecurity, SEO, web development, digital marketing and IT solutions company.

## Important pages

- Home: ${siteUrl}
- Services: ${siteUrl}/services
- Software company Nepal: ${siteUrl}/software-company-nepal
- Software company Butwal: ${siteUrl}/software-company-butwal
- Best digital marketing agency Butwal: ${siteUrl}/best-digital-marketing-agency-butwal
- Best SEO company Butwal: ${siteUrl}/best-seo-company-butwal
- Best website development company Butwal: ${siteUrl}/best-website-development-company-butwal
- Best software company Butwal: ${siteUrl}/best-software-company-butwal
- ERP software Nepal: ${siteUrl}/erp-software-nepal
- Accounting software Nepal: ${siteUrl}/accounting-software-nepal
- Custom software development Nepal: ${siteUrl}/custom-software-development-nepal
- Cyber security services Nepal: ${siteUrl}/cyber-security-services-nepal
- Global IT outsourcing company: ${siteUrl}/global-it-outsourcing-company
- Software development outsourcing Nepal: ${siteUrl}/software-development-outsourcing-nepal
- Hire remote developers Nepal: ${siteUrl}/hire-remote-developers-nepal
- White-label SEO outsourcing: ${siteUrl}/white-label-seo-outsourcing
- ERP development outsourcing: ${siteUrl}/erp-development-outsourcing
- SEO company Nepal: ${siteUrl}/seo-company-nepal
- Digital marketing agency Butwal: ${siteUrl}/digital-marketing-agency-butwal
- Blog: ${siteUrl}/blog
- Contact: ${siteUrl}/contact

## Service focus

Kritech provides custom software development, ERP modules, accounting and billing workflows, CRM software, POS systems, inventory management software, mobile app development, cybersecurity support, SEO, web development, social media marketing, Google Ads, Meta Ads, hosting, email, maintenance and technical support. Kritech also supports global IT outsourcing, software development outsourcing, dedicated remote developers, white-label SEO, website outsourcing, digital marketing outsourcing and graphic design production for USA, UK, UAE and remote clients.

## Location focus

Kritech is based in Butwal-11, Kalikanagar and serves Butwal, Bhairahawa, Tilottama, Kathmandu, Pokhara, Chitwan and clients across Nepal. Priority local search pages include best digital marketing agency in Butwal, best SEO company in Butwal, best website development company in Butwal, best software company in Butwal, digital marketing agency in Bhairahawa, SEO services in Bhairahawa and digital marketing agency in Tilottama. Kritech also supports remote clients in UAE, USA, UK, Australia, Canada and other global markets.

## Crawl notes

Primary sitemap: ${siteUrl}/sitemap.xml
Public HTML sitemap: ${siteUrl}/sitemap
`;

await writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemap);
for (const [file, sitemapUrls] of topicalSitemaps) {
  await writeFile(new URL(`../public/${file}`, import.meta.url), renderSitemap(sitemapUrls));
}
await writeFile(new URL('../public/robots.txt', import.meta.url), robots);
await writeFile(new URL('../public/llms.txt', import.meta.url), llms);

console.log(`Generated sitemap.xml with ${urls.length} URLs, topical sitemaps, robots.txt and llms.txt`);

function renderSitemap(sitemapUrls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((url) => `  <url>
    <loc>${siteUrl}${url.path === '/' ? '' : url.path}</loc>${url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ''}
    <changefreq>${url.path.startsWith('/blog/') ? 'monthly' : 'weekly'}</changefreq>
    <priority>${url.priority || '0.8'}</priority>
  </url>`).join('\n')}
</urlset>
`;
}

function normalizeDate(value) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10);
}
