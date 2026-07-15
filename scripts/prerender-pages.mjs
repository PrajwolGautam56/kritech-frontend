import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const siteUrl = 'https://kritechsolution.com';
const distDir = new URL('../dist/', import.meta.url);
const baseHtml = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const sitemap = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
const wordpressPosts = JSON.parse(await readFile(new URL('../src/wordpress-posts.json', import.meta.url), 'utf8'));

const cityPages = [
  ['Kathmandu', '/digital-marketing-agency-kathmandu', 'Top Digital Marketing Agency in Kathmandu | Kritech Solution', 'Digital marketing agency in Kathmandu for SEO, social media, Google Ads, Meta campaigns, websites and lead generation for Kathmandu Valley businesses.'],
  ['Pokhara', '/digital-marketing-agency-pokhara', 'Top Digital Marketing Agency in Pokhara | Kritech Solution', 'Digital marketing agency in Pokhara for SEO, social media marketing, Google Ads, websites and lead generation for tourism, hospitality and local service businesses.'],
  ['Chitwan', '/digital-marketing-agency-chitwan', 'Top Digital Marketing Agency in Chitwan | Kritech Solution', 'Digital marketing agency in Chitwan for healthcare, education, hospitality, real estate and retail businesses needing SEO, social media, Google Ads, websites and lead generation in Bharatpur and Narayangarh.'],
  ['Biratnagar', '/digital-marketing-agency-biratnagar', 'Best Digital Marketing Agency in Biratnagar | Kritech Solution', 'Digital marketing agency in Biratnagar for SEO, social media marketing, ads, websites and lead generation for Koshi Province businesses.'],
  ['Birgunj', '/digital-marketing-agency-birgunj', 'Best Digital Marketing Agency in Birgunj | Kritech Solution', 'Digital marketing agency in Birgunj for SEO, social media, Google Ads, websites and lead generation for trading, logistics and local businesses.'],
  ['Janakpur', '/digital-marketing-agency-janakpur', 'Best Digital Marketing Agency in Janakpur | Kritech Solution', 'Digital marketing agency in Janakpur for SEO, social media, websites, ads and lead generation for Madhesh businesses.']
];

const trainingPages = [
  ['/it-training-institute-butwal', 'IT Training Institute in Butwal | Kritech Solution', 'Practical IT training in Butwal for students, beginners, business owners and professionals. Learn digital tools, website basics, projects and IT career direction.', 'IT training in Butwal', ['Computer fundamentals', 'Website and hosting basics', 'Digital tools', 'Project-based learning']],
  ['/digital-marketing-training-butwal', 'Digital Marketing Training in Butwal | Kritech Solution', 'Digital marketing training in Butwal covering SEO, social media, Google Ads, Meta Ads, analytics, content and lead generation through practical classes.', 'Digital marketing training in Butwal', ['SEO and keyword research', 'Social media marketing', 'Google Ads and Meta Ads', 'Analytics and reporting']],
  ['/seo-training-butwal', 'SEO Training in Butwal | Kritech Solution', 'SEO training in Butwal for students, marketers, content writers and business owners who want to learn Google ranking, local SEO and Search Console.', 'SEO training in Butwal', ['Keyword research', 'On-page SEO', 'Technical SEO', 'Local SEO and Search Console']],
  ['/web-development-training-butwal', 'Web Development Training in Butwal | Kritech Solution', 'Web development training in Butwal for HTML, CSS, JavaScript, React, responsive websites, hosting and deployment through real projects.', 'Web development training in Butwal', ['HTML and CSS', 'JavaScript', 'React basics', 'Hosting and deployment']],
  ['/graphic-design-training-butwal', 'Graphic Design Training in Butwal | Kritech Solution', 'Graphic design training in Butwal for branding, social media creatives, Canva, Photoshop workflows and portfolio-ready design projects.', 'Graphic design training in Butwal', ['Design fundamentals', 'Branding', 'Social media creatives', 'Portfolio projects']],
  ['/python-training-butwal', 'Python Training in Butwal | Kritech Solution', 'Python training in Butwal for coding fundamentals, problem solving, automation basics and beginner-friendly programming projects.', 'Python training in Butwal', ['Python syntax', 'Programming logic', 'Automation basics', 'Practice projects']],
  ['/javascript-training-butwal', 'JavaScript Training in Butwal | Kritech Solution', 'JavaScript training in Butwal for web development, frontend logic, browser interaction, APIs and React-ready coding practice.', 'JavaScript training in Butwal', ['JavaScript fundamentals', 'DOM interaction', 'APIs', 'Frontend projects']],
  ['/java-training-butwal', 'Java Training in Butwal | Kritech Solution', 'Java training in Butwal for OOP, programming logic, software fundamentals, college projects and career-focused coding practice.', 'Java training in Butwal', ['Java syntax', 'OOP', 'Problem solving', 'Application projects']],
  ['/ai-ml-training-butwal', 'AI ML Training in Butwal | Kritech Solution', 'AI and machine learning training in Butwal for students and professionals who want Python foundations, AI tools, prompt engineering, data basics and beginner machine learning projects.', 'AI ML training in Butwal', ['Python basics for AI', 'Data handling and simple analysis', 'Machine learning concepts', 'Prompt engineering for daily work', 'Beginner portfolio projects']],
  ['/coding-classes-butwal', 'Coding Classes in Butwal | Kritech Solution', 'Coding classes in Butwal for school students, college students and beginners learning Python, JavaScript, Java, logic and web projects.', 'Coding classes in Butwal', ['Programming logic', 'Python basics', 'JavaScript basics', 'Project practice']]
];

