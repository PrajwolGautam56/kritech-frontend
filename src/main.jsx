import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  CircleDollarSign,
  Code2,
  Download,
  Gauge,
  Globe2,
  Layers3,
  LineChart,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  PenLine,
  Phone,
  Plus,
  Rocket,
  Search,
  Send,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Target,
  Upload,
  X
} from 'lucide-react';
import './styles.css';
import wordpressPosts from './wordpress-posts.json';

const SITE_URL = 'https://kritechsolution.com';
const SEO_VERSION = '2026-07-09-local-seo-pages-v2';
const API_BASE = import.meta.env.VITE_API_URL || '';

function currentRoute() {
  const hashRoute = window.location.hash.replace('#', '');
  if (hashRoute) return hashRoute;
  return window.location.pathname || '/';
}

const internationalSeoTargets = [
  {
    key: 'remoteDigitalMarketingAgency',
    path: '/remote-digital-marketing-agency',
    metaTitle: 'Remote Digital Marketing Agency for USA & UAE Businesses',
    metaDescription: 'Remote digital marketing agency from Nepal for USA and UAE businesses needing cost-effective SEO, ads, content, web development and white-label support.',
    eyebrow: 'Remote digital marketing agency',
    title: 'A cost-effective remote marketing and web team for USA and UAE businesses.',
    text: 'Kritech Solution helps startups, small businesses, agencies and founders in the USA and UAE outsource SEO, digital marketing, websites, content and technical work to a reliable Asia-based team.',
    bullets: ['Remote SEO and marketing execution', 'Website and landing page production', 'White-label support for agencies', 'Clear reporting across time zones'],
    highlights: ['Lower operating cost than local agency retainers', 'English communication and documented workflow', 'SEO, ads, content and development under one team'],
    processAreas: 'USA, UAE, Dubai, New York, Los Angeles, Houston, Abu Dhabi and Sharjah searches',
    areaLine: 'Kritech works from Nepal as a remote delivery partner for businesses, consultants, freelancers and agencies that need dependable execution without hiring a full in-house team.',
    faqs: [
      ['Can a Nepal-based agency work with USA or UAE clients?', 'Yes. Remote marketing work is delivery-driven: strategy calls, content planning, SEO tasks, ads, reporting and website development can be managed online with clear communication and timelines.'],
      ['Why outsource digital marketing to Kritech?', 'You get SEO, content, website and campaign execution from a cost-effective team while keeping communication, reporting and quality control structured.']
    ]
  },
  {
    key: 'digitalMarketingAgencyUae',
    path: '/digital-marketing-agency-uae',
    metaTitle: 'Digital Marketing Agency for UAE Businesses | Kritech Solution',
    metaDescription: 'Cost-effective digital marketing agency for UAE businesses needing SEO, Google Ads, Meta Ads, content, landing pages and remote marketing support.',
    eyebrow: 'Digital marketing agency for UAE',
    title: 'Remote digital marketing support for UAE companies that need leads without oversized retainers.',
    text: 'Kritech Solution supports UAE businesses with SEO, Google Ads, Meta Ads, landing pages, social media content, blog strategy and technical website improvements from a focused remote team.',
    bullets: ['SEO and ads for UAE businesses', 'Dubai, Abu Dhabi and Sharjah search targeting', 'Landing pages for lead generation', 'Monthly reporting and campaign optimization'],
    highlights: ['UAE-focused service and city keyword structure', 'Remote execution with transparent deliverables', 'Marketing plus website development support'],
    processAreas: 'Dubai, Abu Dhabi, Sharjah and UAE-wide buyer searches',
    areaLine: 'Kritech can support UAE service businesses, ecommerce brands, real estate teams, consultants, clinics, training institutes and small companies that want lean marketing execution.',
    faqs: [
      ['Can you target UAE customers from Nepal?', 'Yes. SEO pages, Google Ads, Meta campaigns, landing pages and content can be managed remotely while targeting UAE locations and buyer intent.'],
      ['Which UAE cities can you target?', 'We can target Dubai, Abu Dhabi, Sharjah and other UAE markets through focused pages, ads, content and campaign segmentation.']
    ]
  },
  {
    key: 'seoCompanyUae',
    path: '/seo-company-uae',
    metaTitle: 'SEO Company for UAE Businesses | Remote SEO Team',
    metaDescription: 'Remote SEO company for UAE businesses needing technical SEO, content planning, local pages, Search Console setup and Google ranking support.',
    eyebrow: 'SEO company for UAE',
    title: 'Technical SEO and content systems for UAE businesses competing on Google.',
    text: 'Kritech provides remote SEO support for UAE businesses that need better indexing, clearer service pages, technical fixes, content strategy, internal linking, schema and Search Console reporting.',
    bullets: ['Technical SEO audits', 'UAE service keyword mapping', 'Content and blog planning', 'Search Console and ranking reports'],
    highlights: ['SEO execution at remote-team pricing', 'Dubai and UAE search intent coverage', 'Technical and content work in one workflow'],
    processAreas: 'UAE, Dubai, Abu Dhabi and service-specific Google searches',
    areaLine: 'Kritech can help UAE businesses strengthen their website structure before scaling ads or content campaigns.',
    faqs: [
      ['Is SEO in the UAE competitive?', 'Yes. UAE search results can be competitive, so the page structure, content quality, technical SEO and authority signals must be stronger than generic agency pages.'],
      ['Do you provide monthly SEO work?', 'Yes. Monthly SEO can include audits, page updates, content briefs, blogs, metadata, internal linking, Search Console checks and reports.']
    ]
  },
  {
    key: 'webDevelopmentCompanyUae',
    path: '/web-development-company-uae',
    metaTitle: 'Web Development Company for UAE Businesses | Remote Team',
    metaDescription: 'Remote web development company for UAE businesses needing SEO-ready websites, landing pages, blogs, dashboards and conversion-focused design.',
    eyebrow: 'Web development company for UAE',
    title: 'SEO-ready websites and landing pages for UAE businesses.',
    text: 'Kritech builds fast, modern websites, service pages, landing pages, blog systems and admin dashboards for UAE businesses that need professional design and measurable lead generation.',
    bullets: ['Business websites and landing pages', 'SEO-ready structure and metadata', 'Blog CMS and admin workflows', 'Fast mobile-first design'],
    highlights: ['Premium design at remote delivery cost', 'Built for calls, forms and WhatsApp leads', 'Development connected to SEO and ads'],
    processAreas: 'UAE business website, landing page and web development searches',
    areaLine: 'Kritech supports UAE founders and small teams that need a polished website without building an expensive in-house tech department.',
    faqs: [
      ['Can you build websites for UAE businesses remotely?', 'Yes. Website strategy, design, development, content, revisions and launch support can be handled remotely with staged approvals.'],
      ['Will the website be ready for SEO?', 'Yes. Pages can include clean URLs, titles, meta descriptions, sitemap, schema-friendly content, analytics and conversion tracking.']
    ]
  },
  {
    key: 'digitalMarketingAgencyDubai',
    path: '/digital-marketing-agency-dubai',
    metaTitle: 'Digital Marketing Agency for Dubai Businesses | Kritech',
    metaDescription: 'Remote digital marketing agency for Dubai businesses needing SEO, paid ads, social media, landing pages and cost-effective campaign execution.',
    eyebrow: 'Digital marketing agency for Dubai',
    title: 'Remote digital marketing execution for Dubai businesses and agencies.',
    text: 'Kritech helps Dubai businesses and agencies with SEO, content, Google Ads support, Meta campaigns, landing pages, reporting and website improvements from a lean remote team.',
    bullets: ['Dubai SEO and campaign support', 'Google Ads and Meta Ads workflows', 'Content and landing page production', 'White-label support for Dubai agencies'],
    highlights: ['Dubai-focused buyer intent', 'Remote team cost advantage', 'Marketing and web execution together'],
    processAreas: 'Dubai service, agency outsourcing and lead-generation searches',
    areaLine: 'Kritech can support Dubai consultants, real estate teams, clinics, ecommerce brands, service companies and marketing agencies that need dependable execution.',
    faqs: [
      ['Can Kritech work as a white-label partner for Dubai agencies?', 'Yes. Kritech can support agencies with SEO tasks, website pages, content, reports and campaign assets under a structured delivery process.'],
      ['Do you target Dubai keywords?', 'Yes. We can build Dubai-focused service pages, landing pages and content around high-intent search terms.']
    ]
  },
  {
    key: 'seoCompanyDubai',
    path: '/seo-company-dubai',
    metaTitle: 'SEO Company for Dubai Businesses | Remote SEO Support',
    metaDescription: 'Remote SEO company for Dubai businesses needing technical SEO, content, local service pages, schema, Search Console and ranking support.',
    eyebrow: 'SEO company for Dubai',
    title: 'SEO support for Dubai businesses that need stronger Google visibility.',
    text: 'Kritech helps Dubai businesses improve technical SEO, service pages, content depth, internal links, schema-ready copy, blog planning and Search Console reporting.',
    bullets: ['Technical SEO and site audits', 'Dubai service page strategy', 'Content briefs and blog plans', 'Ranking and lead-focused reporting'],
    highlights: ['Search intent mapped before writing', 'Affordable monthly SEO delivery', 'Built for organic leads, not vanity traffic'],
    processAreas: 'Dubai SEO, local service and industry-specific search queries',
    areaLine: 'Kritech can help Dubai businesses build the SEO foundation needed before competing for expensive paid traffic.',
    faqs: [
      ['How can a remote SEO company help in Dubai?', 'SEO work is mostly technical, content and analytical. A remote team can audit the site, improve pages, publish content and track progress from anywhere.'],
      ['Can SEO reduce ad dependency?', 'SEO can reduce long-term dependence on paid traffic by building organic visibility, but ads can still support faster lead generation.']
    ]
  },
  {
    key: 'webDevelopmentCompanyDubai',
    path: '/web-development-company-dubai',
    metaTitle: 'Web Development Company for Dubai Businesses | Remote Team',
    metaDescription: 'Remote web development company for Dubai businesses needing modern websites, landing pages, CMS blogs and SEO-ready design.',
    eyebrow: 'Web development company for Dubai',
    title: 'Modern websites and landing pages for Dubai businesses.',
    text: 'Kritech creates SEO-ready websites, conversion landing pages, blog systems, dashboards and campaign pages for Dubai businesses that need speed, design quality and reliable delivery.',
    bullets: ['Company websites and landing pages', 'CMS and blog setup', 'Lead forms and WhatsApp flows', 'Performance and SEO foundations'],
    highlights: ['Premium website quality without Dubai agency pricing', 'Design, SEO and conversion working together', 'Remote development with clear milestones'],
    processAreas: 'Dubai website design, web development and landing page searches',
    areaLine: 'Kritech supports Dubai businesses that want a professional website built by a flexible remote team.',
    faqs: [
      ['Do you build websites for Dubai companies?', 'Yes. Kritech can plan, design and develop websites remotely for Dubai companies with clear approval stages.'],
      ['Can you create landing pages for ads?', 'Yes. We build landing pages for Google Ads, Meta Ads and lead-generation campaigns with tracking and conversion flows.']
    ]
  },
  {
    key: 'digitalMarketingAgencyUsa',
    path: '/digital-marketing-agency-usa',
    metaTitle: 'Remote Digital Marketing Agency for USA Small Businesses',
    metaDescription: 'Remote digital marketing agency for USA small businesses needing affordable SEO, websites, content, landing pages, Google Ads and social media support.',
    eyebrow: 'Digital marketing agency for USA',
    title: 'A remote marketing team for USA small businesses that need consistent execution.',
    text: 'Kritech Solution helps USA small businesses, startups, consultants and agencies with SEO, website development, content, landing pages, campaign assets and reporting from a cost-effective remote team.',
    bullets: ['SEO and website support for USA businesses', 'Content and landing page production', 'Remote reporting and async workflow', 'White-label support for agencies and freelancers'],
    highlights: ['Lower cost than many local retainers', 'Built for small business lead generation', 'Marketing, content and development in one team'],
    processAreas: 'USA, New York, Los Angeles, Houston, Chicago, Miami and remote agency searches',
    areaLine: 'Kritech can support USA businesses that want reliable marketing execution without hiring a full internal team.',
    faqs: [
      ['Can Kritech work with USA clients from Nepal?', 'Yes. Remote SEO, content, websites, reporting and campaign support can be delivered online with clear communication and scheduled updates.'],
      ['What kind of USA clients are a good fit?', 'Small businesses, consultants, startups, local service companies, agencies and freelancers that need dependable production support are a good fit.']
    ]
  },
  {
    key: 'seoCompanyUsa',
    path: '/seo-company-usa',
    metaTitle: 'Remote SEO Company for USA Small Businesses | Kritech',
    metaDescription: 'Remote SEO company for USA small businesses needing technical SEO, content strategy, service pages, blog planning and Search Console reporting.',
    eyebrow: 'SEO company for USA',
    title: 'Remote SEO support for USA businesses that need rankings and leads.',
    text: 'Kritech helps USA businesses improve technical SEO, content structure, service pages, internal linking, blog strategy, metadata, sitemap quality and Search Console tracking.',
    bullets: ['Technical SEO and on-page fixes', 'Service page and content strategy', 'Blog briefs and publishing support', 'Search Console-based reporting'],
    highlights: ['SEO delivery for lean budgets', 'Content built around buyer intent', 'Technical improvements connected to leads'],
    processAreas: 'USA SEO, outsourced SEO, small business SEO and remote SEO support searches',
    areaLine: 'Kritech can support USA businesses and agencies that need regular SEO execution without hiring a full-time specialist.',
    faqs: [
      ['Can a remote SEO company rank a USA business?', 'Remote SEO can improve technical quality, content targeting and measurement. Ranking depends on competition, authority, reviews, backlinks and ongoing effort.'],
      ['Do you offer white-label SEO?', 'Yes. Kritech can support agencies and freelancers with SEO audits, content briefs, page updates and monthly reports.']
    ]
  },
  {
    key: 'webDevelopmentCompanyUsa',
    path: '/web-development-company-usa',
    metaTitle: 'Remote Web Development Company for USA Businesses',
    metaDescription: 'Remote web development company for USA businesses needing affordable SEO-ready websites, landing pages, CMS blogs and conversion-focused design.',
    eyebrow: 'Web development company for USA',
    title: 'SEO-ready websites for USA businesses, built by a focused remote team.',
    text: 'Kritech builds business websites, landing pages, CMS blogs, dashboards and campaign pages for USA companies that need strong design, clean structure and reliable technical execution.',
    bullets: ['Business websites and landing pages', 'SEO-ready URLs and metadata', 'Blog CMS and admin workflows', 'Lead forms, analytics and tracking'],
    highlights: ['Remote development without bloated agency cost', 'Built for mobile users and conversions', 'Web development connected to SEO strategy'],
    processAreas: 'USA web development, business website and landing page searches',
    areaLine: 'Kritech supports USA small businesses, consultants and agencies that need a practical website partner.',
    faqs: [
      ['Can you build a website for a USA business remotely?', 'Yes. The full website process can be handled remotely with planning, design previews, development milestones and launch support.'],
      ['Can you maintain the site after launch?', 'Yes. Kritech can provide content updates, backups, security checks, speed improvements and SEO support.']
    ]
  },
  {
    key: 'digitalMarketingAgencyNewYork',
    path: '/digital-marketing-agency-new-york',
    metaTitle: 'Remote Digital Marketing Agency for New York Businesses',
    metaDescription: 'Remote digital marketing support for New York small businesses needing SEO, content, websites, landing pages and cost-effective execution.',
    eyebrow: 'Digital marketing agency for New York',
    title: 'Remote marketing support for New York small businesses and consultants.',
    text: 'Kritech helps New York businesses and agencies with SEO tasks, content production, landing pages, website updates, campaign assets and reporting from a cost-effective remote team.',
    bullets: ['SEO and content production', 'Landing pages for local services', 'Website updates and tracking', 'White-label agency support'],
    highlights: ['Built for high-cost markets', 'Remote execution at leaner pricing', 'Clear deliverables for busy teams'],
    processAreas: 'New York digital marketing, SEO and website support searches',
    areaLine: 'Kritech is a good fit for New York small businesses that need execution support without paying for a large local agency structure.',
    faqs: [
      ['Why would a New York business hire a remote agency?', 'A remote team can reduce execution cost while still delivering SEO, content, website and reporting work through clear online collaboration.'],
      ['Can you support local New York SEO?', 'Yes. We can create location-aware service pages, content briefs and technical SEO updates for New York-focused businesses.']
    ]
  },
  {
    key: 'seoCompanyNewYork',
    path: '/seo-company-new-york',
    metaTitle: 'Remote SEO Company for New York Small Businesses',
    metaDescription: 'Remote SEO company for New York businesses needing technical SEO, service pages, blog content, local SEO support and Search Console reporting.',
    eyebrow: 'SEO company for New York',
    title: 'Remote SEO execution for New York businesses competing in expensive markets.',
    text: 'Kritech supports New York businesses with technical SEO, page structure, content planning, metadata, internal links, blog strategy and monthly Search Console-based improvements.',
    bullets: ['Technical and on-page SEO', 'New York service page support', 'Content briefs and blog planning', 'Monthly measurement and updates'],
    highlights: ['Affordable SEO production partner', 'Focused on qualified leads', 'Useful for agencies and small businesses'],
    processAreas: 'New York SEO, local service SEO and outsourced SEO searches',
    areaLine: 'Kritech can help New York businesses build a practical SEO foundation before scaling paid campaigns.',
    faqs: [
      ['Can remote SEO help in a competitive city like New York?', 'Yes, but it needs stronger content, technical quality, authority building and consistent improvement. Remote execution can support that work.'],
      ['Do you guarantee rankings?', 'No ethical SEO company can guarantee a specific ranking. We can build the foundation and improve visibility through consistent, measurable work.']
    ]
  },
  {
    key: 'webDevelopmentCompanyNewYork',
    path: '/web-development-company-new-york',
    metaTitle: 'Remote Web Development Company for New York Businesses',
    metaDescription: 'Remote web development company for New York businesses needing SEO-ready websites, landing pages, CMS blogs and conversion-focused design.',
    eyebrow: 'Web development company for New York',
    title: 'Modern websites and landing pages for New York businesses.',
    text: 'Kritech builds websites, landing pages, blog systems and lead-generation pages for New York businesses that need a professional online presence without a heavy local agency retainer.',
    bullets: ['Business websites and landing pages', 'SEO-ready structure and copy', 'CMS blogs and admin workflows', 'Lead forms and analytics'],
    highlights: ['Professional web delivery at remote-team cost', 'Built around SEO and conversion', 'Clear launch and maintenance workflow'],
    processAreas: 'New York web development, business website and landing page searches',
    areaLine: 'Kritech can support New York founders, consultants, local service businesses and agencies with fast website execution.',
    faqs: [
      ['Can you build landing pages for New York ads?', 'Yes. We can build service and campaign landing pages with clear copy, forms, WhatsApp or phone flows, and tracking.'],
      ['Can you work with an existing design?', 'Yes. We can implement an existing design or improve an existing website with better structure, performance and SEO basics.']
    ]
  }
];

