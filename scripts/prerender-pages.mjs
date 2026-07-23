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
  pageData.set(path, { path, title: clampSeoText(title, 70), description: clampSeoText(description, 160), h1, bullets, faqs, extraParagraphs });
}

function addBlogPage(post) {
  const path = `/blog/${post.slug}`;
  pageData.set(path, {
    path,
    type: 'BlogPosting',
    title: clampSeoText(post.metaTitle || post.seoTitle || `${post.title} | Kritech Solution`, 70),
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
    <style id="seo-prerender-style">.seo-prerender{font-family:Inter,system-ui,sans-serif;max-width:1120px;margin:0 auto;padding:48px 24px;color:#07120d;background:#fff}.seo-prerender h1{font-size:clamp(2rem,5vw,4.5rem);line-height:1.02;margin:0 0 18px}.seo-prerender p{max-width:760px;font-size:1.05rem;line-height:1.7;color:#33443a}.seo-prerender ul{display:grid;gap:10px;padding-left:20px}.seo-prerender li{font-weight:700}.seo-prerender h2{margin-top:34px}</style>
  </head>`);

  return html.replace('<div id="root"></div>', `<div id="root">${staticContent}</div>`);
}

function renderStaticContent(page) {
  return `<main class="seo-prerender">
    <p>Kritech Solution</p>
    ${page.category ? `<p>${escapeHtml(page.category)}${page.author ? ` · ${escapeHtml(page.author)}` : ''}${page.date ? ` · ${escapeHtml(page.date)}` : ''}</p>` : ''}
    <h1>${escapeHtml(page.h1)}</h1>
    <p>${escapeHtml(page.description)}</p>
    ${page.extraParagraphs?.length ? page.extraParagraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('') : ''}
    ${page.bullets?.length ? `<ul>${page.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
    ${page.bodyHtml ? `<article class="imported-wordpress-content">${page.bodyHtml}</article>` : ''}
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
      areaServed: areaServedFor(page.path)
    });
  }

  if (isSoftwareProductPage(page.path)) {
    graph.push({
      '@type': 'SoftwareApplication',
      name: page.h1,
      applicationCategory: page.path.includes('mobile-app') || page.path.includes('custom-app') ? 'BusinessApplication' : 'BusinessApplication',
      operatingSystem: 'Web, Android, iOS',
      description: page.description,
      provider: {
        '@type': 'Organization',
        name: 'Kritech Solution',
        url: siteUrl
      }
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