const pageData = new Map();

addPage('/', 'Kritech Solution | Digital Marketing Agency in Butwal, Nepal', 'Kritech Solution is a digital marketing, SEO, web development and IT solutions company in Butwal, Nepal helping businesses rank higher and generate leads.', 'SEO, web development and IT systems built to rank in Nepal.', ['SEO services in Butwal', 'Website development', 'Social media marketing', 'IT support']);
addPage('/services', 'SEO, Web Development & Digital Marketing Services in Butwal', 'Explore SEO services, website development, social media marketing, Google Ads, software, hosting and IT support from Kritech Solution in Butwal, Nepal.', 'Digital marketing, SEO, web development and IT services for Nepali businesses.', ['SEO', 'Web development', 'Social media marketing', 'Google Ads', 'IT support']);
addPage('/about', 'About Kritech Solution | Digital Marketing & IT Company in Butwal', 'Learn about Kritech Solution, a Butwal-based digital marketing, SEO, web development and IT solutions company helping Nepali businesses grow online.', 'A Butwal-based digital marketing and IT company built for serious growth.', ['Based in Butwal', 'Serving Nepal', 'Remote support for UAE and USA clients']);
addPage('/pricing', 'Digital Marketing & Website Packages | Kritech Solution', 'Flexible SEO, website, social media, and IT solution packages for startups, small businesses, and growing companies in Nepal.', 'Digital marketing, website and campaign packages for growing businesses.', ['Social Media Starter', 'Full Digital Campaign', 'Custom Campaign']);
addPage('/blog', 'Digital Growth Blog for Nepal Businesses | Kritech Solution', 'Read practical guides on SEO, digital marketing, websites, Google rankings, and business technology for Nepal.', 'Digital growth blog for Nepal businesses.', ['SEO guides', 'Digital marketing advice', 'Website and IT tips']);
addPage('/contact', 'Contact Kritech Solution | Digital Agency in Butwal, Nepal', 'Contact Kritech Solution in Butwal for SEO, digital marketing, web development, and IT service consultation.', 'Contact Kritech Solution for SEO, websites, marketing and IT support.', ['Butwal-11, Kalikanagar', '+977-9867756460', 'info@kritechsolution.com']);
addPage('/sitemap', 'HTML Sitemap | Kritech Solution', 'Browse important Kritech Solution pages for SEO services, digital marketing, web development, IT training, city service areas, blogs and contact information.', 'HTML sitemap for Kritech Solution pages.', ['Main pages', 'Service pages', 'Training pages', 'Blog articles']);

