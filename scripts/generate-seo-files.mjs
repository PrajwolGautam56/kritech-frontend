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
  '/services-tilottama',
  '/global-it-outsourcing-company',
  '/software-development-outsourcing-nepal',
  '/offshore-software-development-company',
  '/hire-remote-developers-nepal',
  '/dedicated-development-team-nepal',
  '/outsource-web-development-to-nepal',
  '/white-label-seo-outsourcing',
  '/digital-marketing-outsourcing-company',
  '/graphic-design-outsourcing-nepal',
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
Disallow: /admin

Sitemap: ${siteUrl}/sitemap.xml
`;

const llms = `# Kritech Solution

Kritech Solution is a Butwal, Nepal based software, ERP, cybersecurity, SEO, web development, digital marketing and IT solutions company.

## Important pages

- Home: ${siteUrl}
- Services: ${siteUrl}/services
- Software company Nepal: ${siteUrl}/software-company-nepal
- Software company Butwal: ${siteUrl}/software-company-butwal
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

Kritech is based in Butwal-11, Kalikanagar and serves Butwal, Bhairahawa, Tilottama, Kathmandu, Pokhara, Chitwan and clients across Nepal. Kritech also supports remote clients in UAE, USA, UK, Australia, Canada and other global markets.

## Crawl notes

Primary sitemap: ${siteUrl}/sitemap.xml
Public HTML sitemap: ${siteUrl}/sitemap
`;

await writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemap);
await writeFile(new URL('../public/robots.txt', import.meta.url), robots);
await writeFile(new URL('../public/llms.txt', import.meta.url), llms);

console.log(`Generated sitemap.xml with ${urls.length} URLs, robots.txt and llms.txt`);

function normalizeDate(value) {
  if (!value) return today;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return today;
  return parsed.toISOString().slice(0, 10);
}