const defaultSeo = {
  home: {
    path: '/',
    title: 'Kritech Solution | Digital Marketing Agency in Butwal, Nepal',
    description:
      'Kritech Solution is a digital marketing, SEO, web development and IT solutions company in Butwal, Nepal helping businesses rank higher and generate leads.'
  },
  services: {
    path: '/services',
    title: 'SEO, Web Development & Digital Marketing Services in Butwal',
    description:
      'Explore SEO services, website development, social media marketing, Google Ads, software, hosting and IT support from Kritech Solution in Butwal, Nepal.'
  },
  about: {
    path: '/about',
    title: 'About Kritech Solution | Digital Marketing & IT Company in Butwal',
    description:
      'Learn about Kritech Solution, a Butwal-based digital marketing, SEO, web development and IT solutions company helping Nepali businesses grow online.'
  },
  seoButwal: {
    path: '/seo-services-butwal',
    title: 'SEO Services in Butwal, Nepal | Kritech Solution',
    description:
      'Local SEO, technical SEO, Google Business Profile optimization, content strategy and Search Console setup for businesses in Butwal and across Nepal.'
  },
  digitalMarketingButwal: {
    path: '/digital-marketing-agency-butwal',
    title: 'Digital Marketing Agency in Butwal | Kritech Solution',
    description:
      'Digital marketing agency in Butwal for SEO, Google Ads, Meta ads, social media marketing, website strategy and lead generation campaigns.'
  },
  webButwal: {
    path: '/web-development-butwal',
    title: 'Web Development Company in Butwal, Nepal | Kritech Solution',
    description:
      'Professional website design and web development in Butwal for business websites, landing pages, CMS blogs, ecommerce and SEO-ready company websites.'
  },
  websiteDevelopmentButwal: {
    path: '/website-development-company-butwal',
    title: 'Website Development Company in Butwal | Kritech Solution',
    description:
      'Website development company in Butwal building SEO-ready business websites, landing pages, CMS blogs, ecommerce pages and conversion-focused designs.'
  },
  marketingNepal: {
    path: '/digital-marketing-nepal',
    title: 'Digital Marketing Agency in Nepal | SEO, Ads & Social Media',
    description:
      'Digital marketing agency in Nepal for SEO, Google Ads, Meta ads, social media marketing, content strategy and lead generation campaigns.'
  },
  digitalMarketingAgencyNepal: {
    path: '/digital-marketing-agency-nepal',
    title: 'Digital Marketing Agency in Nepal | Kritech Solution',
    description:
      'Nepal digital marketing agency for SEO, social media marketing, Google Ads, Meta campaigns, content strategy, websites and lead generation.'
  },
  seoCompanyNepal: {
    path: '/seo-company-nepal',
    title: 'SEO Company in Nepal | Google Ranking & Local SEO Services',
    description:
      'SEO company in Nepal helping businesses improve Google rankings with technical SEO, content strategy, local SEO, schema, blogs and Search Console tracking.'
  },
  webCompanyNepal: {
    path: '/web-development-company-nepal',
    title: 'Web Development Company in Nepal | SEO-Ready Websites',
    description:
      'Web development company in Nepal creating fast, mobile-first, SEO-ready websites, landing pages, CMS blogs and business web systems.'
  },
  itButwal: {
    path: '/it-company-butwal',
    title: 'IT Company in Butwal | Software, Hosting & Support',
    description:
      'IT company in Butwal providing website maintenance, software solutions, hosting, email, backups, security and business IT support.'
  },
  itCompanyNepal: {
    path: '/it-company-nepal',
    title: 'IT Company in Nepal | Software, Website, Hosting & Support',
    description:
      'IT company in Nepal for websites, software solutions, hosting, business email, website maintenance, backups, security and technical support.'
  },
  bhairahawaServices: {
    path: '/services-bhairahawa',
    title: 'Digital Marketing, SEO & Web Development Services in Bhairahawa',
    description:
      'SEO, digital marketing, website development, social media, Google Ads and IT support services for businesses in Bhairahawa and Rupandehi.'
  },
  tilottamaServices: {
    path: '/services-tilottama',
    title: 'Digital Marketing, SEO & Web Development Services in Tilottama',
    description:
      'SEO services, digital marketing, website development, ads, social media and IT support for businesses in Tilottama, Rupandehi and Nepal.'
  },
  ...Object.fromEntries(internationalSeoTargets.map((target) => [
    target.key,
    {
      path: target.path,
      title: target.metaTitle,
      description: target.metaDescription
    }
  ])),
  pricing: {
    path: '/pricing',
    title: 'Digital Marketing & Website Packages | Kritech Solution',
    description:
      'Flexible SEO, website, social media, and IT solution packages for startups, small businesses, and growing companies in Nepal.'
  },
  blog: {
    path: '/blog',
    title: 'Digital Growth Blog for Nepal Businesses | Kritech Solution',
    description:
      'Read practical guides on SEO, digital marketing, websites, Google rankings, and business technology for Nepal.'
  },
  contact: {
    path: '/contact',
    title: 'Contact Kritech Solution | Digital Agency in Butwal, Nepal',
    description:
      'Contact Kritech Solution in Butwal for SEO, digital marketing, web development, and IT service consultation.'
  }
};

const defaultPosts = [
  ...wordpressPosts,
  {
    id: crypto.randomUUID(),
    title: 'How Local SEO Helps Businesses in Butwal and Kathmandu Win More Leads',
    slug: 'local-seo-nepal-business-leads',
    excerpt:
      'A practical guide to Google Business Profile, local keywords, citations, reviews, and city-specific landing pages.',
    category: 'SEO',
    author: 'Kritech Team',
    date: '2026-07-07',
    status: 'Published',
    metaTitle: 'Local SEO in Nepal: Rank in Butwal, Kathmandu & Beyond',
    metaDescription:
      'Learn how Nepali businesses can use local SEO to rank on Google, increase calls, and generate more qualified leads.',
    content:
      'Local SEO works when your website, Google Business Profile, content, and reviews all tell Google the same story: who you help, where you help them, and why customers trust you.'
  },
  {
    id: crypto.randomUUID(),
    title: 'Best Digital Marketing Agency in Butwal: What Businesses Should Look For',
    slug: 'best-digital-marketing-agency-butwal',
    excerpt:
      'How to compare SEO, social media, ads, web design, reporting and technical support before choosing a marketing partner in Butwal.',
    category: 'Digital Marketing',
    author: 'Kritech Team',
    date: '2026-07-08',
    status: 'Published',
    metaTitle: 'Best Digital Marketing Agency in Butwal | Kritech Solution',
    metaDescription:
      'Learn what makes a strong digital marketing agency in Butwal, Nepal, including SEO, ads, website quality, content and reporting.',
    content:
      'The best digital marketing agency in Butwal should understand local search behavior, create fast websites, publish useful content, manage Google and Meta campaigns, and report leads clearly. Businesses should look for SEO structure, mobile performance, Google Business Profile support, conversion-focused landing pages and transparent monthly reporting.'
  },
  {
    id: crypto.randomUUID(),
    title: 'SEO Services in Nepal: A Practical Ranking Plan for Local Businesses',
    slug: 'seo-services-nepal-local-business-plan',
    excerpt:
      'A Nepal-focused SEO plan covering technical SEO, local pages, search intent, Google Business Profile, blogs, backlinks and measurement.',
    category: 'SEO',
    author: 'Kritech Team',
    date: '2026-07-08',
    status: 'Published',
    metaTitle: 'SEO Services in Nepal for Local Businesses | Kritech Solution',
    metaDescription:
      'A practical SEO services plan for Nepal businesses that want better Google rankings, local leads and measurable search visibility.',
    content:
      'SEO services in Nepal should start with a technical audit, keyword mapping, location pages, service pages, internal linking, useful blog content, Google Business Profile optimization and Search Console measurement. The goal is not only traffic, but qualified calls, WhatsApp messages and form submissions.'
  },
  {
    id: crypto.randomUUID(),
    title: 'Website Features Every Growing Nepali Business Needs in 2026',
    slug: 'business-website-features-nepal-2026',
    excerpt:
      'Speed, conversion-focused sections, mobile-first design, schema, analytics, and clear contact flows matter more than decoration.',
    category: 'Web Development',
    author: 'Kritech Team',
    date: '2026-07-07',
    status: 'Draft',
    metaTitle: 'Must-Have Website Features for Nepali Businesses in 2026',
    metaDescription:
      'See the website features Nepali businesses need to improve trust, conversions, SEO, and mobile performance.',
    content:
      'A strong business website should load fast, explain the offer clearly, prove trust quickly, answer buyer questions, and make contact effortless from every device.'
  }
];