addPage('/seo-services-butwal', 'SEO Services in Butwal, Nepal | Kritech Solution', 'Local SEO, technical SEO, Google Business Profile optimization, content strategy and Search Console setup for businesses in Butwal and across Nepal.', 'SEO services in Butwal for better Google visibility and more local inquiries.', ['Local SEO', 'Technical SEO', 'Google Business Profile', 'Search Console']);
addPage('/digital-marketing-agency-butwal', 'Digital Marketing Agency in Butwal | Kritech Solution', 'Digital marketing agency in Butwal for SEO, Google Ads, Meta ads, social media marketing, website strategy and lead generation campaigns.', 'Digital marketing agency in Butwal for SEO, ads, social media and landing pages.', ['SEO strategy', 'Meta Ads', 'Google Ads', 'Lead generation']);
addPage('/best-marketing-agency-butwal', 'Best Marketing Agency in Butwal | Kritech Solution', 'Looking for the best marketing agency in Butwal? Kritech Solution helps local businesses grow with SEO, social media, ads, websites and clear reporting.', 'Best marketing agency in Butwal for businesses that want more inquiries.', ['Local SEO', 'Social media campaigns', 'Website improvements', 'Monthly reporting']);
addPage('/web-development-butwal', 'Web Development Company in Butwal, Nepal | Kritech Solution', 'Professional website design and web development in Butwal for business websites, landing pages, CMS blogs, ecommerce and SEO-ready company websites.', 'Web development company in Butwal for SEO-ready business websites.', ['Business websites', 'Landing pages', 'CMS blogs', 'Mobile-first design']);
addPage('/website-development-company-butwal', 'Website Development Company in Butwal | Kritech Solution', 'Website development company in Butwal building SEO-ready business websites, landing pages, CMS blogs, ecommerce pages and conversion-focused designs.', 'Website development company in Butwal for trust, speed and inquiries.', ['Company websites', 'SEO structure', 'Blog CMS', 'Contact flows']);
addPage('/it-company-butwal', 'IT Company in Butwal | Software, Hosting & Support', 'IT company in Butwal providing website maintenance, software solutions, hosting, email, backups, security and business IT support.', 'IT company in Butwal for hosting, maintenance, software and support.', ['Hosting', 'Business email', 'Backups', 'Custom software']);
addPage('/digital-marketing-nepal', 'Digital Marketing Agency in Nepal | SEO, Ads & Social Media', 'Digital marketing agency in Nepal for SEO, Google Ads, Meta ads, social media marketing, content strategy and lead generation campaigns.', 'Digital marketing agency in Nepal for search, social and leads.', ['SEO', 'Google Ads', 'Meta Ads', 'Content strategy']);
addPage('/digital-marketing-agency-nepal', 'Digital Marketing Agency in Nepal | Kritech Solution', 'Nepal digital marketing agency for SEO, social media marketing, Google Ads, Meta campaigns, content strategy, websites and lead generation.', 'Nepal-focused digital marketing agency for businesses that want measurable growth.', ['SEO strategy', 'Social media marketing', 'Paid ads', 'Landing pages']);
addPage('/seo-company-nepal', 'SEO Company in Nepal | Google Ranking & Local SEO Services', 'SEO company in Nepal helping businesses improve Google rankings with technical SEO, content strategy, local SEO, schema, blogs and Search Console tracking.', 'SEO company in Nepal for technical SEO, content and local ranking.', ['Technical SEO', 'Local SEO', 'Schema', 'Search Console']);
addPage('/web-development-company-nepal', 'Web Development Company in Nepal | SEO-Ready Websites', 'Web development company in Nepal creating fast, mobile-first, SEO-ready websites, landing pages, CMS blogs and business web systems.', 'Web development company in Nepal for SEO-ready websites and web systems.', ['Business websites', 'Landing pages', 'CMS', 'Analytics']);
addPage('/it-company-nepal', 'IT Company in Nepal | Software, Website, Hosting & Support', 'IT company in Nepal for websites, software solutions, hosting, business email, website maintenance, backups, security and technical support.', 'IT company in Nepal for websites, software, hosting and support.', ['Software solutions', 'Website support', 'Hosting', 'Security']);
addPage('/services-bhairahawa', 'Digital Marketing, SEO & Web Development Services in Bhairahawa', 'SEO, digital marketing, website development, social media, Google Ads and IT support services for businesses in Bhairahawa and Rupandehi.', 'Digital marketing and website services in Bhairahawa.', ['SEO', 'Social media marketing', 'Web development', 'Google Ads']);
addPage('/services-tilottama', 'Digital Marketing, SEO & Web Development Services in Tilottama', 'SEO services, digital marketing, website development, ads, social media and IT support for businesses in Tilottama, Rupandehi and Nepal.', 'Digital marketing and website services in Tilottama.', ['SEO', 'Ads', 'Social media', 'Website development']);

