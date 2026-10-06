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

const bestIntentPages = [
  ['/best-digital-marketing-agency-butwal', 'Best Digital Marketing Agency in Butwal | SEO, Ads & Web', 'Compare Kritech Solution as a digital marketing agency in Butwal for SEO, Google Ads, Meta Ads, social media, websites and lead generation.', 'Best digital marketing agency in Butwal for measurable inquiries.', ['Butwal local SEO and Google Business Profile support', 'Meta Ads, Google Ads and landing pages', 'Website content built around buyer intent', 'Monthly reporting for calls, clicks and inquiries'], [
    ['Why choose Kritech as a digital marketing agency in Butwal?', 'Kritech connects local SEO, social media, ads, website improvements, content and tracking so your marketing focuses on inquiries and business growth.'],
    ['Can you help my Butwal business get more Google visibility?', 'Yes. We can improve website structure, Google Business Profile signals, service pages, blogs, internal links and Search Console tracking for Butwal search terms.']
  ], [
    'When you compare digital marketing agencies in Butwal, look beyond attractive posts. A strong agency should understand search intent, website conversion, paid campaign tracking, local reviews and the service pages customers read before contacting you.',
    'Kritech works with shops, institutes, clinics, consultants, restaurants, real estate teams, ecommerce brands and local service businesses in Butwal, Kalikanagar, Yogikuti, Traffic Chowk, Bhairahawa and Tilottama.'
  ]],
  ['/best-seo-company-butwal', 'Best SEO Company in Butwal | Local Google Ranking Support', 'SEO company in Butwal for local SEO, technical SEO, Google Business Profile optimization, content, schema, sitemap and Search Console reporting.', 'Best SEO company in Butwal for local Google visibility.', ['Technical SEO and indexing checks', 'Butwal keyword and competitor mapping', 'Local service pages and blog strategy', 'Google Business Profile and review guidance'], [
    ['How long does SEO take in Butwal?', 'Some indexing and technical fixes can improve faster, but meaningful SEO growth usually needs consistent work for 3 to 6 months depending on competition, content quality, reviews and backlinks.'],
    ['Do you work on Google Business Profile too?', 'Yes. Kritech can guide Google Business Profile categories, services, photos, posts, review requests and website links for stronger local SEO signals.']
  ], [
    'Ranking in Butwal search results is not only about repeating keywords. Your site needs crawlable pages, clear service relevance, fast mobile experience, helpful content, reviews, location signals and internal links.',
    'Kritech supports local businesses in Butwal, Bhairahawa, Tilottama and Rupandehi that want stronger visibility for services, products, appointments, inquiries and local leads.'
  ]],
  ['/best-website-development-company-butwal', 'Best Website Development Company in Butwal | SEO-Ready Sites', 'Website development company in Butwal building SEO-ready business websites, landing pages, blogs, CMS workflows, WhatsApp forms and fast mobile design.', 'Best website development company in Butwal for SEO-ready sites.', ['SEO-ready page structure and metadata', 'Fast mobile-first design', 'Blog CMS and landing page setup', 'WhatsApp, forms and analytics tracking'], [
    ['What makes a website SEO-ready?', 'Clean URLs, page-specific titles and descriptions, one clear H1, structured headings, schema, internal links, sitemap, fast loading, mobile layout and useful service content make a website SEO-ready.'],
    ['Can you redesign my existing website?', 'Yes. Kritech can improve design, content, SEO structure, speed, forms, WhatsApp links, blog setup and tracking for existing websites.']
  ], [
    'A good business website should explain your offer clearly, load fast on mobile, make services easy to compare and guide visitors toward calling, messaging or submitting a form.',
    'Kritech builds websites for Butwal businesses, startups, institutes, clinics, agencies, shops, service providers and companies across Nepal.'
  ]],
  ['/best-software-company-butwal', 'Best Software Company in Butwal | ERP, CRM, POS & Apps', 'Software company in Butwal for custom ERP, CRM, accounting, POS, inventory, dashboards, web apps, mobile apps and business automation.', 'Best software company in Butwal for ERP, CRM, POS and apps.', ['Custom ERP, CRM and dashboards', 'Accounting, billing, POS and inventory modules', 'Web apps, mobile apps and admin panels', 'Secure deployment, backups and maintenance'], [
    ['Can Kritech build ERP software in Butwal?', 'Yes. Kritech can build ERP-style systems with sales, purchase, inventory, accounts, CRM, staff roles, dashboards and reports.'],
    ['Can software be built step by step?', 'Yes. We usually recommend launching the most useful version first, then improving modules after your team starts using the system.']
  ], [
    'The best software company for your business is the one that understands your daily process before writing code. Kritech maps users, data, approvals, reports and pain points so the software supports how your team actually works.',
    'Kritech supports Butwal and Nepal businesses that need ERP, CRM, POS, accounting, inventory, booking, dashboards, portals, mobile apps or custom automation.'
  ]],
  ['/best-it-company-butwal', 'Best IT Company in Butwal | Software, Website, SEO & Support', 'IT company in Butwal for websites, software, ERP, SEO, hosting, email, cybersecurity, maintenance, backups and business IT support.', 'Best IT company in Butwal for websites, software, SEO and support.', ['Website and software development', 'SEO and digital marketing support', 'Hosting, email, backups and maintenance', 'Cybersecurity checks and technical guidance'], [
    ['What IT services does Kritech provide in Butwal?', 'Kritech supports websites, software, ERP, hosting, business email, backups, maintenance, cybersecurity checks, SEO and digital marketing.'],
    ['Can one team handle both IT and digital marketing?', 'Yes. Kritech combines technical work with SEO, content, ads and tracking so your digital presence is easier to manage.']
  ], [
    'A business IT partner should keep your website, software, email, hosting, backups and security working together. When technical support and marketing are separated, businesses often lose time fixing the same problems repeatedly.',
    'Kritech supports shops, institutes, offices, service providers, startups and growing companies in Butwal, Bhairahawa, Tilottama and across Nepal.'
  ]],
  ['/digital-marketing-agency-bhairahawa', 'Digital Marketing Agency in Bhairahawa | SEO, Ads & Web', 'Digital marketing agency in Bhairahawa for SEO, Meta Ads, Google Ads, social media, websites, landing pages and lead generation in Rupandehi.', 'Digital marketing agency in Bhairahawa for SEO, ads and leads.', ['Bhairahawa local SEO and service pages', 'Meta Ads and Google Ads campaign support', 'Website and landing page improvements', 'Reporting for calls, WhatsApp clicks and forms'], [
    ['Do you provide digital marketing in Bhairahawa?', 'Yes. Kritech provides SEO, website development, Meta Ads, Google Ads, social media marketing and lead-generation support for Bhairahawa businesses.'],
    ['Can you target Bhairahawa customers on Google?', 'Yes. We can build local service pages, improve technical SEO, plan content and optimize campaigns for Bhairahawa and Rupandehi search intent.']
  ], [
    'Bhairahawa businesses compete across search, maps, social media and referrals. A focused digital strategy helps customers find the right service faster and gives business owners clearer tracking.',
    'Kritech supports businesses in Bhairahawa, Siddharthanagar, Belahiya, Lumbini Road, Butwal and Rupandehi with digital marketing and website support.'
  ]],
  ['/digital-marketing-agency-tilottama', 'Digital Marketing Agency in Tilottama | SEO, Ads & Websites', 'Digital marketing agency in Tilottama for SEO, social media, Meta Ads, Google Ads, websites, landing pages and local lead generation.', 'Digital marketing agency in Tilottama for SEO, websites and leads.', ['Tilottama local SEO and website pages', 'Social media and paid campaigns', 'Landing pages for inquiries', 'Search Console and campaign reporting'], [
    ['Do you provide digital marketing services in Tilottama?', 'Yes. Kritech provides SEO, websites, social media content, Meta Ads, Google Ads and lead tracking for Tilottama businesses.'],
    ['Can you build local SEO pages for Tilottama?', 'Yes. We can create service pages, improve metadata, add internal links and publish helpful content for Tilottama search terms.']
  ], [
    'Tilottama businesses need digital visibility that matches how local customers search, compare and contact service providers. Strong pages, useful content and clear conversion paths make that process easier.',
    'Kritech supports businesses in Tilottama, Manigram, Driver Tole, Yogikuti, Butwal, Bhairahawa and nearby Rupandehi areas.'
  ]],
  ['/seo-services-bhairahawa', 'SEO Services in Bhairahawa | Local Google Ranking Support', 'SEO services in Bhairahawa for local ranking, technical SEO, Google Business Profile, service pages, content, sitemap and Search Console tracking.', 'SEO services in Bhairahawa for local Google visibility.', ['Bhairahawa keyword and competitor research', 'Technical SEO and indexing cleanup', 'Service pages and blog content', 'Google Business Profile and review guidance'], [
    ['Can SEO help my Bhairahawa business get local leads?', 'Yes. Local SEO can improve visibility for people searching near Bhairahawa and guide them to phone, WhatsApp or form inquiries.'],
    ['What do you fix first in SEO?', 'We review indexability, page titles, headings, content depth, internal links, schema, sitemap, mobile performance and Search Console issues.']
  ], [
    'SEO in Bhairahawa should focus on real buyer searches: services, locations, prices, trust signals and how quickly customers can contact the business from mobile devices.',
    'Kritech supports SEO for Bhairahawa, Siddharthanagar, Butwal, Tilottama, Lumbini and nearby Rupandehi businesses.'
  ]]
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

const softwarePages = [
  ['/software-company-butwal', 'Software Company in Butwal | ERP, Apps & Custom Software', 'Software company in Butwal for ERP systems, accounting software, custom web apps, mobile apps, dashboards, CRM, POS, inventory and business automation.', 'Software company in Butwal for ERP, custom apps and business automation.', ['ERP and accounting workflows', 'CRM, inventory and POS systems', 'Custom dashboards and admin panels', 'Web and mobile app development']],
  ['/software-company-nepal', 'Software Company in Nepal | Custom ERP, Apps & Automation', 'Software company in Nepal building custom ERP, accounting software, CRM, inventory systems, POS, web apps, mobile apps, dashboards and automation.', 'Software company in Nepal for custom ERP, apps and automation.', ['Custom ERP and business software', 'Accounting and billing workflows', 'CRM, inventory, POS and dashboards', 'Secure web and mobile applications']],
  ['/software-development-company-nepal', 'Software Development Company in Nepal | Kritech Solution', 'Software development company in Nepal for custom web applications, ERP, CRM, mobile apps, dashboards, portals, automation and secure business software.', 'Software development company in Nepal for practical business systems.', ['Web application development', 'ERP, CRM and dashboard systems', 'Mobile app backend and admin panels', 'Secure deployment and maintenance']],
  ['/custom-software-development-nepal', 'Custom Software Development in Nepal | Kritech Solution', 'Custom software development in Nepal for business web apps, ERP modules, CRM, dashboards, portals, automation, reporting and workflow management.', 'Custom software development in Nepal built around your workflow.', ['Requirement mapping and planning', 'Admin dashboards and portals', 'Workflow automation and reports', 'Secure deployment and maintenance']],
  ['/custom-software-development-butwal', 'Custom Software Development in Butwal | Kritech Solution', 'Custom software development in Butwal for ERP modules, CRM, accounting, inventory, dashboards, admin panels, mobile apps and workflow automation.', 'Custom software development in Butwal for workflow control.', ['Business workflow software', 'Admin dashboards and portals', 'CRM, inventory and accounting modules', 'User roles, reports and automation']],
  ['/erp-software-nepal', 'ERP Software in Nepal | Business Management System', 'ERP software in Nepal for sales, purchase, inventory, accounts, billing, HR, reporting, CRM and business workflow management by Kritech Solution.', 'ERP software in Nepal for connected business operations.', ['Sales, purchase and inventory modules', 'Billing, account and payment tracking', 'Staff roles, approvals and reports', 'CRM and customer history']],
  ['/erp-software-butwal', 'ERP Software in Butwal | Custom Business Management System', 'ERP software in Butwal for sales, inventory, accounts, billing, CRM, staff roles, reports and business workflow management by Kritech Solution.', 'ERP software in Butwal for connected operations.', ['Sales, purchase and stock modules', 'Billing and account tracking', 'CRM and customer records', 'Owner dashboards and reports']],
  ['/accounting-software-nepal', 'Accounting Software in Nepal | Billing, Reports & ERP', 'Accounting software in Nepal for billing, payments, customer records, invoices, expense tracking, reports and ERP-connected business workflows.', 'Accounting software in Nepal for billing, payments and reports.', ['Invoice and billing workflows', 'Payment and expense tracking', 'Customer and vendor records', 'Management reports and exports']],
  ['/inventory-management-software-nepal', 'Inventory Management Software in Nepal | Stock & POS System', 'Inventory management software in Nepal for stock tracking, purchase, sales, barcode-ready workflows, POS, reports and multi-user business control.', 'Inventory management software in Nepal for accurate stock and reports.', ['Stock in/out tracking', 'Purchase and sales records', 'Low-stock and report views', 'POS or billing integration']],
  ['/pos-software-nepal', 'POS Software in Nepal | Billing, Inventory & Reports', 'POS software in Nepal for billing, inventory, sales reports, customer records, staff access and retail business management by Kritech Solution.', 'POS software in Nepal for billing, inventory and retail reports.', ['Billing and sales records', 'Inventory and product management', 'Customer and staff access', 'Daily, weekly and monthly reports']],
  ['/crm-software-nepal', 'CRM Software in Nepal | Leads, Sales & Customer Management', 'CRM software in Nepal for lead management, follow-ups, customer records, sales pipeline, tasks, reminders, reports and team workflow.', 'CRM software in Nepal for leads, sales and customer follow-up.', ['Lead capture and customer records', 'Follow-up status and reminders', 'Sales pipeline and tasks', 'Reports for managers and owners']],
  ['/mobile-app-development-nepal', 'Mobile App Development in Nepal | Android, iOS & Hybrid Apps', 'Mobile app development in Nepal for Android, iOS, hybrid apps, customer portals, booking apps, ecommerce apps and business workflow apps.', 'Mobile app development in Nepal for business workflows and customer portals.', ['Android, iOS and hybrid app planning', 'Customer portals and booking apps', 'Business workflow apps', 'Backend dashboards and reports']],
  ['/custom-app-development-nepal', 'Custom App Development in Nepal | Web & Mobile Apps', 'Custom app development in Nepal for web apps, mobile apps, booking systems, customer portals, dashboards, ecommerce workflows and business automation.', 'Custom app development in Nepal for web and mobile products.', ['Custom web apps and portals', 'Mobile app workflows', 'Booking and customer systems', 'Admin dashboards and reports']],
  ['/cyber-security-services-nepal', 'Cyber Security Services in Nepal | Website & Business Security', 'Cyber security services in Nepal for website security checks, SSL, backups, malware cleanup, access control, hardening, monitoring and security guidance.', 'Cyber security services in Nepal for websites, systems and business data.', ['Website security checks and hardening', 'SSL, backups and access control', 'Malware cleanup support', 'Hosting and admin security review']],
  ['/cyber-security-company-butwal', 'Cyber Security Company in Butwal | Website Security Support', 'Cyber security company in Butwal for website security checks, SSL, backups, malware cleanup support, access control, hosting review and maintenance.', 'Cyber security company in Butwal for practical website protection.', ['Website security checks', 'SSL, backup and hosting review', 'Admin access control', 'Maintenance and malware cleanup support']]
];

const pageData = new Map();

addPage('/', 'Kritech Solution | Software, SEO & IT Outsourcing Company Nepal', 'Kritech Solution is a Nepal-based software, ERP, SEO, web development, digital marketing and IT outsourcing company serving Nepal, USA, UK and UAE clients.', 'Software, SEO and remote IT execution from Nepal for ambitious companies.', ['IT outsourcing from Nepal', 'Software development and ERP', 'SEO and web development', 'Digital marketing and design production']);
addPage('/services', 'Software, ERP, SEO & IT Outsourcing Services | Kritech', 'Explore software development, ERP, cybersecurity, SEO, websites, digital marketing, white-label support and IT outsourcing services from Kritech Solution.', 'Software, ERP, websites, SEO and outsourcing support from Nepal.', ['Software development', 'ERP and accounting software', 'Cybersecurity', 'SEO and websites', 'Global IT outsourcing']);
addPage('/about', 'About Kritech Solution | Software, Marketing & IT Company', 'Learn about Kritech Solution, a Butwal-based software, ERP, cybersecurity, SEO, web development and digital marketing company helping businesses grow.', 'A Butwal-based software, marketing and IT company built for serious growth.', ['Based in Butwal', 'Serving Nepal', 'Software and ERP systems', 'Marketing and SEO execution']);
addPage('/pricing', 'Digital Marketing & Website Packages | Kritech Solution', 'Flexible SEO, website, social media, and IT solution packages for startups, small businesses, and growing companies in Nepal.', 'Digital marketing, website and campaign packages for growing businesses.', ['Social Media Starter', 'Full Digital Campaign', 'Custom Campaign']);
addPage('/blog', 'Digital Growth Blog for Nepal Businesses | Kritech Solution', 'Read practical guides on SEO, digital marketing, websites, Google rankings, and business technology for Nepal.', 'Digital growth blog for Nepal businesses.', ['SEO guides', 'Digital marketing advice', 'Website and IT tips']);
addPage('/contact', 'Contact Kritech Solution | Digital Agency in Butwal, Nepal', 'Contact Kritech Solution in Butwal for SEO, digital marketing, web development, and IT service consultation.', 'Contact Kritech Solution for SEO, websites, marketing and IT support.', ['Butwal-11, Kalikanagar', '+977-9867756460', 'info@kritechsolution.com']);
addPage('/sitemap', 'HTML Sitemap | Kritech Solution', 'Browse important Kritech Solution pages for software, ERP, cybersecurity, SEO services, digital marketing, web development, IT training, city service areas, blogs and contact information.', 'HTML sitemap for Kritech Solution pages.', ['Main pages', 'Software pages', 'Service pages', 'Training pages', 'Blog articles']);

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

for (const [path, title, description, h1, bullets, faqs, extraParagraphs] of bestIntentPages) {
  addPage(path, title, description, h1, bullets, faqs, extraParagraphs);
}

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

for (const [path, title, description, h1, bullets] of softwarePages) {
  const isCyber = path.includes('cyber');
  const topic = softwareTopicFor(path);
  addPage(path, title, description, h1, bullets, isCyber ? [
    ['Do you provide cybersecurity support?', 'Yes. Kritech provides practical website security checks, SSL, backups, access control, hosting review, malware cleanup support and maintenance guidance.'],
    ['Can you secure an existing business website?', 'Yes. We can review common risks, improve access control, check backups, update technical settings and plan ongoing maintenance.'],
    ['Is cybersecurity only for large companies?', 'No. Small businesses also need strong basics such as backups, SSL, secure hosting, updated websites and careful admin access.']
  ] : [
    [`Can Kritech build ${topic}?`, `Yes. Kritech can plan, design and develop ${topic} with practical modules, user roles, reports and support.`],
    ['Can the software be customized?', 'Yes. We map your workflow first, then build modules, dashboards, reports and access levels around your actual business process.'],
    ['Do you provide support after launch?', 'Yes. We can support deployment, training, maintenance, backups, security checks and future improvements.']
  ], isCyber ? [
    'Security work starts with practical fundamentals: backups, SSL, hosting review, admin access control, updated software and monitoring of common website risks.',
    'Kritech supports businesses that need realistic protection for websites, systems and data without overcomplicating the first step.'
  ] : [
    'Kritech plans software around real business workflow: users, data entry, approvals, reports, security, backups and the first version that will actually be used.',
    'The goal is not only to launch a product, but to reduce manual work, improve visibility and give owners cleaner control over daily operations.'
  ]);
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

const globalOutsourcingPages = [
  ['/global-it-outsourcing-company', 'Global IT Outsourcing Company in Nepal | Kritech Solution', 'Hire Kritech Solution as a Nepal-based IT outsourcing company for software development, ERP, websites, SEO, design, marketing and remote technical support.', 'Hire a Nepal-based IT team for software, websites, SEO and creative production.', ['Software, ERP and web app development', 'SEO, websites and landing pages', 'Graphic design and campaign production', 'Remote support with clear weekly delivery'], [
    ['What IT work can I outsource to Kritech?', 'You can outsource website development, software modules, ERP workflows, landing pages, SEO tasks, content updates, graphic design, campaign assets and ongoing technical support.'],
    ['Why hire an outsourcing team from Nepal?', 'Nepal can offer skilled remote execution at a lower operating cost than many USA, UK or UAE providers, while still using modern tools, documentation and English communication.']
  ], ['Kritech works from Butwal, Nepal and supports remote clients in the USA, UK, UAE, Australia, Canada and other English-speaking markets.']],
  ['/software-development-outsourcing-nepal', 'Software Development Outsourcing Nepal | Remote Dev Team', 'Outsource software development to Nepal with Kritech Solution for ERP modules, web apps, dashboards, admin panels, CRM, automation and maintenance.', 'Outsource software development to a practical Nepal-based engineering team.', ['Custom web applications and dashboards', 'ERP, CRM and workflow modules', 'Admin panels, roles and reports', 'Maintenance, testing and improvement cycles'], [
    ['Can I outsource ERP or custom software to Kritech?', 'Yes. Kritech can build ERP modules, CRM, inventory, POS, accounting workflows, dashboards, portals and custom web applications.'],
    ['Can you maintain existing software?', 'Yes. Kritech can review existing code, fix bugs, improve UI, add features, connect APIs and support ongoing maintenance.']
  ], ['Software outsourcing works best when the team understands your business process first. Kritech maps users, data, reports and daily pain points before building the first useful version.']],
  ['/offshore-software-development-company', 'Offshore Software Development Company | Kritech Nepal', 'Offshore software development company in Nepal for web apps, ERP modules, dashboards, websites, APIs, maintenance and remote product support.', 'An offshore software team for companies that need reliable product and web execution.', ['Offshore web app and dashboard development', 'ERP, CRM and automation features', 'Website and landing page implementation', 'Maintenance, fixes and technical support'], [
    ['What can an offshore software team build?', 'An offshore team can build web apps, dashboards, ERP modules, APIs, admin panels, landing pages, CMS workflows and technical improvements.'],
    ['Can you work with an existing product?', 'Yes. Kritech can review an existing system and help with fixes, new features, UI improvements, integrations and maintenance.']
  ], ['Offshore software development works when the team understands the business goal, communicates clearly and ships usable work in controlled phases.']],
  ['/hire-remote-developers-nepal', 'Hire Remote Developers in Nepal | Kritech Solution', 'Hire remote developers in Nepal for React, Node, MERN, dashboards, website updates, bug fixes, APIs, admin panels and business software support.', 'Hire remote developers for code fixes, features, dashboards and website improvements.', ['React, Node and MERN development support', 'Bug fixes, feature updates and APIs', 'Admin dashboards and CMS workflows', 'Website maintenance and performance improvements'], [
    ['Can I hire Kritech for small code changes?', 'Yes. Kritech can support small fixes, UI updates, bug fixes, API changes, CMS improvements, landing pages and ongoing development tasks.'],
    ['Do you offer dedicated developer support?', 'Yes. Depending on workload, Kritech can support project-based work or recurring remote development assistance.']
  ], ['Many small businesses do not need a large engineering department. They need a reliable remote developer who can understand the task, update the code, test the change and keep the project moving.']],
  ['/dedicated-development-team-nepal', 'Dedicated Development Team Nepal | Remote Software Support', 'Build a dedicated development team in Nepal with Kritech for software features, web apps, ERP modules, dashboards, SEO pages and maintenance.', 'A dedicated remote team for businesses that need steady technical execution.', ['Recurring development and maintenance', 'Design, SEO and content production support', 'Software modules and web application updates', 'Weekly planning, delivery and reporting rhythm'], [
    ['How is a dedicated team different from one project?', 'A project has a fixed scope. A dedicated team supports continuous tasks, improvements, maintenance and production needs over time.'],
    ['Can Kritech support both marketing and development?', 'Yes. Kritech combines software development, website updates, SEO, content, design and campaign production.']
  ], ['A dedicated remote team is useful when your business needs continuous output: new pages, bug fixes, campaign assets, reports, software improvements and technical maintenance.']],
  ['/outsource-web-development-to-nepal', 'Outsource Web Development to Nepal | Kritech Solution', 'Outsource web development to Nepal for SEO-ready business websites, landing pages, CMS blogs, website maintenance, UI improvements and conversion pages.', 'Outsource websites and landing pages to a Nepal team that understands SEO.', ['SEO-ready websites and service pages', 'Landing pages for ads and lead generation', 'Blog CMS and content publishing flows', 'Website maintenance and conversion improvements'], [
    ['Can you build websites for overseas companies?', 'Yes. Kritech can plan, design, develop and launch websites remotely with clear content, revisions and approval stages.'],
    ['Can you improve an existing website?', 'Yes. We can improve UI, content, page structure, performance, SEO metadata, blog setup and lead forms.']
  ], ['A good outsourced website should load fast, explain the offer clearly, rank better, and convert visitors into leads.']],
  ['/white-label-seo-outsourcing', 'White Label SEO Outsourcing from Nepal | Kritech Solution', 'White label SEO outsourcing for agencies needing technical SEO, keyword research, content briefs, on-page SEO, local pages, reports and website updates.', 'White-label SEO support for agencies that need dependable production capacity.', ['Technical SEO and on-page updates', 'Keyword research and content briefs', 'Local and service page production', 'Reports, Search Console checks and improvement notes'], [
    ['Do you work under an agency brand?', 'Yes. Kritech can support white-label SEO tasks with confidentiality and structured communication.'],
    ['Can you implement SEO changes on the website?', 'Yes. Since Kritech also handles web development, we can often implement technical and content changes directly.']
  ], ['Agencies often sell strategy but need reliable hands for research, writing briefs, improving pages, updating websites and preparing reports.']],
  ['/digital-marketing-outsourcing-company', 'Digital Marketing Outsourcing Company | Kritech Solution Nepal', 'Digital marketing outsourcing company in Nepal for SEO, social media creatives, Google Ads support, Meta campaigns, landing pages, reports and content production.', 'Outsource marketing execution without losing control of strategy.', ['SEO, content and landing page support', 'Social media graphics and campaign assets', 'Meta Ads and Google Ads production help', 'Monthly reporting and improvement tasks'], [
    ['What marketing work can Kritech handle remotely?', 'SEO updates, blogs, landing pages, social creatives, Meta and Google campaign support, reports, website changes and content production.'],
    ['Can you support a company outside Nepal?', 'Yes. Kritech can support remote clients through online planning, shared task lists, scheduled meetings and delivery reports.']
  ], ['Marketing outsourcing is most useful when the business keeps strategic clarity and lets a reliable team handle repeatable production, updates, tracking and campaign assets.']],
  ['/graphic-design-outsourcing-nepal', 'Graphic Design Outsourcing Nepal | Social & Brand Creatives', 'Outsource graphic design to Nepal for social media posts, ads, brand graphics, brochures, thumbnails, presentation visuals and campaign creatives.', 'Outsource social media, ad and brand creatives to a practical design team.', ['Social media creatives and ad designs', 'Brochures, brand graphics and pitch visuals', 'Campaign assets for Meta, Google and TikTok', 'Design support connected to content calendars'], [
    ['What graphic design work can I outsource?', 'You can outsource social media posts, ad creatives, thumbnails, brochures, brand graphics, presentations and campaign visuals.'],
    ['Can you combine design with social media management?', 'Yes. Kritech can plan content calendars, captions, campaign ideas and graphics together.']
  ], ['Design outsourcing works best when creative assets are tied to a real campaign plan. Kritech can support both the visuals and the marketing context behind them.']],
  ['/erp-development-outsourcing', 'ERP Development Outsourcing | Custom ERP Team Nepal', 'Outsource ERP development to Kritech Solution for sales, inventory, accounting, CRM, HR, reports, approvals, dashboards and business automation.', 'Outsource ERP development for business workflows that need control and clarity.', ['Sales, purchase and inventory modules', 'Accounting, billing and payment workflows', 'CRM, staff roles and approval flows', 'Dashboards, reports and exports'], [
    ['Can Kritech build a custom ERP?', 'Yes. Kritech can plan and build ERP modules for sales, purchase, inventory, accounts, CRM, approvals, dashboards and reports.'],
    ['Can ERP be built in phases?', 'Yes. We usually recommend starting with the most useful modules first, then expanding as the team starts using the system.']
  ], ['ERP outsourcing is valuable when ready-made tools do not fit how your team works. Kritech can build practical modules around your real process.']],
  ['/software-development-outsourcing-usa', 'Software Development Outsourcing for USA Businesses', 'USA businesses can outsource software development to Kritech Solution in Nepal for web apps, ERP modules, dashboards, APIs, maintenance and support.', 'Software development outsourcing for USA businesses that need lean execution.', ['Web apps, dashboards and admin panels', 'ERP, CRM and automation modules', 'Website improvements and technical SEO', 'Remote maintenance and support'], [
    ['Can USA businesses outsource software work to Kritech?', 'Yes. Kritech can work remotely with USA businesses on software, web apps, dashboards, websites, SEO and maintenance.'],
    ['Can you help agencies with overflow development?', 'Yes. Kritech can support agencies with website builds, bug fixes, features, landing pages and SEO implementation.']
  ], ['USA companies often outsource when local execution is expensive or hiring is slow. Kritech can help with focused software and web work from Nepal while keeping communication structured.']],
  ['/software-development-outsourcing-uk', 'Software Development Outsourcing for UK Businesses', 'UK businesses can outsource software development to Kritech Solution in Nepal for websites, web apps, ERP workflows, dashboards, APIs and SEO support.', 'Remote software and web development support for UK businesses.', ['Web apps, dashboards and website builds', 'ERP and workflow automation modules', 'Technical SEO and content implementation', 'Design and campaign production support'], [
    ['Can Kritech work with UK clients?', 'Yes. Kritech can support UK clients remotely through online communication, shared tasks and planned delivery milestones.'],
    ['Can you work with existing systems?', 'Yes. Kritech can review existing websites or codebases and support fixes, improvements and new features.']
  ], ['UK small businesses and agencies often need flexible production capacity. Kritech can help with practical development, website and SEO work without requiring a full-time hire.']],
  ['/software-development-outsourcing-uae', 'Software Development Outsourcing for UAE Businesses', 'UAE businesses can outsource software development to Kritech Solution in Nepal for ERP, dashboards, web apps, websites, automation and maintenance.', 'Software, ERP and web development outsourcing for UAE businesses.', ['ERP, CRM and dashboard development', 'Business websites and landing pages', 'Automation, APIs and admin panels', 'SEO and technical maintenance support'], [
    ['Can Kritech build software for UAE businesses?', 'Yes. Kritech can support UAE businesses with ERP modules, dashboards, websites, automation, admin panels and technical maintenance.'],
    ['Do you support Dubai companies?', 'Yes. Kritech can work remotely with Dubai, Abu Dhabi, Sharjah and UAE-wide businesses.']
  ], ['UAE businesses can outsource execution-heavy software and web work while keeping strategy and approvals internal. Kritech provides the remote build capacity behind that model.']]
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

for (const [path, title, description, h1, bullets, faqs, extraParagraphs] of globalOutsourcingPages) {
  addPage(path, title, description, h1, bullets, faqs, extraParagraphs);
}

const seedPosts = [
  ['local-seo-nepal-business-leads', 'Local SEO in Nepal: Rank in Butwal, Kathmandu & Beyond', 'Learn how Nepali businesses can use local SEO to rank on Google, increase calls, and generate more qualified leads.', 'How local SEO helps businesses in Butwal and Kathmandu win more leads'],
  ['best-digital-marketing-agency-butwal', 'Best Digital Marketing Agency in Butwal | Kritech Solution', 'Learn what makes a strong digital marketing agency in Butwal, Nepal, including SEO, ads, website quality, content and reporting.', 'Best digital marketing agency in Butwal: what businesses should look for'],
  ['seo-services-nepal-local-business-plan', 'SEO Services in Nepal for Local Businesses | Kritech Solution', 'A practical SEO services plan for Nepal businesses that want better Google rankings, local leads and measurable search visibility.', 'SEO services in Nepal: a practical ranking plan for local businesses']
];

for (const post of wordpressPosts) {
  if (post.status !== 'Published' || !post.slug) continue;
  addBlogPage(post);
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
  pageData.set(path, { path, title: makeDistinctSeoTitle(title, h1, 'Kritech Solution', 'Kritech'), description: clampSeoText(description, 160), h1, bullets, faqs, extraParagraphs });
}

function addBlogPage(post) {
  const path = `/blog/${post.slug}`;
  const title = makeDistinctSeoTitle(post.metaTitle || post.seoTitle || `${post.title} | Kritech Solution`, post.title, 'Kritech Blog');
  pageData.set(path, {
    path,
    type: 'BlogPosting',
    title,
    description: clampSeoText(post.metaDescription || post.seoDescription || post.excerpt || `Read ${post.title} from Kritech Solution.`, 160),
    h1: post.title,
    bullets: [],
    faqs: [],
    bodyHtml: cleanWordPressContent(post.content || ''),
    author: post.author || 'Kritech Team',
    date: post.date,
    category: post.category || 'Kritech Blog',
    image: post.featuredImage || ''
  });
}

function defaultFaqs(path) {
  if (path === '/') {
    return [
      ['What services does Kritech Solution provide?', 'Kritech Solution provides software development, ERP, accounting software, cybersecurity, SEO, web development, digital marketing and IT support for businesses in Nepal.'],
      ['Where is Kritech Solution based?', 'Kritech Solution is based in Butwal-11, Kalikanagar and supports clients across Nepal as well as remote clients abroad.']
    ];
  }
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
  const shareImage = page.image && page.image.startsWith('http') ? page.image : `${siteUrl}/agency-hero.png`;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeAttr(page.description)}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeAttr(page.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeAttr(page.description)}" />`)
    .replace(/<meta property="og:type" content="[^"]*"\s*\/?>/, `<meta property="og:type" content="${page.type === 'BlogPosting' ? 'article' : 'website'}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${escapeAttr(canonical)}" />`)
    .replace(/<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${escapeAttr(shareImage)}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escapeAttr(page.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${escapeAttr(page.description)}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${escapeAttr(shareImage)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${escapeAttr(canonical)}" />`);

  html = html.replace('</head>', `    <meta name="twitter:url" content="${escapeAttr(canonical)}" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
    <style id="seo-prerender-style">.seo-prerender{font-family:Inter,system-ui,sans-serif;max-width:1120px;margin:0 auto;padding:48px 24px;color:#07120d;background:#fff}.seo-prerender h1{font-size:clamp(2rem,5vw,4.5rem);line-height:1.02;margin:0 0 18px}.seo-prerender p{max-width:760px;font-size:1.05rem;line-height:1.7;color:#33443a}.seo-prerender ul{display:grid;gap:10px;padding-left:20px}.seo-prerender li{font-weight:700}.seo-prerender h2{margin-top:34px}.seo-prerender .seo-links{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;padding:0;list-style:none}.seo-prerender .seo-links a{display:block;padding:12px 14px;border:1px solid #d8eadf;border-radius:12px;color:#035f36;background:#f7fbf8;font-weight:800;text-decoration:none}.seo-prerender .seo-all-links{grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}</style>
  </head>`);

  return html.replace('<div id="root"></div>', `<div id="root">${staticContent}</div>`);
}

function renderStaticContent(page) {
  const relatedLinks = relatedLinksFor(page);
  const depthParagraphs = seoDepthParagraphsFor(page);
  return `<main class="seo-prerender">
    <p>Kritech Solution</p>
    ${page.category ? `<p>${escapeHtml(page.category)}${page.author ? ` · ${escapeHtml(page.author)}` : ''}${page.date ? ` · ${escapeHtml(page.date)}` : ''}</p>` : ''}
    <h1>${escapeHtml(page.h1)}</h1>
    <p>${escapeHtml(page.description)}</p>
    ${depthParagraphs.length ? depthParagraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('') : ''}
    ${page.bullets?.length ? `<ul>${page.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
    ${page.bodyHtml ? `<article class="imported-wordpress-content">${page.bodyHtml}</article>` : ''}
    ${page.faqs?.length ? `<section><h2>Frequently asked questions</h2>${page.faqs.map(([question, answer]) => `<article><h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p></article>`).join('')}</section>` : ''}
    ${relatedLinks.length ? `<section><h2>Related Kritech pages</h2>${renderLinkList(relatedLinks)}</section>` : ''}
    ${page.path === '/sitemap' ? `<section><h2>All crawlable pages</h2>${renderLinkList(paths.map(linkForPath), 'seo-all-links')}</section>` : ''}
  </main>`;
}

function renderLinkList(links, extraClass = '') {
  return `<ul class="seo-links ${extraClass}">${links.map((link) => `<li><a href="${escapeAttr(link.path)}">${escapeHtml(link.label)}</a></li>`).join('')}</ul>`;
}

function relatedLinksFor(page) {
  const path = page.path;
  const links = [
    '/',
    '/services',
    '/contact',
    '/sitemap'
  ];

  if (path.startsWith('/blog/')) {
    links.push('/blog', '/seo-company-nepal', '/digital-marketing-agency-nepal', '/web-development-company-nepal', '/software-company-nepal');
  }

  if (path.includes('software') || path.includes('erp') || path.includes('accounting') || path.includes('inventory') || path.includes('pos') || path.includes('crm') || path.includes('app-development')) {
    links.push('/software-company-nepal', '/custom-software-development-nepal', '/erp-software-nepal', '/accounting-software-nepal', '/crm-software-nepal', '/mobile-app-development-nepal', '/software-development-outsourcing-nepal');
  }

  if (path.includes('seo') || path.includes('marketing') || path.includes('agency')) {
    links.push('/seo-company-nepal', '/seo-services-butwal', '/best-seo-company-butwal', '/digital-marketing-agency-nepal', '/digital-marketing-agency-butwal', '/best-digital-marketing-agency-butwal', '/best-marketing-agency-butwal', '/digital-marketing-agency-bhairahawa', '/seo-services-bhairahawa', '/digital-marketing-agency-tilottama', '/remote-digital-marketing-agency');
  }

  if (path.includes('training') || path.includes('classes')) {
    links.push('/it-training-institute-butwal', '/digital-marketing-training-butwal', '/seo-training-butwal', '/web-development-training-butwal', '/ai-ml-training-butwal', '/coding-classes-butwal');
  }

  if (path.includes('outsourcing') || path.includes('remote') || path.includes('offshore') || path.includes('usa') || path.includes('uk') || path.includes('uae') || path.includes('dubai') || path.includes('new-york')) {
    links.push('/global-it-outsourcing-company', '/hire-remote-developers-nepal', '/white-label-seo-outsourcing', '/digital-marketing-outsourcing-company', '/software-development-outsourcing-usa', '/software-development-outsourcing-uae', '/software-development-outsourcing-uk');
  }

  if (path.includes('butwal')) {
    links.push('/best-digital-marketing-agency-butwal', '/best-seo-company-butwal', '/best-website-development-company-butwal', '/best-software-company-butwal', '/best-it-company-butwal', '/software-company-butwal', '/erp-software-butwal', '/it-company-butwal', '/services-bhairahawa', '/services-tilottama');
  }

  if (path.includes('bhairahawa') || path.includes('tilottama')) {
    links.push('/digital-marketing-agency-bhairahawa', '/seo-services-bhairahawa', '/digital-marketing-agency-tilottama', '/best-marketing-agency-butwal', '/digital-marketing-agency-butwal');
  }

  const unique = [];
  const seen = new Set([path]);
  for (const linkPath of links) {
    if (seen.has(linkPath)) continue;
    seen.add(linkPath);
    unique.push(linkForPath(linkPath));
  }
  return unique.slice(0, 18);
}

function seoDepthParagraphsFor(page) {
  const existing = page.extraParagraphs || [];
  const topic = page.h1 || humanizePath(page.path);
  const topicLower = topic.toLowerCase();

  if (page.path === '/') {
    return [
      ...existing,
      'Kritech Solution helps businesses choose one focused growth partner instead of separating software, website, SEO, ads, content and support into disconnected vendors. A visitor can request a business website, ERP workflow, search ranking plan, social media campaign, lead form, admin dashboard or remote IT support from the same team.',
      'The company is based in Butwal, Nepal and supports clients across Nepal, UAE, UK, USA and other remote markets. The work is planned around practical outcomes: better inquiries, faster pages, clearer services, stronger local visibility, useful content and systems that owners can actually operate after launch.',
      'For business owners comparing IT companies or digital marketing agencies, Kritech focuses on clean communication, measurable tasks and long-term improvement. Each project can connect website structure, blog publishing, technical SEO, analytics, conversion tracking and follow-up so the website becomes a useful sales asset.'
    ];
  }

  if (page.path === '/blog') {
    return [
      ...existing,
      'The Kritech blog gives business owners, students and growing teams practical guidance on digital marketing, SEO, web development, software systems, hosting, design and online growth. Articles are written to answer real questions people ask before hiring an agency or improving their own digital presence.',
      'Readers can use these guides to understand local SEO in Nepal, website planning, content strategy, Google Search Console, ecommerce, social media campaigns, CRM, ERP, business email and technical website improvements. The blog also supports service pages with helpful explanations instead of thin sales copy.',
      'For companies comparing vendors, the blog shows how Kritech thinks: clear structure, useful examples, simple language and execution that connects design, search visibility and lead generation.'
    ];
  }

  if (page.path === '/contact') {
    return [
      ...existing,
      'Contact Kritech Solution when you need a clear next step for a website, SEO campaign, software system, ERP, mobile app, cybersecurity support, hosting, business email, social media marketing or outsourcing work. Share your business type, target location, current website and the problem you want to solve.',
      'A useful inquiry usually includes the service you need, your location, your expected timeline and whether you want a new build, improvement, monthly support or a technical review. This helps the team respond with practical advice instead of a generic package.',
      'Kritech serves businesses in Butwal, Bhairahawa, Tilottama, Kathmandu, Pokhara and across Nepal, while also working remotely with clients who need software, SEO, design and marketing execution from Nepal.'
    ];
  }

  if (page.path.startsWith('/blog/')) {
    if (wordCount(stripHtml(page.bodyHtml || '')) > 320) return existing;
    return [
      ...existing,
      `This guide is written for people researching ${topicLower} before they spend money on a website, campaign, software system or technical service. The goal is to explain what matters, what to avoid and how a focused plan can turn online activity into clearer business results.`,
      'Kritech Solution works with Nepali businesses and remote clients that need practical digital execution: SEO-friendly websites, landing pages, content planning, software workflows, analytics, lead forms and regular improvement. The same thinking applies whether the project is a small local business page or a larger system.',
      'If you are comparing options, look for clear scope, honest timelines, useful reporting, mobile performance, search-friendly structure and a team that can improve the work after launch. Good digital work should make the next decision easier for both the business owner and the visitor.'
    ];
  }

  if (page.path.includes('training') || page.path.includes('classes')) {
    return [
      ...existing,
      `${topic} is designed for learners who want practical skills, not only definitions. Students can understand the core concepts, practice real tasks, build small portfolio projects and learn how the skill is used in business, freelancing, marketing or software work.`,
      'The training approach is useful for school students, college students, job seekers, business owners and beginners in Butwal who want structured guidance. Classes can connect theory with examples such as websites, SEO audits, social media campaigns, programming exercises, dashboards, design projects or AI-assisted workflows.',
      'Learners also need confidence about tools, communication and project habits. Kritech focuses on clear explanations, hands-on practice and career-relevant direction so students can keep improving after the class ends.'
    ];
  }

  if (page.path.includes('outsourcing') || page.path.includes('remote') || page.path.includes('offshore') || page.path.includes('usa') || page.path.includes('uk') || page.path.includes('uae') || page.path.includes('dubai') || page.path.includes('new-york')) {
    return [
      ...existing,
      `${topic} is useful for companies that need reliable execution without increasing local hiring cost. Kritech can support websites, SEO, software features, ERP modules, dashboards, content, design assets, maintenance and campaign work from a Nepal-based delivery team.`,
      'Remote clients usually need clarity more than noise. Kritech works best when tasks are documented, priorities are agreed and updates are shared regularly. This makes outsourcing practical for agencies, startups, consultants and small businesses that need steady output.',
      'The benefit is not only lower cost. A focused remote team can help a company move faster by handling repeatable production, technical improvements, SEO pages, landing pages and support work while the client keeps strategy and approvals under control.'
    ];
  }

  if (page.path.includes('software') || page.path.includes('erp') || page.path.includes('accounting') || page.path.includes('inventory') || page.path.includes('pos') || page.path.includes('crm') || page.path.includes('app-development')) {
    return [
      ...existing,
      `${topic} should make daily work easier for owners, staff and customers. Kritech plans software around real workflows such as sales, billing, inventory, customer records, approvals, reports, user roles, reminders, dashboards and secure access.`,
      'A good software project starts with the business process before the code. The team maps who will use the system, what data must be stored, which reports matter, what permissions are needed and how the system should grow after the first release.',
      'Kritech can support new builds, improvements to existing systems, admin panels, APIs, web apps, mobile apps and maintenance. The focus is practical business control: fewer manual steps, better records and software that can evolve with the company.'
    ];
  }

  if (page.path.includes('seo') || page.path.includes('marketing') || page.path.includes('agency')) {
    return [
      ...existing,
      `${topic} should help a business become easier to find, easier to trust and easier to contact. Kritech connects SEO, website structure, content, social media, ads, analytics and landing pages so marketing work supports real inquiries.`,
      'For local businesses, visibility depends on clear service pages, location relevance, useful answers, fast mobile experience, Google Business Profile strength, reviews, internal links and consistent business details. For competitive markets, the work also needs content depth and regular improvement.',
      'Kritech avoids random posting without a plan. The team can improve service pages, publish blogs, prepare campaign creatives, set up tracking, review Search Console and report what is helping visitors call, message or submit a form.'
    ];
  }

  return [
    ...existing,
    `${topic} support from Kritech Solution is built for people who want clear planning, practical execution and measurable improvement. The work can include strategy, website updates, content, technical setup, reporting and ongoing support depending on the business goal.`,
    'Kritech is based in Butwal, Nepal and works with local, national and remote clients. The team focuses on fast communication, useful recommendations, SEO-friendly structure and digital systems that support real inquiries instead of only looking good on the surface.',
    'Every page is connected to related services, contact options and helpful content so visitors can compare solutions and choose the next step with confidence.'
  ];
}

function linkForPath(path) {
  const page = pageData.get(path) || fallbackPage(path);
  return {
    path: path === '/' ? '/' : path,
    label: page.h1 || humanizePath(path)
  };
}

function buildSchema(page, canonical) {
  const graph = [
    {
      '@type': 'WebPage',
      '@id': canonical,
      url: canonical,
      name: page.title,
      description: page.description,
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${siteUrl}/agency-hero.png`
      },
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

  graph.push({
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItemsFor(page).map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path === '/' ? '' : item.path}`
    }))
  });

  if (page.path.includes('training') || page.path.includes('classes')) {
    const offer = {
      '@type': 'Offer',
      url: canonical,
      availability: 'https://schema.org/InStock',
      category: 'Paid',
      priceCurrency: 'NPR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'NPR',
        description: 'Contact Kritech Solution for current course fees, batch schedule and enrollment details.'
      }
    };
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
      inLanguage: 'en',
      offers: offer,
      hasCourseInstance: {
        '@type': 'CourseInstance',
        name: `${page.h1} practical training batch`,
        courseMode: ['Onsite', 'Online', 'Blended'],
        location: {
          '@type': 'Place',
          name: 'Kritech Solution',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Butwal-11, Kalikanagar',
            addressLocality: 'Butwal',
            addressCountry: 'NP'
          }
        },
        instructor: {
          '@type': 'Organization',
          name: 'Kritech Solution',
          url: siteUrl
        },
        offers: offer
      }
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
      areaServed: areaServedFor(page.path)
    });
  }

  if (page.type === 'BlogPosting') {
    graph.push({
      '@type': 'BlogPosting',
      headline: page.h1,
      description: page.description,
      url: canonical,
      datePublished: normalizeSchemaDate(page.date),
      dateModified: normalizeSchemaDate(page.date),
      author: {
        '@type': 'Person',
        name: page.author || 'Kritech Team'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Kritech Solution',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/kritech-logo.webp`
        }
      },
      ...(page.image ? { image: page.image.startsWith('http') ? page.image : `${siteUrl}${page.image}` } : {}),
      wordCount: wordCount(stripHtml(page.bodyHtml || ''))
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

function areaServedFor(path) {
  if (path.includes('dubai')) return 'Dubai';
  if (path.includes('uae')) return 'UAE';
  if (path.includes('uk')) return 'UK';
  if (path.includes('usa') || path.includes('new-york')) return 'USA';
  if (path.includes('outsourcing') || path.includes('remote-developers') || path.includes('offshore') || path.includes('dedicated-development-team')) return 'Global';
  if (path.includes('chitwan')) return 'Chitwan';
  if (path.includes('butwal')) return 'Butwal';
  return 'Nepal';
}

function isSoftwareProductPage(path) {
  return [
    'software',
    'erp',
    'accounting',
    'inventory',
    'pos',
    'crm',
    'mobile-app',
    'custom-app'
  ].some((part) => path.includes(part)) && !path.includes('cyber');
}

function softwareTopicFor(path) {
  if (path.includes('erp')) return 'ERP software';
  if (path.includes('accounting')) return 'accounting software';
  if (path.includes('inventory')) return 'inventory management software';
  if (path.includes('pos')) return 'POS software';
  if (path.includes('crm')) return 'CRM software';
  if (path.includes('mobile-app')) return 'mobile apps';
  if (path.includes('custom-app')) return 'custom web and mobile apps';
  if (path.includes('custom-software')) return 'custom software';
  return 'business software';
}

function breadcrumbItemsFor(page) {
  if (page.path === '/') return [{ name: 'Home', path: '/' }];
  if (page.path.startsWith('/blog/')) {
    return [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: page.h1, path: page.path }
    ];
  }
  return [
    { name: 'Home', path: '/' },
    { name: page.h1, path: page.path }
  ];
}

function cleanWordPressContent(value = '') {
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<h1([^>]*)>/gi, '<h2$1>')
    .replace(/<\/h1>/gi, '</h2>')
    .replace(/\son[a-z]+=\"[^\"]*\"/gi, '')
    .replace(/\son[a-z]+='[^']*'/gi, '')
    .replace(/\sstyle=\"[^\"]*\"/gi, '')
    .replace(/\sstyle='[^']*'/gi, '');
}

function stripHtml(value = '') {
  return String(value).replace(/<[^>]*>/g, ' ');
}

function wordCount(value = '') {
  const words = String(value).trim().match(/\b[\w'-]+\b/g);
  return words ? words.length : 0;
}

function clampSeoText(value = '', maxLength = 160) {
  const text = String(value).replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  const sliced = text.slice(0, maxLength - 1);
  const clean = sliced.slice(0, Math.max(sliced.lastIndexOf(' '), Math.floor(maxLength * 0.72))).replace(/[,.:-]+$/, '');
  return `${clean}…`;
}

function makeDistinctSeoTitle(title = '', h1 = '', suffix = 'Kritech Solution', prefix = 'Guide:') {
  const normalizedTitle = normalizeSeoCompare(title);
  const normalizedH1 = normalizeSeoCompare(h1);
  if (normalizedTitle && normalizedTitle !== normalizedH1) return clampSeoText(title, 70);

  const suffixText = ` | ${suffix}`;
  const baseLimit = Math.max(24, 70 - suffixText.length);
  const baseTitle = `${prefix} ${h1 || title || 'Kritech Solution'}`.replace(/\s+/g, ' ').trim();
  const base = clampSeoText(baseTitle, baseLimit).replace(/…$/, '').trim();
  return `${base}${suffixText}`;
}

function normalizeSeoCompare(value = '') {
  return String(value)
    .replace(/\s*\|\s*Kritech( Solution| Nepal| Blog)?$/i, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function normalizeSchemaDate(value) {
  const parsed = value ? new Date(value) : new Date();
  if (Number.isNaN(parsed.getTime())) return new Date().toISOString().slice(0, 10);
  return parsed.toISOString().slice(0, 10);
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