const services = [
  {
    icon: Search,
    title: 'SEO Services in Butwal',
    text: 'Local SEO, technical SEO, keyword strategy, Google Business Profile optimization, schema and ranking reports for Butwal and Nepal searches.'
  },
  {
    icon: Code2,
    title: 'Web Development in Butwal',
    text: 'Fast, mobile-first websites with clean UX, service pages, lead capture, analytics and SEO-ready architecture for Nepali businesses.'
  },
  {
    icon: Megaphone,
    title: 'Social Media Marketing Nepal',
    text: 'Platform-specific content, campaign calendars, reels, graphics, audience growth and paid social optimization for Nepali audiences.'
  },
  {
    icon: CircleDollarSign,
    title: 'Google Ads & Meta Ads',
    text: 'Conversion tracking, landing pages, campaign structure, testing and budget optimization for local lead generation.'
  },
  {
    icon: ServerCog,
    title: 'IT Company in Butwal',
    text: 'Domain, hosting, email, maintenance, backups, security hardening and ongoing technical support for growing companies.'
  },
  {
    icon: Layers3,
    title: 'Software Solutions Nepal',
    text: 'Custom dashboards, CRM workflows, booking systems, reporting tools and automations that reduce manual work.'
  }
];

const internationalLandingPages = Object.fromEntries(internationalSeoTargets.map((target) => [
  target.path,
  {
    eyebrow: target.eyebrow,
    title: target.title,
    text: target.text,
    bullets: target.bullets,
    highlights: target.highlights,
    faqs: target.faqs,
    processAreas: target.processAreas,
    areaLine: target.areaLine,
    marketIntro:
      `Google needs pages that prove Kritech can serve ${target.eyebrow.toLowerCase()} searches with real service detail, remote delivery clarity, useful FAQs, strong internal links and measurable next steps.`
  }
]));

const localLandingPages = {
  '/seo-services-butwal': {
    eyebrow: 'SEO services in Butwal',
    title: 'Local SEO, technical SEO and Google ranking support for Butwal businesses.',
    text: 'Kritech Solution helps businesses in Butwal and across Nepal improve Google visibility through keyword research, technical fixes, service pages, blog strategy, Google Business Profile optimization and Search Console tracking.',
    bullets: ['Local SEO for Butwal searches', 'Technical SEO and Core Web Vitals', 'Google Business Profile optimization', 'Schema, sitemap and Search Console setup'],
    highlights: ['Keyword map for Butwal buyers', 'Service pages that answer search intent', 'Monthly ranking and lead tracking'],
    faqs: [
      ['Can SEO help my Butwal business get more calls?', 'Yes. Local SEO targets searches from people looking for services in Butwal, then sends them to pages built for phone calls, WhatsApp clicks and contact form inquiries.'],
      ['What do you optimize first?', 'We start with technical SEO, page structure, local keywords, Google Business Profile signals and Search Console setup.']
    ]
  },
  '/digital-marketing-agency-butwal': {
    eyebrow: 'Digital marketing agency in Butwal',
    title: 'SEO, ads, social media and landing pages for businesses in Butwal.',
    text: 'Kritech Solution helps Butwal businesses create a complete digital marketing system: search visibility, social content, Meta ads, Google Ads, conversion-focused websites and clear monthly reporting.',
    bullets: ['SEO and local ranking strategy', 'Facebook, Instagram and Google campaigns', 'Landing pages built for lead generation', 'Reports focused on calls and inquiries'],
    highlights: ['Butwal-focused campaign messaging', 'Ad funnels connected to website pages', 'Organic and paid growth working together'],
    faqs: [
      ['Why choose a digital marketing agency in Butwal?', 'A local agency understands Butwal search behavior, local competition, nearby cities and how Nepali customers make decisions online.'],
      ['Can you manage both ads and SEO?', 'Yes. We connect SEO, Google Ads, Meta Ads, landing pages and reporting so traffic turns into measurable leads.']
    ]
  },
  '/web-development-butwal': {
    eyebrow: 'Web development company in Butwal',
    title: 'SEO-ready business websites built for speed, trust and lead generation.',
    text: 'We design and develop company websites, landing pages, blog systems, ecommerce-ready pages and CMS-backed websites for businesses in Butwal, Bhairahawa, Kathmandu, Pokhara and across Nepal.',
    bullets: ['Business website design', 'Landing page development', 'CMS and blog setup', 'Conversion-focused contact flows'],
    highlights: ['Real URLs and clean page hierarchy', 'Fast mobile-first interface', 'Blog and SEO admin architecture'],
    faqs: [
      ['Will my website be SEO-ready?', 'Yes. We plan page structure, headings, metadata, schema, sitemap, analytics and contact flows before launch.'],
      ['Can you build a blog CMS?', 'Yes. We can build a blog CMS with image upload, SEO fields, sitemap support and publishing workflow.']
    ]
  },
  '/website-development-company-butwal': {
    eyebrow: 'Website development company in Butwal',
    title: 'Modern websites for Butwal companies that need trust, speed and inquiries.',
    text: 'Kritech builds premium business websites for Butwal brands with service pages, local SEO structure, blog systems, WhatsApp/contact flows and technical setup for Google indexing.',
    bullets: ['Company websites and landing pages', 'Local SEO content structure', 'CMS blog publishing', 'Performance and conversion tracking'],
    highlights: ['Professional UI for credibility', 'SEO-first architecture', 'Built for calls, WhatsApp and leads'],
    faqs: [
      ['What kind of websites do you build?', 'We build company websites, service websites, landing pages, campaign pages, blog systems and custom dashboards.'],
      ['Do you provide hosting and maintenance?', 'Yes. We can support hosting, domain, email, backups, security and website maintenance.']
    ]
  },
  '/digital-marketing-nepal': {
    eyebrow: 'Digital marketing agency in Nepal',
    title: 'SEO, social media, Google Ads and content systems for Nepali businesses.',
    text: 'Kritech Solution connects digital marketing strategy with measurable execution: SEO, social media marketing, Meta ads, Google Ads, content planning, reporting and landing page optimization.',
    bullets: ['SEO and content marketing', 'Social media marketing Nepal', 'Google Ads and Meta Ads', 'Monthly performance reporting'],
    highlights: ['National keyword targeting', 'Nepal-wide ad audience planning', 'Lead funnels for service businesses'],
    faqs: [
      ['Do you work with businesses across Nepal?', 'Yes. We work with businesses in Butwal, Bhairahawa, Tilottama, Kathmandu, Pokhara, Chitwan and other locations across Nepal.'],
      ['What digital marketing channels do you manage?', 'We manage SEO, content, Facebook, Instagram, Google Ads, landing pages, tracking and reporting.']
    ]
  },
  '/digital-marketing-agency-nepal': {
    eyebrow: 'Digital marketing agency in Nepal',
    title: 'A Nepal-focused digital marketing agency for search, social and leads.',
    text: 'Kritech Solution helps Nepali businesses grow through SEO, high-performing websites, social media content, Google Ads, Meta Ads, blog publishing and technical tracking systems.',
    bullets: ['SEO strategy for Nepal keywords', 'Google Ads and Meta Ads management', 'Social media content planning', 'Landing pages and analytics'],
    highlights: ['Campaigns connected to measurable leads', 'Content built for search intent', 'Local and national SEO architecture'],
    faqs: [
      ['Can you target all Nepal?', 'Yes. We can create Nepal-wide pages and campaigns while still targeting local city searches where competition is different.'],
      ['Do you write SEO content?', 'Yes. We create service pages, city pages, blogs, FAQs and metadata around real search intent.']
    ]
  },
  '/seo-company-nepal': {
    eyebrow: 'SEO company in Nepal',
    title: 'Technical SEO, content strategy and local ranking systems for Nepal.',
    text: 'Kritech Solution provides SEO services in Nepal for businesses that need stronger Google visibility, better indexing, local pages, helpful blog content and Search Console-based reporting.',
    bullets: ['Technical SEO audits', 'Keyword and content mapping', 'Local SEO pages', 'Schema, sitemap and indexing support'],
    highlights: ['Search Console-ready setup', 'Service pages for high-intent keywords', 'SEO reports tied to inquiries'],
    faqs: [
      ['What makes a strong SEO company in Nepal?', 'A strong SEO company should combine technical fixes, content quality, local SEO, analytics, internal linking and transparent reporting.'],
      ['Can SEO replace paid ads?', 'SEO builds long-term organic visibility. Paid ads can bring faster leads, but both channels work best when connected.']
    ]
  },
  '/web-development-company-nepal': {
    eyebrow: 'Web development company in Nepal',
    title: 'SEO-ready websites and web systems for businesses across Nepal.',
    text: 'Kritech Solution develops modern websites, landing pages, blog systems, dashboards and business web applications with fast performance, clean UX and search-friendly structure.',
    bullets: ['Business website development', 'CMS and blog systems', 'Landing pages for ads', 'Analytics and SEO foundations'],
    highlights: ['Mobile-first experience', 'Real SEO URL structure', 'Secure admin and content workflow'],
    faqs: [
      ['Do you build websites for companies outside Butwal?', 'Yes. We build websites for businesses across Nepal and can work remotely with teams in any city.'],
      ['Can my website include blog and SEO management?', 'Yes. We can include blog upload, metadata, featured images, sitemap generation and content management.']
    ]
  },
  '/it-company-butwal': {
    eyebrow: 'IT company in Butwal',
    title: 'Reliable IT support, hosting, maintenance and software solutions.',
    text: 'From domain, hosting and email setup to website maintenance, security, backups and custom software workflows, Kritech supports the technology foundation behind your business.',
    bullets: ['Hosting and email support', 'Website maintenance', 'Backups and security', 'Custom software and automation'],
    highlights: ['Technical support for daily operations', 'Website health and uptime focus', 'Business software and dashboards'],
    faqs: [
      ['What IT services do you provide in Butwal?', 'We support websites, hosting, email, maintenance, backups, security, custom software and business workflow tools.'],
      ['Can you maintain my existing website?', 'Yes. We can help with updates, backups, security checks, content changes and performance improvements.']
    ]
  },
  '/it-company-nepal': {
    eyebrow: 'IT company in Nepal',
    title: 'Websites, software, hosting and business IT support for Nepal.',
    text: 'Kritech Solution supports Nepali businesses with websites, custom software, hosting, email, maintenance, dashboards, automation and ongoing technical support.',
    bullets: ['Software and web systems', 'Hosting, email and backups', 'Website maintenance', 'Admin dashboards and automation'],
    highlights: ['IT foundation for growth', 'Secure and maintainable systems', 'Support for marketing and operations'],
    faqs: [
      ['Can an IT company also support marketing?', 'Yes. At Kritech, the technical foundation supports SEO, landing pages, analytics, ads and content systems.'],
      ['Do you build custom software?', 'Yes. We can build dashboards, CRM workflows, booking tools, reporting systems and automations.']
    ]
  },
  '/services-bhairahawa': {
    eyebrow: 'Digital marketing services in Bhairahawa',
    title: 'SEO, websites and digital marketing for Bhairahawa businesses.',
    text: 'Kritech Solution helps businesses in Bhairahawa and Rupandehi improve Google visibility, launch better websites, run Meta and Google campaigns, and generate more local inquiries.',
    bullets: ['Local SEO for Bhairahawa searches', 'Website development and landing pages', 'Google Ads and Meta Ads', 'Social media marketing and reporting'],
    highlights: ['Rupandehi-focused search intent', 'Campaigns for local leads', 'Service pages that connect to Google Maps and organic search'],
    faqs: [
      ['Do you provide SEO services in Bhairahawa?', 'Yes. We can target Bhairahawa service searches with local landing pages, technical SEO, Google Business Profile signals and content.'],
      ['Can you run ads for Bhairahawa customers?', 'Yes. We can run Meta Ads and Google Ads targeting Bhairahawa, Rupandehi and nearby markets.']
    ]
  },
  '/services-tilottama': {
    eyebrow: 'Digital marketing services in Tilottama',
    title: 'SEO, web development and campaign systems for Tilottama brands.',
    text: 'Kritech Solution supports Tilottama businesses with local SEO, SEO-ready websites, social media marketing, Google Ads, Meta Ads, lead-generation pages and technical support.',
    bullets: ['Tilottama local SEO pages', 'Website design and development', 'Social media and paid ads', 'Lead tracking and reporting'],
    highlights: ['Location content for Tilottama searches', 'Mobile-first service pages', 'Marketing and IT connected together'],
    faqs: [
      ['Do you work with Tilottama businesses?', 'Yes. We support businesses in Tilottama with SEO, websites, ads, content and technical support.'],
      ['Can you help a local business get more inquiries?', 'Yes. We connect search-friendly pages, ads, WhatsApp/contact flows and reporting so inquiries are easier to measure.']
    ]
  },
  ...internationalLandingPages
};

const keywordClusters = [
  ['Digital Marketing', ['digital marketing agency in Butwal', 'digital marketing agency in Nepal', 'social media marketing Nepal', 'Google Ads agency Nepal']],
  ['SEO', ['SEO services in Butwal', 'SEO company in Nepal', 'local SEO Nepal', 'Google ranking service Nepal']],
  ['Web Development', ['website development company in Butwal', 'web development company Nepal', 'business website Butwal', 'web design company Nepal']],
  ['Local Areas', ['digital marketing Bhairahawa', 'SEO services Tilottama', 'IT company Rupandehi', 'web development Bhairahawa']],
  ['Global Outsourcing', ['remote digital marketing agency', 'outsourced SEO services USA', 'digital marketing agency UAE', 'web development company Dubai']]
];

const packages = [
  ['Social Media Starter', 'Facebook & Instagram management for small brands getting started online', 'Rs. 11,000', '/ month', [
    '12 posts/month (Facebook + Instagram)',
    'Content creation & captions',
    'Basic paid ad setup (up to NPR 5,000 ad budget)',
    'Community management & replies',
    'Monthly analytics report'
  ]],
  ['Full Digital Campaign', 'Facebook Ads + Google Ads + social media — all managed by one team', 'Rs. 28,000', '/ month', [
    'Facebook Ads + Google Ads (PPC) management',
    '20 content posts/month (FB + IG + others)',
    'Lead generation campaign strategy',
    'Audience research & Nepal-wide targeting',
    'Bi-weekly performance report',
    'Ad creative design included',
    'Remarketing & full-funnel campaign',
    'Dedicated account manager'
  ]],
  ['Custom Campaign', 'Multi-channel strategy for brands with larger budgets & national reach', 'Rs. 50,000+', '/ month', [
    'All platforms: FB, IG, Google, YouTube, TikTok',
    'Influencer marketing coordination',
    'Video & content production support',
    'Advanced analytics & conversion tracking',
    'Brand strategy & identity consulting',
    'Weekly strategy calls'
  ]]
];