for (const [city, path, title, description] of cityPages) {
  const isChitwan = path === '/digital-marketing-agency-chitwan';
  addPage(path, title, description, `Digital marketing agency in ${city} for SEO, ads, websites and lead generation.`, isChitwan ? ['SEO for Bharatpur and Narayangarh searches', 'Campaigns for clinics, schools, hotels, real estate and retail', 'Meta Ads and Google Ads for inquiry generation', 'Landing pages with WhatsApp and form tracking', 'Monthly reporting tied to calls and leads'] : [`${city} SEO strategy`, 'Social media marketing', 'Google Ads and Meta Ads', 'Website and landing page support'], [
    [`Do you provide digital marketing services in ${city}?`, `Yes. Kritech provides SEO, social media marketing, Google Ads, Meta Ads, website design and lead generation support for businesses in ${city}.`],
    [`Can Kritech help my business rank for ${city} keywords?`, `Yes. We can create local service pages, improve technical SEO, plan content and track Search Console performance for ${city} search terms.`],
    ...(isChitwan ? [['Which Chitwan businesses can benefit most?', 'Healthcare clinics, colleges, hotels, restaurants, real estate companies, retail stores and local service providers can benefit from SEO pages, ads, landing pages and lead tracking.']] : [])
  ], isChitwan ? [
    'Chitwan has strong local demand across Bharatpur, Narayangarh, Ratnanagar and Tandi. Businesses often compete on Facebook visibility, Google search results, reviews and how quickly a visitor can contact them.',
    'Kritech builds campaigns around actual buyer intent: people searching for services, comparing local providers, asking for prices, checking credibility and deciding whether to call or message.'
  ] : []);
}

for (const [path, title, description, h1, bullets] of trainingPages) {
  const isAiMl = path === '/ai-ml-training-butwal';
  addPage(path, title, description, h1, bullets, [
    [`Who can join ${h1.toLowerCase()}?`, 'Students, beginners, business owners and professionals can join depending on the course level and learning goal.'],
    ['Will I work on real projects?', 'Yes. Kritech focuses on practical exercises, examples and projects so learners can build confidence and portfolio value.'],
    ...(isAiMl ? [['Do I need advanced math before joining?', 'No. Beginners can start with practical AI concepts, Python basics, data handling and simple machine learning ideas before moving into advanced math-heavy topics.']] : [])
  ], isAiMl ? [
    'This page is for learners who want to understand AI practically, not only hear buzzwords. The training direction covers Python foundations, data basics, prompting, automation ideas and beginner machine learning concepts.',
    'Students can use these skills for college projects, portfolio projects, marketing automation, research workflows and future advanced AI or data science study.'
  ] : []);
}

const internationalPages = [
  ['/remote-digital-marketing-agency', 'Remote Digital Marketing Agency for USA & UAE Businesses', 'Remote digital marketing agency from Nepal for USA and UAE businesses needing cost-effective SEO, ads, content, web development and white-label support.'],
  ['/digital-marketing-agency-uae', 'Digital Marketing Agency for UAE Businesses | Kritech Solution', 'Cost-effective digital marketing agency for UAE businesses needing SEO, Google Ads, Meta Ads, content, landing pages and remote marketing support.'],
  ['/seo-company-uae', 'SEO Company for UAE Businesses | Kritech Solution', 'Remote SEO company for UAE businesses needing technical SEO, content, local pages, landing pages and monthly Search Console reporting.'],
  ['/web-development-company-uae', 'Web Development Company for UAE Businesses | Kritech Solution', 'Remote web development company for UAE businesses needing fast websites, landing pages, SEO structure, CMS blogs and conversion-focused design.'],
  ['/digital-marketing-agency-dubai', 'Digital Marketing Agency for Dubai Businesses | Kritech Solution', 'Remote digital marketing agency for Dubai businesses needing SEO, paid ads, social media, landing pages and cost-effective campaign execution.'],
  ['/seo-company-dubai', 'SEO Company for Dubai Businesses | Kritech Solution', 'Remote SEO company for Dubai businesses needing technical SEO, content strategy, service pages, local SEO and Google ranking support.'],
  ['/web-development-company-dubai', 'Web Development Company for Dubai Businesses | Kritech Solution', 'Remote web development company for Dubai businesses needing SEO-ready websites, landing pages, blogs and reliable technical support.'],
  ['/digital-marketing-agency-usa', 'Digital Marketing Agency for USA Small Businesses | Kritech Solution', 'Remote digital marketing agency for USA small businesses needing affordable SEO, websites, content, landing pages, Google Ads and social media support.'],
  ['/seo-company-usa', 'SEO Company for USA Small Businesses | Kritech Solution', 'Remote SEO company for USA small businesses needing technical SEO, content planning, service pages, local SEO and reporting.'],
  ['/web-development-company-usa', 'Web Development Company for USA Small Businesses | Kritech Solution', 'Remote web development company for USA businesses needing affordable websites, landing pages, blogs and conversion-focused design.'],
  ['/digital-marketing-agency-new-york', 'Digital Marketing Agency for New York Businesses | Kritech Solution', 'Remote digital marketing agency for New York businesses needing SEO, ads, content, landing pages and cost-effective execution.'],
  ['/seo-company-new-york', 'SEO Company for New York Businesses | Kritech Solution', 'Remote SEO company for New York businesses needing technical SEO, local SEO, content strategy and monthly reporting.'],
  ['/web-development-company-new-york', 'Web Development Company for New York Businesses | Kritech Solution', 'Remote web development company for New York businesses needing fast SEO-ready websites, landing pages and CMS blogs.']
];