const faqs = [
  ['What is included in SEO services in Butwal?', 'SEO services in Butwal usually include keyword research, technical SEO, on-page optimization, Google Business Profile improvement, local landing pages, blog planning, schema markup, sitemap setup and Search Console tracking. Kritech Solution connects these tasks so your website can rank for service and location searches.'],
  ['How can Kritech Solution help my business rank higher on Google?', 'We start with a website and keyword audit, fix technical issues, improve page speed, write clearer service content, optimize meta titles and descriptions, build local SEO pages, publish helpful blogs and track progress through Google Search Console. The goal is more qualified calls, WhatsApp messages and form inquiries.'],
  ['Do I need local SEO if my business is in Butwal?', 'Yes. Local SEO helps customers near Butwal, Bhairahawa, Tilottama and nearby areas find your business when they search on Google or Google Maps. It is especially useful for service businesses, shops, clinics, institutes, restaurants, real estate companies and professional services.'],
  ['How long does SEO take to show results in Nepal?', 'Most Nepal businesses need 3 to 6 months to see meaningful SEO movement, depending on competition, website quality, content depth, backlinks, page speed and local signals. Some technical fixes can improve indexing faster, but stable rankings usually need consistent work.'],
  ['What is the difference between SEO and Google Ads?', 'SEO improves organic visibility over time, while Google Ads can bring paid traffic quickly. A strong digital marketing plan often uses both: SEO for long-term ranking and trust, Google Ads for immediate lead generation and testing high-intent keywords.'],
  ['Can you create SEO-ready websites for Nepali businesses?', 'Yes. Kritech Solution builds fast, mobile-first websites with clean page structure, service pages, blog CMS, schema, metadata, sitemap, analytics and conversion flows such as phone, WhatsApp and contact forms.'],
  ['Do you provide digital marketing services outside Butwal?', 'Yes. Kritech Solution is based in Butwal, but we serve businesses in Bhairahawa, Tilottama, Kathmandu, Pokhara, Chitwan and across Nepal with SEO, website development, social media marketing, Google Ads, Meta Ads and IT support.'],
  ['Can you manage blogs for SEO growth?', 'Yes. We can plan and publish SEO blogs around buyer questions, local keywords, service topics and industry searches. Blog content helps Google understand your expertise and gives customers useful answers before they contact you.']
];

const serviceDetails = [
  {
    title: 'SEO Services in Butwal and Nepal',
    intro: 'Rank for searches that bring real buyers, not just traffic. We focus on service keywords, city keywords, technical health, content quality and measurable leads.',
    items: ['Technical SEO audit and Core Web Vitals fixes', 'Keyword research for Butwal, Bhairahawa, Kathmandu and Nepal searches', 'Service pages, city landing pages and internal linking', 'Google Business Profile optimization and local citation guidance', 'Blog topics, meta titles, descriptions and schema markup']
  },
  {
    title: 'Website Design and Web Development',
    intro: 'A good website should load fast, explain your offer quickly and make it easy for customers to call, WhatsApp or submit a form.',
    items: ['Business websites and landing pages', 'SEO-ready page structure and clean URLs', 'Blog/CMS systems for regular content publishing', 'Responsive design for mobile users in Nepal', 'Analytics, conversion tracking and form setup']
  },
  {
    title: 'Social Media Marketing and Content',
    intro: 'We help brands look active, credible and consistent on the platforms Nepali customers actually use every day.',
    items: ['Facebook and Instagram content calendars', 'Post design, captions and campaign ideas', 'Community management and reply support', 'Monthly analytics and improvement reports', 'Brand messaging for local audiences']
  },
  {
    title: 'Google Ads, Meta Ads and Lead Generation',
    intro: 'Paid campaigns work best when ads, landing pages, tracking and follow-up are connected.',
    items: ['Google Search Ads for high-intent keywords', 'Facebook and Instagram lead campaigns', 'Audience research and Nepal-wide targeting', 'Remarketing and funnel planning', 'Conversion tracking and monthly reporting']
  },
  {
    title: 'IT Support, Hosting and Software Solutions',
    intro: 'Kritech also supports the technical layer behind your growth: hosting, email, maintenance, backups and custom tools.',
    items: ['Domain, hosting and business email setup', 'Website maintenance, backups and security checks', 'Admin dashboards and CRM workflows', 'Custom software for operations and reporting', 'Ongoing support for growing teams']
  }
];

const industryContent = [
  ['Education and training institutes', 'SEO pages, admission campaigns, lead forms, WhatsApp flows and social proof for schools, colleges and consultancies.'],
  ['Healthcare and clinics', 'Local SEO, appointment pages, service content, trust-building design and Google Business Profile support.'],
  ['Retail, fashion and ecommerce', 'Product-focused landing pages, Meta campaigns, catalog strategy, conversion tracking and customer retargeting.'],
  ['Hotels, restaurants and hospitality', 'Local search visibility, review strategy, menu/service pages, booking flows and seasonal campaigns.'],
  ['Real estate and construction', 'Lead-generation pages, project landing pages, Google Ads, Facebook campaigns and inquiry tracking.'],
  ['Professional services', 'Authority content, service pages, case-study structure, local SEO and conversion-focused contact funnels.']
];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
};

function loadState(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function loadSeoState() {
  try {
    if (localStorage.getItem('kritech.seoVersion') !== SEO_VERSION) {
      localStorage.setItem('kritech.seoVersion', SEO_VERSION);
      return defaultSeo;
    }
    const saved = localStorage.getItem('kritech.seo');
    return saved ? { ...defaultSeo, ...JSON.parse(saved) } : defaultSeo;
  } catch {
    return defaultSeo;
  }
}

function loadPostsState() {
  const saved = loadState('kritech.posts', defaultPosts);
  const savedSlugs = new Set(saved.map((post) => post.slug));
  const missingDefaults = defaultPosts.filter((post) => !savedSlugs.has(post.slug));
  return [...missingDefaults, ...saved];
}

function loadAdminSession() {
  return loadState('kritech.adminSession', null);
}

async function apiRequest(path, options = {}) {
  const token = loadAdminSession()?.token;
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || `API request failed: ${response.status}`);
  }

  return response.json();
}