for (const [path, title, description] of internationalPages) {
  const isDubaiSeo = path === '/seo-company-dubai';
  addPage(path, title, description, title.replace(' | Kritech Solution', ''), isDubaiSeo ? ['Technical SEO audit for Dubai websites', 'Service pages for Dubai buyer intent', 'Content briefs for competitive industries', 'Schema, internal links and Search Console tracking', 'Remote monthly SEO execution from Nepal'] : ['Remote delivery', 'SEO and content', 'Landing pages', 'Clear reporting'], isDubaiSeo ? [
    ['Can a remote SEO company work for Dubai businesses?', 'Yes. SEO tasks such as audits, technical fixes, content planning, service page writing, schema and reporting can be delivered remotely with clear communication.'],
    ['Which Dubai industries can Kritech support?', 'Kritech can support consultants, clinics, real estate teams, ecommerce stores, service businesses and agencies that need consistent SEO execution.'],
    ['Why hire SEO support from Nepal for Dubai?', 'A Nepal-based remote team can provide cost-effective SEO execution while Dubai businesses keep strategy, communication and reporting structured.']
  ] : undefined, isDubaiSeo ? [
    'Dubai SEO is competitive, so generic content is not enough. Businesses need technical health, fast pages, useful service content, local intent mapping and clear conversion paths.',
    'Kritech supports Dubai businesses and agencies with remote SEO execution from Nepal: audits, service page improvements, blog briefs, schema-ready copy, internal linking and Search Console reporting.'
  ] : []);
}

const seedPosts = [
  ['local-seo-nepal-business-leads', 'Local SEO in Nepal: Rank in Butwal, Kathmandu & Beyond', 'Learn how Nepali businesses can use local SEO to rank on Google, increase calls, and generate more qualified leads.', 'How local SEO helps businesses in Butwal and Kathmandu win more leads'],
  ['best-digital-marketing-agency-butwal', 'Best Digital Marketing Agency in Butwal | Kritech Solution', 'Learn what makes a strong digital marketing agency in Butwal, Nepal, including SEO, ads, website quality, content and reporting.', 'Best digital marketing agency in Butwal: what businesses should look for'],
  ['seo-services-nepal-local-business-plan', 'SEO Services in Nepal for Local Businesses | Kritech Solution', 'A practical SEO services plan for Nepal businesses that want better Google rankings, local leads and measurable search visibility.', 'SEO services in Nepal: a practical ranking plan for local businesses']
];

for (const post of wordpressPosts) {
  if (post.status !== 'Published' || !post.slug) continue;
  addPage(`/blog/${post.slug}`, post.metaTitle || post.seoTitle || `${post.title} | Kritech Solution`, post.metaDescription || post.seoDescription || post.excerpt || `Read ${post.title} from Kritech Solution.`, post.title, [post.category || 'Kritech Blog', post.author || 'Kritech Team']);
}

for (const [slug, title, description, h1] of seedPosts) {
  addPage(`/blog/${slug}`, title, description, h1, ['SEO guidance', 'Digital marketing Nepal', 'Practical business growth']);
}

const paths = [...sitemap.matchAll(/<loc>https:\/\/kritechsolution\.com([^<]*)<\/loc>/g)]
  .map((match) => match[1] || '/')
  .map((path) => path || '/');

for (const path of paths) {
  const page = pageData.get(path) || fallbackPage(path);
  const html = renderPage(baseHtml, page, path);
  const target = path === '/' ? new URL('../dist/index.html', import.meta.url) : new URL(`../dist${path}/index.html`, import.meta.url);
  await mkdir(dirname(target.pathname), { recursive: true });
  await writeFile(target, html);
}

console.log(`Pre-rendered ${paths.length} crawlable HTML pages`);

function addPage(path, title, description, h1, bullets = [], faqs = defaultFaqs(path), extraParagraphs = []) {
  pageData.set(path, { path, title, description, h1, bullets, faqs, extraParagraphs });
}