async function uploadBlogImage(file) {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose an image file.');
  }

  if (file.size > 6 * 1024 * 1024) {
    throw new Error('Please upload an image smaller than 6 MB.');
  }

  const signature = await apiRequest('/api/cloudinary/signature', { method: 'POST' });
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', signature.apiKey);
  formData.append('timestamp', signature.timestamp);
  formData.append('signature', signature.signature);
  formData.append('folder', signature.folder);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`, {
    method: 'POST',
    body: formData
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error?.message || 'Cloudinary upload failed.');
  }

  return {
    url: body.secure_url,
    publicId: body.public_id
  };
}

function App() {
  const [route, setRoute] = useState(currentRoute);
  const [posts, setPosts] = useState(loadPostsState);
  const [seo, setSeo] = useState(loadSeoState);
  const [adminSession, setAdminSession] = useState(loadAdminSession);
  const [menuOpen, setMenuOpen] = useState(false);
  const [apiState, setApiState] = useState({
    checked: false,
    connected: false,
    message: 'Checking MongoDB'
  });

  useMouseGlow();

  useEffect(() => {
    const onHash = () => setRoute(currentRoute());
    window.addEventListener('hashchange', onHash);
    window.addEventListener('popstate', onHash);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('popstate', onHash);
    };
  }, []);

  useEffect(() => localStorage.setItem('kritech.posts', JSON.stringify(posts)), [posts]);
  useEffect(() => localStorage.setItem('kritech.seo', JSON.stringify(seo)), [seo]);
  useEffect(() => {
    if (adminSession) {
      localStorage.setItem('kritech.adminSession', JSON.stringify(adminSession));
    } else {
      localStorage.removeItem('kritech.adminSession');
    }
  }, [adminSession]);

  useEffect(() => {
    let alive = true;

    apiRequest('/api/content')
      .then((data) => {
        if (!alive) return;
        if (Array.isArray(data.posts) && data.posts.length) {
          setPosts(data.posts);
        }
        if (data.seo && typeof data.seo === 'object') {
          setSeo({ ...defaultSeo, ...data.seo });
        }
        setApiState({ checked: true, connected: true, message: 'MongoDB connected' });
      })
      .catch(() => {
        if (!alive) return;
        setApiState({ checked: true, connected: false, message: 'Local preview storage' });
      });

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!apiState.connected || !adminSession) return undefined;

    const timeout = window.setTimeout(() => {
      apiRequest('/api/content', {
        method: 'PUT',
        body: JSON.stringify({ posts, seo })
      })
        .then(() => setApiState((state) => ({ ...state, message: 'MongoDB synced' })))
        .catch(() => setApiState({ checked: true, connected: false, message: 'MongoDB sync failed' }));
    }, 700);

    return () => window.clearTimeout(timeout);
  }, [posts, seo, apiState.connected, adminSession]);

  useEffect(() => {
    const meta = getRouteMeta(route, seo, posts);
    const canonicalUrl = `${SITE_URL}${route === '/' ? '' : route}`;
    document.title = meta.title;
    setMeta('description', meta.description);
    setMeta('robots', route.startsWith('/admin-login') ? 'noindex, nofollow' : 'index, follow');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', meta.title);
    setMeta('twitter:description', meta.description);
    setPropertyMeta('og:title', meta.title);
    setPropertyMeta('og:description', meta.description);
    setPropertyMeta('og:url', canonicalUrl);
    setCanonical(canonicalUrl);
  }, [route, seo, posts]);

  const go = (path) => {
    window.history.pushState({}, '', path);
    setRoute(path);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (route.startsWith('/admin-login')) {
    if (!adminSession) {
      return <AdminLogin setAdminSession={setAdminSession} go={go} />;
    }
    return <Admin posts={posts} setPosts={setPosts} seo={seo} setSeo={setSeo} go={go} apiState={apiState} adminSession={adminSession} setAdminSession={setAdminSession} />;
  }

  return (
    <>
      <Header go={go} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        {route === '/' && <Home go={go} posts={posts} />}
        {route === '/services' && <ServicesPage go={go} />}
        {route === '/about' && <AboutPage go={go} />}
        {localLandingPages[route] && <LocalLandingPage page={localLandingPages[route]} go={go} />}
        {route === '/pricing' && <PricingPage go={go} />}
        {route === '/blog' && <BlogPage posts={posts} go={go} />}
        {route.startsWith('/blog/') && <BlogDetail posts={posts} route={route} go={go} />}
        {route === '/contact' && <ContactPage go={go} />}
      </main>
      <Footer go={go} />
      <FloatingContact />
    </>
  );
}

function useMouseGlow() {
  useEffect(() => {
    const move = (event) => {
      document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
      document.documentElement.style.setProperty('--my', `${event.clientY}px`);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);
}

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

function setPropertyMeta(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.content = content;
}

function getRouteMeta(route, seo, posts) {
  if (route.startsWith('/blog/')) {
    const slug = route.replace('/blog/', '');
    const post = posts.find((item) => item.slug === slug);
    if (post) {
      return {
        title: post.metaTitle || post.seoTitle || `${post.title} | Kritech Solution`,
        description: post.metaDescription || post.seoDescription || post.excerpt || seo.blog.description
      };
    }
    return seo.blog;
  }

  return Object.values(seo).find((item) => item.path === route) || seo.home;
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

function Header({ go, menuOpen, setMenuOpen }) {
  const nav = [['Services', '/services'], ['About', '/about'], ['Pricing', '/pricing'], ['Blog', '/blog'], ['Contact', '/contact']];
  return (
    <header className="site-header">
      <button className="brand" onClick={() => go('/')} aria-label="Go to homepage">
        <img src="/kritech-logo.webp" alt="Kritech Solution logo" />
      </button>
      <nav className={menuOpen ? 'open' : ''}>
        {nav.map(([label, path]) => (
          <button key={path} onClick={() => go(path)}>{label}</button>
        ))}
      </nav>
      <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function Home({ go, posts }) {
  return (
    <div className="neo-page">
      <NeoHero go={go} />
      <NeoSignalStrip />
      <HomeServiceSnapshot go={go} />
      <HomeRankingEngine go={go} />
      <NeoModules go={go} />
      <LocalSeoMap go={go} />
      <HomeTrustSection go={go} />
      <Process />
      <IndustrySection />
      <PricingPreview go={go} />
      <NeoBlog posts={posts} go={go} />
      <FAQSection compact />
      <NeoCTA go={go} />
    </div>
  );
}

function NeoHero({ go }) {
  return (
    <section className="neo-hero">
      <NeuralScene />
      <div className="neo-noise" />
      <motion.div className="neo-hero-inner" variants={stagger} initial="hidden" animate="show">
        <motion.div className="neo-copy" variants={fadeUp}>
          <span className="neo-pill"><Sparkles size={15} /> Digital marketing agency in Butwal, Nepal</span>
          <h1>SEO, web development and IT systems built to rank in Nepal.</h1>
          <p>
            Kritech Solution helps businesses in Butwal, Bhairahawa, Kathmandu, Pokhara and across Nepal rank higher on Google, generate leads and manage a stronger digital presence.
          </p>
          <div className="neo-actions">
            <button className="neo-primary" onClick={() => go('/contact')}>Plan my system <ArrowRight size={18} /></button>
            <button className="neo-secondary" onClick={() => go('/services')}>Explore services <ChevronRight size={18} /></button>
          </div>
        </motion.div>
        <motion.div className="neo-command" variants={fadeUp} whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}>
          <div className="neo-window-top"><span /><span /><span /><b>growth-console.ts</b></div>
          <div className="neo-terminal-lines">
            <code><em>01</em> research.keywords("Butwal + Nepal")</code>
            <code><em>02</em> build.localPages({`{ seo: true, speed: "fast" }`})</code>
            <code><em>03</em> publish.blogs().submitSitemap()</code>
            <code><em>04</em> track.calls().optimize.rankings()</code>
          </div>
          <div className="neo-metrics">
            <span><strong>98</strong> performance</span>
            <span><strong>Butwal</strong> local SEO focus</span>
            <span><strong>24/7</strong> uptime focus</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function NeuralScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const count = 160;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 2.6 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const particles = new THREE.BufferGeometry();
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(
      particles,
      new THREE.PointsMaterial({ color: 0x7dffbd, size: 0.045, transparent: true, opacity: 0.9 })
    );
    group.add(points);

    const linePositions = [];
    for (let i = 0; i < count - 1; i += 2) {
      linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      linePositions.push(positions[(i + 1) * 3], positions[(i + 1) * 3 + 1], positions[(i + 1) * 3 + 2]);
    }
    const lines = new THREE.BufferGeometry();
    lines.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    group.add(new THREE.LineSegments(lines, new THREE.LineBasicMaterial({ color: 0x0bcf73, transparent: true, opacity: 0.16 })));

    let frameId;
    const animate = () => {
      group.rotation.y += 0.0025;
      group.rotation.x = Math.sin(Date.now() * 0.00035) * 0.16;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const resize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      mount.removeChild(renderer.domElement);
      particles.dispose();
      lines.dispose();
      renderer.dispose();
    };
  }, []);

  return <div className="neural-scene" ref={mountRef} aria-hidden="true" />;
}

function NeoSignalStrip() {
  const signals = ['SEO services in Butwal', 'Digital marketing agency Nepal', 'Web development Butwal', 'IT company in Butwal', 'Sitemap automation', 'Lead tracking', 'Google ranking Nepal', 'Social media marketing'];
  return (
    <div className="neo-strip">
      <div>{[...signals, ...signals].map((signal, index) => <span key={`${signal}-${index}`}>{signal}</span>)}</div>
    </div>
  );
}

function HomeServiceSnapshot({ go }) {
  return (
    <section className="home-snapshot">
      <div className="snapshot-copy">
        <span>SEO-first digital partner</span>
        <h2>One team for ranking, website, campaigns and technical support.</h2>
        <p>
          Kritech Solution helps Nepali businesses replace scattered online activity with a complete digital growth system: fast website, local SEO, helpful content, paid campaigns, lead tracking and reliable IT support.
        </p>
        <button className="neo-primary" onClick={() => go('/services')}>Explore services <ArrowRight size={18} /></button>
      </div>
      <div className="snapshot-grid">
        {services.slice(0, 4).map(({ icon: Icon, title, text }) => (
          <article key={title}>
            <Icon size={23} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HomeTrustSection({ go }) {
  return (
    <section className="home-trust">
      <div>
        <span>Based in Butwal, built for Nepal</span>
        <h2>Quality digital marketing and IT services within reach of every Nepali business.</h2>
        <p>
          Whether you run a local shop in Butwal or a growing startup in Kathmandu, Kritech builds online systems that look professional, explain your value clearly and help customers find you on Google.
        </p>
      </div>
      <div className="trust-actions">
        <button onClick={() => go('/about')}>Read about us <ChevronRight size={17} /></button>
        <button onClick={() => go('/contact')}>Request consultation <ChevronRight size={17} /></button>
      </div>
    </section>
  );
}

function HomeRankingEngine({ go }) {
  return (
    <section className="home-ranking-engine">
      <div className="ranking-copy">
        <span>Growth engine</span>
        <h2>Not just a good-looking website. A complete search and lead system.</h2>
        <p>
          For Kritech to rank in Butwal and Nepal, the homepage needs to explain the business clearly, connect to keyword-focused service pages, support topical authority with blogs, and guide visitors toward a call, WhatsApp message or consultation.
        </p>
        <div className="ranking-actions">
          <button onClick={() => go('/seo-services-butwal')}>SEO services Butwal <ChevronRight size={16} /></button>
          <button onClick={() => go('/web-development-butwal')}>Web development Butwal <ChevronRight size={16} /></button>
        </div>
      </div>
      <div className="ranking-console">
        {[
          ['01', 'Keyword map', 'SEO, web development, digital marketing and IT company searches.'],
          ['02', 'Page structure', 'Homepage, service pages, local landing pages, blog and contact flows.'],
          ['03', 'Content depth', 'Helpful static copy, FAQs, blogs, schema and internal links.'],
          ['04', 'Conversion tracking', 'Calls, WhatsApp clicks, forms, Search Console and campaign reports.']
        ].map(([number, title, text]) => (
          <article key={title}>
            <strong>{number}</strong>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function NeoModules({ go }) {
  const modules = [
    [Search, 'SEO Services in Butwal', 'Technical SEO, local pages, schema, content planning and Search Console setup for Butwal and Nepal keywords.'],
    [Code2, 'Web Development Company', 'Fast, responsive websites for businesses in Butwal with motion, conversion flows and SEO-ready service pages.'],
    [ServerCog, 'IT Company in Butwal', 'Hosting, email, backups, maintenance, security and uptime-focused support for local businesses.'],
    [Megaphone, 'Digital Marketing Nepal', 'Google Ads, Meta campaigns, social media marketing and reporting connected to landing pages.']
  ];
  return (
    <motion.section className="neo-section neo-modules" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <motion.div className="neo-section-head" variants={fadeUp}>
        <span>01 / capabilities</span>
        <h2>Keyword-focused services for Butwal and Nepal search demand.</h2>
        <p>Each page is written around real buyer intent: SEO services, web development, digital marketing, IT support, software solutions and local Google ranking.</p>
      </motion.div>
      <div className="neo-module-grid">
        {modules.map(([Icon, title, text], index) => (
          <motion.article className={`neo-module-card card-${index + 1}`} key={title} variants={fadeUp} whileHover={{ y: -12, scale: 1.02 }}>
            <Icon />
            <b>{String(index + 1).padStart(2, '0')}</b>
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </div>
      <button className="neo-text-button" onClick={() => go('/services')}>Explore service architecture <ChevronRight size={17} /></button>
    </motion.section>
  );
}

function LocalSeoMap({ go }) {
  const routes = [
    ['/digital-marketing-agency-butwal', 'Digital Marketing Agency in Butwal'],
    ['/seo-services-butwal', 'SEO Services in Butwal'],
    ['/website-development-company-butwal', 'Website Development Company in Butwal'],
    ['/it-company-butwal', 'IT Company in Butwal'],
    ['/digital-marketing-agency-nepal', 'Digital Marketing Agency in Nepal'],
    ['/seo-company-nepal', 'SEO Company in Nepal'],
    ['/web-development-company-nepal', 'Web Development Company in Nepal'],
    ['/remote-digital-marketing-agency', 'Remote Marketing Agency'],
    ['/digital-marketing-agency-uae', 'Digital Marketing Agency UAE'],
    ['/seo-company-dubai', 'SEO Company Dubai'],
    ['/digital-marketing-agency-usa', 'Digital Marketing Agency USA'],
    ['/seo-company-new-york', 'SEO Company New York'],
    ['/services-bhairahawa', 'Services in Bhairahawa'],
    ['/services-tilottama', 'Services in Tilottama']
  ];
  return (
    <section className="local-seo-map">
      <div className="local-copy">
        <span>SEO services for Nepal, UAE and USA</span>
        <h2>Help local and international customers find your business when they search on Google.</h2>
        <p>
          Kritech builds the SEO foundation your website needs: local pages, international service pages, technical fixes, content planning, schema, sitemap and Search Console tracking. The keyword clusters below become service pages, blogs and internal links that support real ranking growth.
        </p>
      </div>
      <div className="keyword-clusters">
        {keywordClusters.map(([group, keywords]) => (
          <article key={group}>
            <h3>{group}</h3>
            {keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
          </article>
        ))}
      </div>
      <div className="local-routes">
        {routes.map(([path, label]) => (
          <button key={path} onClick={() => go(path)}>{label} <ChevronRight size={16} /></button>
        ))}
      </div>
    </section>
  );
}

function NeoStudio() {
  return (
    <section className="neo-studio">
      <div className="neo-studio-copy">
        <span>02 / creative technology</span>
        <h2>Motion, content and code working as one brand experience.</h2>
        <p>
          A modern IT company should feel alive: responsive interactions, clear information design, sharp SEO structure, and a brand system customers remember.
        </p>
        <div className="origin-story">
          <strong>Why we started Kritech Solution</strong>
          <p>
            We started Kritech Solution with one goal in mind: to bring quality digital marketing and IT services within reach of every Nepali business. Whether you run a local shop in Butwal or a growing startup in Kathmandu, we’re here to help you compete and grow.
          </p>
        </div>
      </div>
      <div className="neo-lab-board">
        <motion.div className="lab-card lab-large" whileHover={{ rotate: -1, y: -8 }}>
          <span>Brand UI</span>
          <strong>premium web presence</strong>
          <i />
        </motion.div>
        <motion.div className="lab-card" whileHover={{ rotate: 2, y: -8 }}>
          <span>SEO</span>
          <strong>indexable content system</strong>
        </motion.div>
        <motion.div className="lab-card" whileHover={{ rotate: -2, y: -8 }}>
          <span>Automation</span>
          <strong>less manual work</strong>
        </motion.div>
        <motion.div className="lab-card lab-wide" whileHover={{ scale: 1.02 }}>
          <span>Analytics</span>
          <strong>decisions from real data</strong>
          <div className="lab-bars"><b /><b /><b /><b /><b /></div>
        </motion.div>
      </div>
    </section>
  );
}

function NeoSeoConsole() {
  return (
    <section className="neo-section neo-console-section">
      <div className="neo-section-head">
        <span>03 / SEO control room</span>
        <h2>Admin dashboard for blogs, metadata and sitemap creation.</h2>
        <p>Publish keyword-focused blogs for Butwal and Nepal, edit meta titles and descriptions, and generate sitemap XML for Google Search Console.</p>
      </div>
      <div className="neo-console">
        <div className="console-sidebar">
          <span className="active">Blog editor</span>
          <span>Meta titles</span>
          <span>Sitemap XML</span>
          <span>Search Console</span>
        </div>
        <div className="console-main">
          <div className="console-toolbar"><b>kritech-admin</b><i>autosaved</i></div>
          <div className="console-fields">
            <span>Title: SEO Services in Butwal, Nepal</span>
            <span>Meta: Rank in Butwal, Bhairahawa, Kathmandu and beyond</span>
            <span>Slug: /blog/local-seo-nepal-business-leads</span>
          </div>
          <div className="console-wave"><i /><i /><i /><i /><i /><i /></div>
        </div>
      </div>
    </section>
  );
}

function NeoLaunchFlow() {
  const flow = ['Audit', 'Prototype', 'Build', 'Publish', 'Rank', 'Optimize'];
  return (
    <section className="neo-flow">
      {flow.map((item, index) => (
        <motion.article key={item} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{item}</strong>
        </motion.article>
      ))}
    </section>
  );
}

function NeoBlog({ posts, go }) {
  const published = posts.filter((post) => post.status === 'Published').slice(0, 3);
  return (
    <section className="neo-section neo-blog">
      <div className="neo-section-head">
        <span>04 / authority content</span>
        <h2>Authority content for SEO, digital marketing and web development searches.</h2>
      </div>
      <PostGrid posts={published} go={go} />
    </section>
  );
}

function NeoCTA({ go }) {
  return (
    <section className="neo-final-cta">
      <span>Ready for the next version of Kritech?</span>
      <h2>Let’s make Kritech the company people find when they search in Nepal, UAE and USA.</h2>
      <button className="neo-primary" onClick={() => go('/contact')}>Start consultation <Send size={18} /></button>
    </section>
  );
}

function LocalLandingPage({ page, go }) {
  const process = [
    ['01', 'Research buyer intent', `Map service, city and buyer questions for ${page.processAreas || 'Butwal, Bhairahawa, Tilottama and Nepal searches'}.`],
    ['02', 'Build crawlable pages', 'Use clean URLs, strong headings, internal links, schema-friendly content and clear conversion paths.'],
    ['03', 'Publish helpful content', 'Support service pages with FAQs, blogs, case-style proof and answers customers actually search for.'],
    ['04', 'Measure and improve', 'Track Search Console, rankings, calls, WhatsApp clicks and form leads, then improve what is working.']
  ];

  return (
    <PageShell eyebrow={page.eyebrow} title={page.title} text={page.text}>
      <section className="section local-landing">
        <div className="landing-checklist">
          {page.bullets.map((item) => <span key={item}><Check size={17} /> {item}</span>)}
        </div>
        <div className="landing-content">
          <h2>Why this matters for search visibility</h2>
          <p>
            {page.marketIntro || `Google needs clear service pages, location relevance, helpful content, consistent business details, fast performance and structured data. This page gives Kritech a focused target for people searching for ${page.eyebrow.toLowerCase()} and related services.`}
          </p>
          <p>
            {page.areaLine || 'Kritech Solution serves Butwal, Bhairahawa, Tilottama, Kathmandu, Pokhara and businesses across Nepal with SEO, digital marketing, web development, software and IT support.'}
          </p>
          <button className="primary" onClick={() => go('/contact')}>Request SEO consultation <ArrowRight size={18} /></button>
        </div>
      </section>
      <section className="section local-proof-section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Ranking signals</span>
            <h2>What this page strengthens for search visibility.</h2>
          </div>
          <p>Dedicated local pages help Google understand service relevance, location coverage, topical depth and the next action visitors should take.</p>
        </div>
        <div className="local-proof-grid">
          {(page.highlights || []).map((item, index) => (
            <motion.article key={item} whileHover={{ y: -8, rotate: index % 2 ? 1 : -1 }}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item}</h3>
              <p>{['Keyword targeting, headings and internal links aligned to local buyer intent.', 'Clear offer copy, trust signals and mobile-first lead capture for Nepal customers.', 'Search Console-ready structure that can be measured and improved after launch.'][index] || 'A practical SEO asset connected to the rest of the Kritech website.'}</p>
            </motion.article>
          ))}
        </div>
      </section>
      <section className="section local-process-panel">
        <div>
          <span className="eyebrow">Execution plan</span>
          <h2>A local SEO page is only useful when it connects to the full growth system.</h2>
          <p>
            Kritech combines page content, technical SEO, blog publishing, remote delivery systems, ads, analytics and conversion tracking so the site can compete for important searches over time.
          </p>
          <button className="secondary-light" onClick={() => go('/services')}>See all services <ChevronRight size={17} /></button>
        </div>
        <div className="process-rail">
          {process.map(([number, title, text]) => (
            <article key={title}>
              <strong>{number}</strong>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      {page.faqs?.length > 0 && (
        <section className="section faq-section local-page-faq">
          <div className="section-head">
            <div>
              <span className="eyebrow">Local FAQ</span>
              <h2>Helpful answers for customers and Google.</h2>
            </div>
          </div>
          <div className="faq-grid">
            {page.faqs.map(([question, answer]) => (
              <article key={question}>
                <h3>{question}</h3>
                <p>{answer}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      <CTA go={go} />
    </PageShell>
  );
}

function LogoStrip() {
  return (
    <section className="logo-strip">
      {['Search-first strategy', 'Animated web design', 'Paid growth', 'Admin dashboards', 'Automation', 'IT support'].map((item) => <span key={item}>{item}</span>)}
    </section>
  );
}

function GrowthMarquee() {
  const items = ['SEO audits', 'Landing pages', 'Google Ads', 'Meta campaigns', 'Blog systems', 'Local SEO', 'Hosting', 'CRM automations'];
  return (
    <section className="growth-marquee" aria-label="Kritech capabilities">
      <div>
        {[...items, ...items].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
      </div>
    </section>
  );
}

function ServicesPreview({ go }) {
  return (
    <motion.section className="section services-lab" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
      <div className="section-head">
        <motion.div variants={fadeUp}>
          <span className="eyebrow">Capabilities</span>
          <h2>Everything your digital presence needs to look premium and rank.</h2>
        </motion.div>
        <p>Built as a connected system: brand impression, website performance, search visibility, ad funnels, and technical stability.</p>
      </div>
      <div className="service-grid">
        {services.map(({ icon: Icon, title, text }, index) => (
          <motion.article className={`service-card ${index === 0 ? 'wide' : ''}`} key={title} variants={fadeUp} whileHover={{ y: -10, scale: 1.018 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
            <Icon />
            <span className="card-number">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <i className="card-scan" />
          </motion.article>
        ))}
      </div>
      <button className="text-link" onClick={() => go('/services')}>See all services <ChevronRight size={17} /></button>
    </motion.section>
  );
}

function WorkShowcase() {
  const work = [
    ['Local SEO Engine', 'City pages, technical fixes, Google Business Profile, review strategy, and monthly ranking reports.', '+132% organic calls'],
    ['Conversion Website', 'Premium interface, fast pages, persuasive sections, WhatsApp/contact flows, analytics, and schema.', '3.4x inquiry rate'],
    ['Campaign Command Center', 'Meta and Google campaign structure with landing pages, tracking, budget control, and reporting.', '-28% cost per lead']
  ];
  return (
    <motion.section className="section work-showcase" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.16 }}>
      <div className="section-head">
        <motion.div variants={fadeUp}>
          <span className="eyebrow">Signature builds</span>
          <h2>Technical builds with measurable business outcomes.</h2>
        </motion.div>
      </div>
      <div className="showcase-grid">
        {work.map(([title, text, metric], index) => (
          <motion.article className="showcase-card" key={title} variants={fadeUp} whileHover={{ y: -8, rotateX: 1.5 }}>
            <div className="mock-browser">
              <span />
              <span />
              <span />
              <i className={`mock-chart chart-${index}`} />
            </div>
            <div>
              <strong>{metric}</strong>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

function Process() {
  return (
    <section className="section dark-band">
      <div className="section-head">
        <span className="eyebrow">How it works</span>
        <h2>A clean growth engine, not random posting and hoping.</h2>
      </div>
      <div className="timeline">
        {[
          ['Discover', 'Audit your website, market, competitors, analytics, and customer journey.'],
          ['Build', 'Create the website, SEO structure, content plan, campaigns, and tracking setup.'],
          ['Launch', 'Publish, index, test forms, connect analytics, and submit sitemap to Search Console.'],
          ['Optimize', 'Review rankings, traffic, leads, and conversion data every month.']
        ].map(([title, text], index) => (
          <article key={title}>
            <strong>{String(index + 1).padStart(2, '0')}</strong>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CaseStudy() {
  return (
    <section className="section case-study">
      <div>
        <span className="eyebrow">SEO-ready by design</span>
        <h2>Built for Google Search Console from day one.</h2>
        <p>
          The new site includes clean page metadata, structured service content, blog publishing, admin-editable SEO fields, and sitemap export so every new page can be submitted and tracked.
        </p>
      </div>
      <div className="seo-stack">
        {[
          [Globe2, 'Canonical URLs'],
          [Gauge, 'Fast front-end'],
          [PenLine, 'Blog publishing'],
          [ShieldCheck, 'Meta controls']
        ].map(([Icon, label]) => (
          <span key={label}><Icon size={19} /> {label}</span>
        ))}
      </div>
    </section>
  );
}

function TechStack() {
  const modules = [
    [Search, 'Search Layer', 'SEO audits, schema, keyword maps'],
    [Code2, 'Build Layer', 'React, CMS, landing pages'],
    [Gauge, 'Speed Layer', 'Core Web Vitals, hosting, caching'],
    [Target, 'Growth Layer', 'Ads, funnels, lead tracking'],
    [ShieldCheck, 'Trust Layer', 'Security, backups, maintenance'],
    [Globe2, 'Index Layer', 'Sitemap, Search Console, analytics']
  ];
  const terminal = [
    'scan: market + competitors',
    'build: landing system + cms',
    'deploy: seo schema + sitemap',
    'optimize: traffic -> leads -> revenue'
  ];
  return (
    <motion.section className="creative-system" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <div className="system-copy">
        <motion.span className="eyebrow" variants={fadeUp}>Execution stack</motion.span>
        <motion.h2 variants={fadeUp}>Marketing creativity with technical discipline behind it.</motion.h2>
        <motion.p variants={fadeUp}>
          Think of Kritech as a digital operating system: design, ranking, campaigns, analytics, security, and content all connected instead of scattered across random tools.
        </motion.p>
        <motion.div className="terminal-card" variants={fadeUp}>
          <div className="terminal-top"><span /><span /><span /></div>
          {terminal.map((line, index) => (
            <code key={line}><b>{String(index + 1).padStart(2, '0')}</b> {line}</code>
          ))}
        </motion.div>
      </div>
      <motion.div className="system-visual" variants={fadeUp}>
        <div className="system-grid-bg" />
        <motion.div className="system-core" animate={{ scale: [1, 1.035, 1], boxShadow: ['0 0 34px rgba(34,225,132,.22)', '0 0 70px rgba(34,225,132,.42)', '0 0 34px rgba(34,225,132,.22)'] }} transition={{ duration: 3.2, repeat: Infinity }}>
          <span>Kritech OS</span>
          <strong>LIVE</strong>
        </motion.div>
        {modules.map(([Icon, title, text], index) => (
          <motion.article
            className={`system-node node-${index + 1}`}
            key={title}
            whileHover={{ scale: 1.06, y: -6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <Icon size={21} />
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
        <span className="system-beam beam-one" />
        <span className="system-beam beam-two" />
        <span className="system-beam beam-three" />
      </motion.div>
    </motion.section>
  );
}

function PricingPreview({ go }) {
  return (
    <section className="section">
      <div className="section-head">
        <span className="eyebrow">Packages</span>
        <h2>Start focused, then scale what works.</h2>
      </div>
      <PackageGrid />
      <button className="text-link" onClick={() => go('/pricing')}>View pricing details <ChevronRight size={17} /></button>
    </section>
  );
}

function PackageGrid() {
  return (
    <div className="package-grid">
      {packages.map(([name, desc, price, cadence, items], index) => (
        <article className={`package-card ${index === 1 ? 'featured' : ''}`} key={name}>
          <span>{name}</span>
          <h3>{price}</h3>
          <em>{cadence}</em>
          <p>{desc}</p>
          <b>What's included?</b>
          {items.map((item) => <small key={item}><Check size={15} /> {item}</small>)}
          <button className="primary small">Get Started <ArrowRight size={16} /></button>
        </article>
      ))}
    </div>
  );
}

function BlogPreview({ posts, go }) {
  const published = posts.filter((post) => post.status === 'Published').slice(0, 3);
  return (
    <section className="section">
      <div className="section-head">
        <span className="eyebrow">Latest insights</span>
        <h2>Content that can actually support ranking.</h2>
      </div>
      <PostGrid posts={published} go={go} />
    </section>
  );
}

function CTA({ go }) {
  return (
    <section className="cta">
      <span className="eyebrow">Ready to grow?</span>
      <h2>Let’s turn your website into a ranking and lead-generation asset.</h2>
      <button className="primary" onClick={() => go('/contact')}>Book Consultation <Send size={18} /></button>
    </section>
  );
}

function AboutPage({ go }) {
  return (
    <PageShell
      eyebrow="About Kritech Solution"
      title="A Butwal-based digital marketing and IT company built for serious growth."
      text="We started Kritech Solution to make quality SEO, web development, digital marketing and IT services reachable for Nepali businesses that want to compete online."
    >
      <section className="section about-story">
        <div>
          <span className="eyebrow">Our story</span>
          <h2>We help local businesses look credible, get found and turn attention into inquiries.</h2>
        </div>
        <div className="story-copy">
          <p>
            We started Kritech Solution with one goal in mind: to bring quality digital marketing and IT services within reach of every Nepali business. Whether you run a local shop in Butwal or a growing startup in Kathmandu, we are here to help you compete and grow.
          </p>
          <p>
            Many businesses in Nepal post on social media but do not have a clear website, SEO structure, tracking system or follow-up process. We solve that gap by combining content, design, development, campaigns and technical support into one practical growth system.
          </p>
        </div>
      </section>
      <section className="section value-grid-section">
        <div className="section-head">
          <span className="eyebrow">What we believe</span>
          <h2>Good digital work should be clear, measurable and useful.</h2>
        </div>
        <div className="value-grid">
          {[
            ['Search before design', 'We research how customers search before deciding page structure, headings and content.'],
            ['Speed builds trust', 'Fast pages, clean layouts and mobile-first flows help users act with confidence.'],
            ['Content should answer real questions', 'Blogs and service pages should solve buyer confusion, not just fill space.'],
            ['Reports must guide decisions', 'Traffic, rankings, calls, WhatsApp clicks and form leads should shape the next move.']
          ].map(([title, text]) => (
            <article key={title}>
              <Sparkles size={21} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <LocalCoverage go={go} />
      <FAQSection />
      <CTA go={go} />
    </PageShell>
  );
}

function ServicesPage({ go }) {
  return (
    <PageShell eyebrow="Services" title="Digital marketing, websites, software, and IT support for Nepal." text="Choose one focused service or build a full growth system with Kritech as your digital partner.">
      <ServicesPreview go={go} />
      <ServiceDeepDive />
      <IndustrySection />
      <LocalCoverage go={go} />
      <Process />
      <FAQSection />
      <CTA go={go} />
    </PageShell>
  );
}

function ServiceDeepDive() {
  return (
    <section className="section service-deep-dive">
      <div className="section-head">
        <div>
          <span className="eyebrow">Service details</span>
          <h2>Static SEO content for the services customers search for most.</h2>
        </div>
        <p>Each section targets useful buyer intent for Butwal and Nepal without making the page feel like keyword stuffing.</p>
      </div>
      <div className="deep-dive-list">
        {serviceDetails.map((service, index) => (
          <article key={service.title}>
            <div>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{service.title}</h3>
              <p>{service.intro}</p>
            </div>
            <ul>
              {service.items.map((item) => <li key={item}><Check size={16} /> {item}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function IndustrySection() {
  return (
    <section className="section industry-section">
      <div className="section-head">
        <div>
          <span className="eyebrow">Industries</span>
          <h2>Growth systems for businesses that need calls, leads, visits and trust.</h2>
        </div>
      </div>
      <div className="industry-grid">
        {industryContent.map(([title, text]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function LocalCoverage({ go }) {
  return (
    <section className="section local-coverage">
      <div>
        <span className="eyebrow">Search coverage</span>
        <h2>Focused in Nepal, ready for remote clients in UAE and USA.</h2>
        <p>
          Kritech Solution supports businesses in Butwal, Bhairahawa, Tilottama, Kathmandu, Pokhara, Chitwan and across Nepal, while positioning remote delivery pages for UAE and USA clients. Our SEO work connects city pages, service pages, schema, reviews, blogs and Search Console measurement.
        </p>
      </div>
      <div className="coverage-links">
        {[
          ['/digital-marketing-agency-butwal', 'Digital Marketing Agency Butwal'],
          ['/seo-services-butwal', 'SEO Services in Butwal'],
          ['/website-development-company-butwal', 'Website Development Butwal'],
          ['/it-company-butwal', 'IT Company in Butwal'],
          ['/services-bhairahawa', 'Services in Bhairahawa'],
          ['/services-tilottama', 'Services in Tilottama'],
          ['/digital-marketing-agency-nepal', 'Digital Marketing Agency Nepal'],
          ['/seo-company-nepal', 'SEO Company Nepal'],
          ['/web-development-company-nepal', 'Web Development Company Nepal'],
          ['/remote-digital-marketing-agency', 'Remote Marketing Agency'],
          ['/digital-marketing-agency-uae', 'Digital Marketing Agency UAE'],
          ['/seo-company-dubai', 'SEO Company Dubai'],
          ['/digital-marketing-agency-usa', 'Digital Marketing Agency USA'],
          ['/seo-company-new-york', 'SEO Company New York']
        ].map(([path, label]) => (
          <button key={path} onClick={() => go(path)}>{label} <ChevronRight size={16} /></button>
        ))}
      </div>
    </section>
  );
}

function FAQSection({ compact = false }) {
  const visibleFaqs = compact ? faqs.slice(0, 4) : faqs;
  return (
    <section className={`section faq-section ${compact ? 'compact' : ''}`}>
      <div className="section-head">
        <div>
          <span className="eyebrow">FAQ</span>
          <h2>Questions businesses ask before starting SEO, websites or campaigns.</h2>
        </div>
      </div>
      <div className="faq-grid">
        {visibleFaqs.map(([question, answer]) => (
          <article key={question}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PricingPage({ go }) {
  return (
    <PageShell eyebrow="Pricing" title="Digital marketing packages for Nepali businesses." text="Choose a monthly marketing package for social media, Facebook Ads, Google Ads, content creation, lead generation and reporting.">
      <section className="section"><PackageGrid /></section>
      <FAQSection compact />
      <CTA go={go} />
    </PageShell>
  );
}

function BlogPage({ posts, go }) {
  const published = posts.filter((post) => post.status === 'Published');
  return (
    <PageShell eyebrow="Blog" title="SEO, web, and marketing advice for Nepali businesses." text="Publish helpful content consistently and give Google more reasons to understand your authority.">
      <section className="section"><PostGrid posts={published} go={go} /></section>
    </PageShell>
  );
}

function BlogDetail({ posts, route, go }) {
  const slug = route.replace('/blog/', '');
  const post = posts.find((item) => item.slug === slug);
  if (!post) return <PageShell eyebrow="Not found" title="This blog post is not available." text="It may still be a draft in the admin dashboard." />;
  return (
    <article className="article-page">
      {post.featuredImage && <img className="article-featured-image" src={post.featuredImage} alt={post.title} />}
      <span className="eyebrow">{post.category}</span>
      <h1>{post.title}</h1>
      <p className="article-meta">{post.author} · {post.date}</p>
      <p className="article-excerpt">{post.excerpt}</p>
      <ArticleBody content={post.content} />
      <button className="text-link" onClick={() => go('/blog')}>Back to blog <ChevronRight size={17} /></button>
    </article>
  );
}

function ArticleBody({ content = '' }) {
  const hasHtml = /<\/?[a-z][\s\S]*>/i.test(content);
  if (hasHtml) {
    return <div className="article-body imported-wordpress-content" dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return <div className="article-body">{content}</div>;
}

function ContactPage({ go }) {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    service: '',
    location: '',
    message: ''
  });
  const [submitState, setSubmitState] = useState({ busy: false, message: '', ok: false });

  const updateForm = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submitInquiry = async (event) => {
    event.preventDefault();
    setSubmitState({ busy: true, message: 'Sending your inquiry...', ok: false });

    try {
      await apiRequest('/api/inquiries', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          sourcePage: window.location.href
        })
      });
      setForm({ name: '', contact: '', service: '', location: '', message: '' });
      setSubmitState({ busy: false, message: 'Inquiry received. Kritech will contact you soon.', ok: true });
    } catch (error) {
      setSubmitState({ busy: false, message: error.message, ok: false });
    }
  };

  return (
    <PageShell eyebrow="Contact Kritech Solution" title="Tell us where you want your business to grow next." text="Send a message and Kritech will help you choose the clearest next step for SEO, web development, digital marketing, ads, software or IT support.">
      <section className="section contact-grid">
        <div className="contact-card">
          <h3>Get in touch</h3>
          <p><MapPin /> Butwal-11, Kalikanagar, Nepal</p>
          <p><Phone /> +977-9867756460</p>
          <p><Mail /> info@kritechsolution.com</p>
          <div className="contact-help">
            <strong>Best for</strong>
            <span>SEO services in Butwal</span>
            <span>Website design and development</span>
            <span>Social media and paid ads</span>
            <span>IT support and software solutions</span>
          </div>
        </div>
        <form className="contact-form" onSubmit={submitInquiry}>
          <input placeholder="Your name" value={form.name} onChange={(event) => updateForm('name', event.target.value)} required />
          <input placeholder="Phone or email" value={form.contact} onChange={(event) => updateForm('contact', event.target.value)} required />
          <select value={form.service} onChange={(event) => updateForm('service', event.target.value)}>
            <option value="" disabled>What do you need?</option>
            <option>SEO</option>
            <option>Website</option>
            <option>Social media marketing</option>
            <option>Google Ads or Facebook Ads</option>
            <option>Software or admin dashboard</option>
            <option>IT support</option>
          </select>
          <select value={form.location} onChange={(event) => updateForm('location', event.target.value)}>
            <option value="" disabled>Where is your business?</option>
            <option>Butwal</option>
            <option>Bhairahawa / Tilottama</option>
            <option>Kathmandu</option>
            <option>Pokhara</option>
            <option>UAE / Dubai</option>
            <option>USA</option>
            <option>Other city in Nepal</option>
          </select>
          <textarea placeholder="Tell us about your project" rows="5" value={form.message} onChange={(event) => updateForm('message', event.target.value)} required />
          <button className="primary" disabled={submitState.busy}>{submitState.busy ? 'Sending...' : 'Send Message'} <Send size={18} /></button>
          {submitState.message && <p className={submitState.ok ? 'form-message success' : 'form-message'}>{submitState.message}</p>}
        </form>
      </section>
      <section className="section contact-seo-copy">
        <div>
          <span className="eyebrow">Consultation topics</span>
          <h2>We can help you plan the right next move before you spend heavily.</h2>
        </div>
        <div className="contact-topic-grid">
          {[
            ['Google ranking plan', 'Audit your website, service pages, blog topics, local SEO gaps and Search Console setup.'],
            ['Website rebuild plan', 'Map the pages, sections, content, contact flows, admin dashboard and SEO fields your site needs.'],
            ['Campaign plan', 'Choose Meta Ads, Google Ads, landing pages, targeting and reporting based on your offer and budget.'],
            ['Technical support plan', 'Review hosting, email, backups, security, maintenance, database and admin workflow needs.']
          ].map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <FAQSection compact />
      <CTA go={go} />
    </PageShell>
  );
}

function PageShell({ eyebrow, title, text, children }) {
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </section>
      {children}
    </>
  );
}

function PostGrid({ posts, go }) {
  if (!posts.length) return <p className="empty">No published posts yet. Open the admin dashboard to publish your first article.</p>;
  return (
    <div className="post-grid">
      {posts.map((post) => (
        <article className="post-card" key={post.id}>
          {post.featuredImage && <img className="post-card-image" src={post.featuredImage} alt={post.title} />}
          <span>{post.category}</span>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <button className="text-link" onClick={() => go(`/blog/${post.slug}`)}>Read article <ChevronRight size={17} /></button>
        </article>
      ))}
    </div>
  );
}

function AdminLogin({ setAdminSession, go }) {
  const [email, setEmail] = useState('prajwolgautam56@gmail.com');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setMessage('Checking admin credentials...');

    try {
      const session = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      setAdminSession(session);
      setMessage('');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <img src="/kritech-logo.webp" alt="Kritech Solution" />
        <span className="eyebrow"><ShieldCheck size={15} /> Secure Admin</span>
        <h1>Login to Kritech CMS</h1>
        <p>Manage blogs, images, SEO metadata, sitemap pages and publishing settings from one protected dashboard.</p>
        <form onSubmit={submit}>
          <Field label="Admin Email" value={email} onChange={setEmail} />
          <label>
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />
          </label>
          <button className="primary" disabled={busy}>{busy ? 'Signing in...' : 'Login to admin'} <ArrowRight size={17} /></button>
        </form>
        {message && <p className="login-message">{message}</p>}
        <button className="text-link" onClick={() => go('/')}>Back to website <ChevronRight size={16} /></button>
      </section>
    </main>
  );
}

function Admin({ posts, setPosts, seo, setSeo, go, apiState, adminSession, setAdminSession }) {
  const [active, setActive] = useState('posts');
  const [editorTab, setEditorTab] = useState('content');
  const [selectedId, setSelectedId] = useState(posts[0]?.id);
  const [uploadState, setUploadState] = useState({ busy: false, message: '' });
  const [inquiries, setInquiries] = useState([]);
  const [inquiryState, setInquiryState] = useState({ busy: false, message: '' });
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const selectedPost = posts.find((post) => post.id === selectedId) || posts[0];
  const categories = useMemo(() => ['All', ...new Set(posts.map((post) => post.category || 'Uncategorized'))], [posts]);
  const filteredPosts = useMemo(() => posts.filter((post) => {
    const search = `${post.title} ${post.slug} ${post.category} ${(post.tags || []).join(' ')}`.toLowerCase();
    return search.includes(query.toLowerCase())
      && (statusFilter === 'All' || post.status === statusFilter)
      && (categoryFilter === 'All' || post.category === categoryFilter);
  }), [posts, query, statusFilter, categoryFilter]);
  const stats = useMemo(() => [
    ['Published', posts.filter((post) => post.status === 'Published').length],
    ['Drafts', posts.filter((post) => post.status === 'Draft').length],
    ['Avg SEO', `${Math.round(posts.reduce((sum, post) => sum + seoScore(post), 0) / Math.max(posts.length, 1))}%`],
    ['Inquiries', inquiries.length],
    ['Sitemap URLs', Object.keys(seo).length + posts.filter((post) => post.status === 'Published').length]
  ], [posts, seo, inquiries]);

  useEffect(() => {
    if (posts.length && !posts.some((post) => post.id === selectedId)) {
      setSelectedId(posts[0].id);
    }
  }, [posts, selectedId]);

  useEffect(() => {
    if (active !== 'inquiries' || !adminSession) return;
    setInquiryState({ busy: true, message: 'Loading inquiries...' });
    apiRequest('/api/inquiries')
      .then((items) => {
        setInquiries(Array.isArray(items) ? items : []);
        setInquiryState({ busy: false, message: '' });
      })
      .catch((error) => setInquiryState({ busy: false, message: error.message }));
  }, [active, adminSession]);

  const updatePost = (patch) => {
    if (!selectedPost) return;
    setPosts(posts.map((post) => post.id === selectedPost.id ? { ...post, ...patch } : post));
  };

  const addPost = () => {
    const post = {
      id: crypto.randomUUID(),
      title: 'New SEO Blog Post',
      slug: `new-seo-blog-post-${Date.now()}`,
      excerpt: 'Write a short search-friendly excerpt for this article.',
      category: 'SEO',
      author: 'Kritech Team',
      date: new Date().toISOString().slice(0, 10),
      status: 'Draft',
      tags: ['SEO', 'Butwal'],
      focusKeyword: 'SEO services in Butwal',
      canonicalUrl: '',
      metaTitle: 'New SEO Blog Post | Kritech Solution',
      metaDescription: 'Add a focused meta description for this article.',
      seoTitle: 'New SEO Blog Post | Kritech Solution',
      seoDescription: 'Add a focused meta description for this article.',
      ogTitle: '',
      ogDescription: '',
      noIndex: false,
      scheduledAt: '',
      content: 'Write the full blog content here.',
      featuredImage: ''
    };
    setPosts([post, ...posts]);
    setSelectedId(post.id);
    setEditorTab('content');
  };

  const duplicatePost = () => {
    if (!selectedPost) return;
    const duplicate = {
      ...selectedPost,
      id: crypto.randomUUID(),
      title: `${selectedPost.title} Copy`,
      slug: `${selectedPost.slug}-copy-${Date.now()}`,
      status: 'Draft',
      date: new Date().toISOString().slice(0, 10)
    };
    setPosts([duplicate, ...posts]);
    setSelectedId(duplicate.id);
  };

  const deletePost = () => {
    if (!selectedPost) return;
    if (!window.confirm(`Delete "${selectedPost.title}" from the CMS?`)) return;
    const remaining = posts.filter((post) => post.id !== selectedPost.id);
    setPosts(remaining);
    setSelectedId(remaining[0]?.id);
  };

  const logout = () => {
    setAdminSession(null);
    go('/');
  };

  const handleImageUpload = async (file) => {
    if (!file || !selectedPost) return;
    setUploadState({ busy: true, message: 'Uploading image to Cloudinary...' });

    try {
      const uploaded = await uploadBlogImage(file);
      updatePost({ featuredImage: uploaded.url, cloudinaryPublicId: uploaded.publicId });
      setUploadState({ busy: false, message: 'Image uploaded and attached to blog.' });
    } catch (error) {
      setUploadState({ busy: false, message: error.message });
    }
  };

  const updateInquiry = async (id, patch) => {
    setInquiries(inquiries.map((inquiry) => inquiry.id === id ? { ...inquiry, ...patch } : inquiry));
    try {
      const updated = await apiRequest(`/api/inquiries/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(patch)
      });
      setInquiries((items) => items.map((inquiry) => inquiry.id === id ? updated : inquiry));
    } catch (error) {
      setInquiryState({ busy: false, message: error.message });
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry from the dashboard?')) return;
    const previous = inquiries;
    setInquiries(inquiries.filter((inquiry) => inquiry.id !== id));
    try {
      await apiRequest(`/api/inquiries/${id}`, { method: 'DELETE' });
    } catch (error) {
      setInquiries(previous);
      setInquiryState({ busy: false, message: error.message });
    }
  };

  return (
    <div className="admin-shell cms-shell">
      <aside>
        <img src="/kritech-logo.webp" alt="Kritech Solution" />
        <button className={active === 'posts' ? 'active' : ''} onClick={() => setActive('posts')}><PenLine /> Blog CMS</button>
        <button className={active === 'inquiries' ? 'active' : ''} onClick={() => setActive('inquiries')}><Mail /> Inquiries</button>
        <button className={active === 'seo' ? 'active' : ''} onClick={() => setActive('seo')}><Search /> Site SEO</button>
        <button className={active === 'sitemap' ? 'active' : ''} onClick={() => setActive('sitemap')}><Globe2 /> Sitemap</button>
        <button onClick={() => go('/')}><ArrowRight /> View Site</button>
        <button onClick={logout}><X /> Logout</button>
        <div className="admin-user-box">
          <ShieldCheck size={17} />
          <span>Logged in as</span>
          <strong>{adminSession.admin?.email}</strong>
        </div>
      </aside>
      <main className="admin-main">
        <div className="admin-top">
          <div>
            <span className="eyebrow">Kritech CMS</span>
            <h1>Professional blog publishing dashboard</h1>
          </div>
          <div className="lock-pill"><ServerCog size={15} /> {apiState.message}</div>
        </div>
        <div className="stat-grid">
          {stats.map(([label, value]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}
        </div>
        {active === 'posts' && selectedPost && (
          <section className="cms-panel">
            <div className="cms-toolbar">
              <div>
                <h2>Posts</h2>
                <p>Manage content, SEO, media and publishing status like a focused WordPress-style CMS.</p>
              </div>
              <div className="cms-actions">
                <button className="secondary small" onClick={duplicatePost}>Duplicate</button>
                <button className="secondary small" onClick={deletePost}>Delete</button>
                <button className="primary small" onClick={addPost}><Plus size={16} /> New Post</button>
              </div>
            </div>
            <div className="cms-grid">
              <div className="cms-library">
                <input placeholder="Search posts, slugs, tags..." value={query} onChange={(event) => setQuery(event.target.value)} />
                <div className="cms-filter-row">
                  <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                    <option>All</option>
                    <option>Published</option>
                    <option>Draft</option>
                  </select>
                  <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
                    {categories.map((category) => <option key={category}>{category}</option>)}
                  </select>
                </div>
                <div className="post-list cms-post-list">
                  {filteredPosts.map((post) => (
                    <button key={post.id} className={post.id === selectedPost.id ? 'selected' : ''} onClick={() => setSelectedId(post.id)}>
                      {post.featuredImage && <img src={post.featuredImage} alt="" />}
                      <strong>{post.title}</strong>
                      <span>{post.status} · {post.category} · SEO {seoScore(post)}%</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="cms-editor">
                <div className="editor-title-row">
                  <Field label="Post Title" value={selectedPost.title} onChange={(value) => updatePost({ title: value, metaTitle: value, seoTitle: value })} />
                  <Field label="Slug" value={selectedPost.slug} onChange={(value) => updatePost({ slug: slugify(value) })} />
                </div>
                <div className="cms-tabs">
                  {['content', 'seo', 'media', 'settings', 'preview'].map((tab) => (
                    <button key={tab} className={editorTab === tab ? 'active' : ''} onClick={() => setEditorTab(tab)}>{tab}</button>
                  ))}
                </div>

                {editorTab === 'content' && (
                  <div className="editor-form cms-tab-panel">
                    <div className="two-col">
                      <Field label="Category" value={selectedPost.category} onChange={(value) => updatePost({ category: value })} />
                      <Field label="Author" value={selectedPost.author || 'Kritech Team'} onChange={(value) => updatePost({ author: value })} />
                    </div>
                    <Field label="Excerpt" value={selectedPost.excerpt} onChange={(value) => updatePost({ excerpt: value })} textarea />
                    <Field label="Content" value={selectedPost.content} onChange={(value) => updatePost({ content: value })} textarea tall />
                    <div className="cms-editor-metrics">
                      <span>{wordCount(selectedPost.content)} words</span>
                      <span>{readingTime(selectedPost.content)} min read</span>
                      <span>{selectedPost.content.length} characters</span>
                    </div>
                  </div>
                )}

                {editorTab === 'seo' && (
                  <div className="editor-form cms-tab-panel">
                    <div className="seo-score-card">
                      <strong>{seoScore(selectedPost)}%</strong>
                      <span>SEO completeness score</span>
                    </div>
                    <Field label="Focus Keyword" value={selectedPost.focusKeyword || ''} onChange={(value) => updatePost({ focusKeyword: value })} />
                    <Field label="Meta Title" value={selectedPost.metaTitle || selectedPost.seoTitle || ''} onChange={(value) => updatePost({ metaTitle: value, seoTitle: value })} />
                    <Field label="Meta Description" value={selectedPost.metaDescription || selectedPost.seoDescription || ''} onChange={(value) => updatePost({ metaDescription: value, seoDescription: value })} textarea />
                    <Field label="Canonical URL" value={selectedPost.canonicalUrl || ''} onChange={(value) => updatePost({ canonicalUrl: value })} />
                    <div className="two-col">
                      <Field label="Open Graph Title" value={selectedPost.ogTitle || ''} onChange={(value) => updatePost({ ogTitle: value })} />
                      <Field label="Open Graph Description" value={selectedPost.ogDescription || ''} onChange={(value) => updatePost({ ogDescription: value })} />
                    </div>
                    <label className="checkbox-row">
                      <input type="checkbox" checked={Boolean(selectedPost.noIndex)} onChange={(event) => updatePost({ noIndex: event.target.checked })} />
                      Noindex this post
                    </label>
                  </div>
                )}

                {editorTab === 'media' && (
                  <div className="cms-tab-panel">
                    <ImageUploadField
                      post={selectedPost}
                      uploadState={uploadState}
                      onUpload={handleImageUpload}
                      onUrlChange={(value) => updatePost({ featuredImage: value })}
                      onRemove={() => updatePost({ featuredImage: '', cloudinaryPublicId: '' })}
                    />
                  </div>
                )}

                {editorTab === 'settings' && (
                  <div className="editor-form cms-tab-panel">
                    <div className="two-col">
                      <label>Status<select value={selectedPost.status} onChange={(event) => updatePost({ status: event.target.value })}><option>Published</option><option>Draft</option></select></label>
                      <Field label="Publish Date" value={selectedPost.date || ''} onChange={(value) => updatePost({ date: value })} />
                    </div>
                    <Field label="Scheduled Date/Time" value={selectedPost.scheduledAt || ''} onChange={(value) => updatePost({ scheduledAt: value })} />
                    <Field label="Tags" value={(selectedPost.tags || []).join(', ')} onChange={(value) => updatePost({ tags: parseTags(value) })} />
                    <div className="cms-checklist">
                      {postChecklist(selectedPost).map(([label, done]) => (
                        <span key={label} className={done ? 'done' : ''}><Check size={15} /> {label}</span>
                      ))}
                    </div>
                  </div>
                )}

                {editorTab === 'preview' && (
                  <div className="cms-tab-panel">
                    <article className="cms-preview-card">
                      {selectedPost.featuredImage && <img src={selectedPost.featuredImage} alt={selectedPost.title} />}
                      <span>{selectedPost.category}</span>
                      <h2>{selectedPost.title}</h2>
                      <p>{selectedPost.excerpt}</p>
                      <small>{SITE_URL}/blog/{selectedPost.slug}</small>
                    </article>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
        {active === 'inquiries' && (
          <InquiriesPanel
            inquiries={inquiries}
            inquiryState={inquiryState}
            updateInquiry={updateInquiry}
            deleteInquiry={deleteInquiry}
          />
        )}
        {active === 'seo' && <SeoManager seo={seo} setSeo={setSeo} />}
        {active === 'sitemap' && <Sitemap posts={posts} seo={seo} />}
      </main>
    </div>
  );
}

function parseTags(value) {
  return value.split(',').map((tag) => tag.trim()).filter(Boolean);
}

function wordCount(value = '') {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function readingTime(value = '') {
  return Math.max(1, Math.ceil(wordCount(value) / 220));
}

function seoScore(post) {
  const checks = postChecklist(post);
  const passed = checks.filter(([, done]) => done).length;
  return Math.round((passed / checks.length) * 100);
}

function postChecklist(post) {
  const title = post.title || '';
  const slug = post.slug || '';
  const metaTitle = post.metaTitle || post.seoTitle || '';
  const metaDescription = post.metaDescription || post.seoDescription || '';
  const content = post.content || '';
  const focusKeyword = (post.focusKeyword || '').toLowerCase();
  const combined = `${title} ${slug} ${metaTitle} ${metaDescription} ${content}`.toLowerCase();

  return [
    ['Title is written', title.length >= 18],
    ['Slug is SEO-friendly', slug.length >= 8 && !slug.includes(' ')],
    ['Excerpt is useful', (post.excerpt || '').length >= 80],
    ['Meta title length is healthy', metaTitle.length >= 35 && metaTitle.length <= 70],
    ['Meta description length is healthy', metaDescription.length >= 110 && metaDescription.length <= 170],
    ['Focus keyword is used', focusKeyword ? combined.includes(focusKeyword) : false],
    ['Featured image added', Boolean(post.featuredImage)],
    ['Content has depth', wordCount(content) >= 350],
    ['Category selected', Boolean(post.category)],
    ['Tags added', Array.isArray(post.tags) && post.tags.length > 0]
  ];
}

function SeoManager({ seo, setSeo }) {
  const update = (key, patch) => setSeo({ ...seo, [key]: { ...seo[key], ...patch } });
  return (
    <section className="admin-panel">
      <h2>Meta title and description editing</h2>
      <div className="seo-grid">
        {Object.entries(seo).map(([key, item]) => (
          <article className="seo-card" key={key}>
            <span>{item.path}</span>
            <Field label="Meta Title" value={item.title} onChange={(value) => update(key, { title: value })} />
            <Field label="Meta Description" value={item.description} onChange={(value) => update(key, { description: value })} textarea />
          </article>
        ))}
      </div>
    </section>
  );
}

function Sitemap({ posts, seo }) {
  const xml = generateSitemap(posts, seo);
  const download = () => {
    const blob = new Blob([xml], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sitemap.xml';
    link.click();
    URL.revokeObjectURL(link.href);
  };
  return (
    <section className="admin-panel">
      <div className="panel-actions">
        <h2>Sitemap creation for Google Search Console</h2>
        <button className="primary small" onClick={download}><Download size={16} /> Download sitemap.xml</button>
      </div>
      <pre className="sitemap-preview">{xml}</pre>
    </section>
  );
}

function InquiriesPanel({ inquiries, inquiryState, updateInquiry, deleteInquiry }) {
  return (
    <section className="cms-panel inquiries-panel">
      <div className="cms-toolbar">
        <div>
          <h2>Inquiry inbox</h2>
          <p>Contact form submissions are saved in MongoDB and can be followed up from here.</p>
        </div>
        <div className="inquiry-summary">
          <span>{inquiries.filter((item) => item.status === 'New').length} new</span>
          <span>{inquiries.length} total</span>
        </div>
      </div>
      {inquiryState.message && <p className="admin-alert">{inquiryState.message}</p>}
      {inquiries.length === 0 && !inquiryState.busy ? (
        <div className="empty-inquiries">
          <Mail size={24} />
          <h3>No inquiries yet</h3>
          <p>New contact form submissions will appear here after visitors send a message.</p>
        </div>
      ) : (
        <div className="inquiry-list">
          {inquiries.map((inquiry) => (
            <article className="inquiry-card" key={inquiry.id}>
              <div className="inquiry-head">
                <div>
                  <span>{formatDateTime(inquiry.createdAt)}</span>
                  <h3>{inquiry.name}</h3>
                  <p>{inquiry.contact}</p>
                </div>
                <select value={inquiry.status || 'New'} onChange={(event) => updateInquiry(inquiry.id, { status: event.target.value })}>
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Qualified</option>
                  <option>Closed</option>
                  <option>Spam</option>
                </select>
              </div>
              <div className="inquiry-meta">
                <span>{inquiry.service || 'Service not selected'}</span>
                <span>{inquiry.location || 'Location not selected'}</span>
              </div>
              <p className="inquiry-message">{inquiry.message}</p>
              {inquiry.sourcePage && <small>Source: {inquiry.sourcePage}</small>}
              <textarea
                placeholder="Internal note"
                value={inquiry.note || ''}
                onChange={(event) => updateInquiry(inquiry.id, { note: event.target.value })}
              />
              <button className="secondary small" onClick={() => deleteInquiry(inquiry.id)}>Delete inquiry</button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function formatDateTime(value) {
  if (!value) return 'Unknown date';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function ImageUploadField({ post, uploadState, onUpload, onUrlChange, onRemove }) {
  return (
    <div className="image-upload-field">
      <div className="image-upload-head">
        <label>
          Featured Image
          <input
            type="file"
            accept="image/*"
            disabled={uploadState.busy}
            onChange={(event) => onUpload(event.target.files?.[0])}
          />
        </label>
        {post.featuredImage && (
          <button type="button" className="secondary small" onClick={onRemove}>
            Remove image
          </button>
        )}
      </div>
      {post.featuredImage ? (
        <img className="admin-image-preview" src={post.featuredImage} alt={post.title} />
      ) : (
        <div className="admin-image-empty">
          <Upload size={20} />
          Upload a featured image for this blog post.
        </div>
      )}
      <Field label="Image URL" value={post.featuredImage || ''} onChange={onUrlChange} />
      {uploadState.message && <p className={uploadState.busy ? 'upload-message busy' : 'upload-message'}>{uploadState.message}</p>}
    </div>
  );
}

function generateSitemap(posts, seo) {
  const urls = Object.values(seo).map((item) => item.path);
  posts.filter((post) => post.status === 'Published').forEach((post) => urls.push(`/blog/${post.slug}`));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((path) => `  <url>\n    <loc>${SITE_URL}${path === '/' ? '' : path}</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n    <changefreq>${path.includes('/blog/') ? 'monthly' : 'weekly'}</changefreq>\n    <priority>${path === '/' ? '1.0' : '0.8'}</priority>\n  </url>`).join('\n')}\n</urlset>`;
}

function Field({ label, value, onChange, textarea, tall }) {
  return (
    <label>
      {label}
      {textarea ? (
        <textarea className={tall ? 'tall' : ''} value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function Footer({ go }) {
  return (
    <footer>
      <div>
        <img src="/kritech-logo.webp" alt="Kritech Solution logo" />
        <p>Quality digital marketing and IT services within reach of every Nepali business.</p>
      </div>
      <div>
        <h4>Company</h4>
        {['Services', 'About', 'Pricing', 'Blog', 'Contact'].map((item) => <button key={item} onClick={() => go(`/${item.toLowerCase()}`)}>{item}</button>)}
      </div>
      <div>
        <h4>Contact</h4>
        <p>Butwal-11, Kalikanagar</p>
        <p>+977-9867756460</p>
        <p>info@kritechsolution.com</p>
      </div>
    </footer>
  );
}

function FloatingContact() {
  return <a className="floating-contact" href="https://api.whatsapp.com/send?phone=9779867756460" target="_blank" rel="noreferrer">WhatsApp</a>;
}

createRoot(document.getElementById('root')).render(<App />);