function defaultFaqs(path) {
  const topic = humanizePath(path);
  return [
    [`Can Kritech help with ${topic}?`, `Yes. Kritech Solution can help with ${topic}, planning, execution, tracking and practical improvement for businesses and learners in Nepal.`],
    ['How can I contact Kritech Solution?', 'You can contact Kritech Solution by phone, WhatsApp or the contact form to discuss your goals and next steps.']
  ];
}

function fallbackPage(path) {
  const topic = humanizePath(path);
  return {
    path,
    title: `${topic} | Kritech Solution`,
    description: `Kritech Solution provides ${topic.toLowerCase()} support with practical strategy, SEO-friendly structure, clear communication and measurable execution.`,
    h1: topic,
    bullets: ['Practical planning', 'SEO-friendly structure', 'Clear reporting'],
    faqs: defaultFaqs(path)
  };
}

function renderPage(template, page, path) {
  const canonical = `${siteUrl}${path === '/' ? '' : path}`;
  const schema = buildSchema(page, canonical);
  const staticContent = renderStaticContent(page);
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeAttr(page.description)}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeAttr(page.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeAttr(page.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${escapeAttr(canonical)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${escapeAttr(canonical)}" />`);

  html = html.replace('</head>', `${twitterTags(page, canonical)}
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
    <style id="seo-prerender-style">.seo-prerender{font-family:Inter,system-ui,sans-serif;max-width:1120px;margin:0 auto;padding:48px 24px;color:#07120d;background:#fff}.seo-prerender h1{font-size:clamp(2rem,5vw,4.5rem);line-height:1.02;margin:0 0 18px}.seo-prerender p{max-width:760px;font-size:1.05rem;line-height:1.7;color:#33443a}.seo-prerender ul{display:grid;gap:10px;padding-left:20px}.seo-prerender li{font-weight:700}.seo-prerender h2{margin-top:34px}</style>
  </head>`);

  return html.replace('<div id="root"></div>', `<div id="root">${staticContent}</div>`);
}

function renderStaticContent(page) {
  return `<main class="seo-prerender">
    <p>Kritech Solution</p>
    <h1>${escapeHtml(page.h1)}</h1>
    <p>${escapeHtml(page.description)}</p>
    ${page.extraParagraphs?.length ? page.extraParagraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('') : ''}
    ${page.bullets?.length ? `<ul>${page.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
    ${page.faqs?.length ? `<section><h2>Frequently asked questions</h2>${page.faqs.map(([question, answer]) => `<article><h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p></article>`).join('')}</section>` : ''}
  </main>`;
}

function buildSchema(page, canonical) {
  const graph = [
    {
      '@type': 'WebPage',
      '@id': canonical,
      url: canonical,
      name: page.title,
      description: page.description,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Kritech Solution',
        url: siteUrl
      },
      about: {
        '@type': 'Organization',
        name: 'Kritech Solution',
        url: siteUrl
      }
    }
  ];

  if (page.path.includes('training') || page.path.includes('classes')) {
    graph.push({
      '@type': 'Course',
      name: page.h1,
      description: page.description,
      provider: {
        '@type': 'Organization',
        name: 'Kritech Solution',
        sameAs: siteUrl
      },
      educationalLevel: 'Beginner to practical',
      inLanguage: 'en'
    });
  } else if (!page.path.startsWith('/blog/') && page.path !== '/' && page.path !== '/sitemap') {
    graph.push({
      '@type': 'Service',
      name: page.h1,
      description: page.description,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Kritech Solution',
        url: siteUrl,
        telephone: '+9779867756460',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Butwal-11, Kalikanagar',
          addressLocality: 'Butwal',
          addressCountry: 'NP'
        }
      },
      areaServed: page.path.includes('dubai') ? 'Dubai' : page.path.includes('chitwan') ? 'Chitwan' : 'Nepal'
    });
  }

  if (page.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: page.faqs.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer
        }
      }))
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
}

function twitterTags(page, canonical) {
  return `    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(page.title)}" />
    <meta name="twitter:description" content="${escapeAttr(page.description)}" />
    <meta name="twitter:url" content="${escapeAttr(canonical)}" />`;
}

function humanizePath(path) {
  if (path === '/') return 'Kritech Solution';
  return path.replace(/^\/blog\//, '').replace(/^\//, '').replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttr(value = '') {
  return escapeHtml(value).replaceAll('\n', ' ');
}
