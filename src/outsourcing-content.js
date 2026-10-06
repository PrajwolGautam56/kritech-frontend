const countryBriefs = [
  ['usa', 'US', 'Plan the handoff around your US working hours. Nepal is ahead of the US, so agree a review window, written acceptance criteria and who can approve releases. For an existing product, start with a code review and one bounded feature before committing to a larger build.'],
  ['uk', 'UK', 'For a UK agency or business, agree a daytime review window and keep delivery tasks in a shared backlog. If the project handles personal data, discuss processor responsibilities, access restrictions and contract requirements before sharing production data. UK and Nepal time differences change with British summer time.'],
  ['uae', 'UAE', 'For UAE businesses, start by documenting the workflow: branches, users, approvals, currencies, invoice requirements and integrations. Confirm language needs and any local compliance requirements in the brief. Nepal is 1 hour 45 minutes ahead of the UAE, making scheduled daytime reviews practical.']
];

export const outsourcingContent = Object.fromEntries(countryBriefs.map(([slug, market, coordination]) => [
  `/software-development-outsourcing-${slug}`,
  {
    title: `Software development outsourcing for ${market} businesses and agencies`,
    description: `Outsource software and website development to a Nepal-based team. Discuss scope, milestones, QA, ownership and remote delivery for your ${market} project.`,
    sections: [
      ['Choose the delivery model your project needs', 'A founder building an MVP needs a different scope from an agency handing over client websites or a business replacing spreadsheets. Bring your existing code, designs or workflow notes. We can discuss a defined project, a feature backlog or ongoing development support, then agree deliverables and review points before estimating the work.'],
      [`Working remotely from ${market}`, coordination],
      ['Know what is included before comparing costs', 'Ask for an estimate that separates discovery, design, development, testing, deployment and maintenance. Third-party subscriptions, hosting and paid integrations should be listed separately. Scope changes need written approval. A lower hourly rate is only useful when responsibilities, acceptance criteria and revision limits are clear.'],
      ['Review quality, ownership and access', 'Discuss repository access, source-code handover, documentation and intellectual-property terms before starting. Set up a staging environment, test critical user journeys and agree who approves production deployment. An NDA and any data-handling requirements should be agreed in the contract; do not share production credentials in the initial inquiry.']
    ],
    faqs: [
      ['Can we start with a small project?', 'Yes. Describe one feature, website section or bug-fix scope. We can discuss a paid initial project with agreed acceptance criteria so both teams can evaluate the working relationship.'],
      ['How much does outsourcing cost?', 'The estimate depends on scope, existing code quality, integrations, testing and support. Send a brief, budget range and deadline to request a scoped estimate. We do not publish a universal rate that would misrepresent every project.'],
      ['Will you work under our agency brand?', 'White-label delivery can be discussed before work starts. Agree client communication, confidentiality, branding and handover responsibilities in writing.'],
      ['Where is your team based?', `Kritech Solution is based in Butwal, Nepal and offers remote delivery for ${market} clients. This is a cross-border service, not a claim that we have a local office in ${market}.`]
    ]
  }
]));

Object.assign(outsourcingContent, {
  '/white-label-seo-outsourcing': {
    title: 'White-label SEO support for agencies with client work to deliver',
    description: 'Outsource technical audits, on-page SEO, content briefs and implementation to Kritech in Nepal. Agree deliverables and reporting under your agency brand.',
    sections: [
      ['Keep the client relationship; delegate the delivery', 'Use Kritech for a defined technical audit, metadata updates, internal-link implementation, content briefs or an ongoing client backlog. Your agency retains strategy and approvals. Agree who communicates with the end client and whether deliverables carry your branding before the first handoff.'],
      ['A scope you can check', 'Specify the website, CMS, page count and required outputs. An audit should identify affected URLs, the issue, its priority and the recommended fix. Implementation work should include a change log and verification. Content needs editorial approval and accurate business information from the client.'],
      ['Measure progress without promising positions', 'Agree which Search Console and analytics reports matter, then compare queries, landing pages and conversions over consistent periods. Rankings fluctuate, so reporting should explain completed work and business outcomes. We do not promise a number-one ranking, fixed link counts or fabricated reviews.']
    ]
  },
  '/outsource-web-development-to-nepal': {
    title: 'Outsource website development to Nepal with a clear handoff',
    description: 'Website development support for agencies and businesses: design implementation, CMS, landing pages, forms, responsive QA and source-file handover.',
    sections: [
      ['From approved design to a working website', 'Share your design files, page inventory, CMS preference and integrations. Specify which content is ready and who supplies copy, images and translations. We can discuss business websites, landing pages, custom dashboards or improvements to an existing site.'],
      ['Agree the launch checklist', 'Define desktop and mobile layouts, form destinations, analytics requirements, redirect mapping and accessibility checks in the scope. Review on staging before launch. If replacing an existing site, preserve valuable URLs and agree a rollback plan with whoever manages hosting.'],
      ['Handover and ongoing support', 'Agree repository access, CMS training, documentation and ownership terms. Maintenance should be a separate, explicit scope covering updates, bug fixes and response expectations. Paid plugins, hosting and third-party licenses need their own budget.']
    ]
  },
  '/digital-marketing-outsourcing-company': {
    title: 'Outsource digital marketing production without losing control',
    description: 'Remote SEO, social content, campaign creatives and landing-page support for agencies and businesses. Set a brief, approval process and delivery calendar.',
    sections: [
      ['Give your team production capacity', 'Delegate an agreed batch of social posts, campaign creatives, landing-page updates or SEO tasks. Provide the audience, offer, brand guidelines and approval owner. A single service or a coordinated monthly scope can be discussed; choose the work you can review and measure.'],
      ['Separate service fees from advertising spend', 'Campaign management and creative production are service costs. Media spend is paid to the advertising platform and needs a separate approved budget. Keep accounts under your ownership and use role-based access instead of sharing passwords.'],
      ['Approve content before publication', 'Agree the calendar, channels, revision allowance and reporting format. The business must confirm factual claims, promotions and any regulated content. Measure qualified inquiries and conversions alongside reach and engagement, with tracking agreed before launch.']
    ]
  },
  '/video-editing-outsourcing': {
    title: 'Video editing outsourcing for agencies, creators and businesses',
    description: 'Discuss remote video editing for reels, YouTube and campaign creatives. Share footage, references, formats and deadlines for a scoped editing estimate.',
    sections: [
      ['A brief that makes the first cut useful', 'Send footage duration, target runtime, audience, reference videos and the intended platform. Specify captions, language, aspect ratios, music and brand assets. Discuss editing availability and a scoped estimate before transferring large source files.'],
      ['Short-form content and longer videos need different scopes', 'A batch of vertical reels may need hooks, captions and multiple exports. A YouTube edit may require narrative structure, audio cleanup and supporting graphics. Agree what is included, the number of variants and who supplies any missing assets.'],
      ['Review, revisions and final files', 'Use timestamped feedback and one approval owner. Agree the revision rounds, export settings, source-file handover and licensed music or stock footage responsibilities. A paid sample edit can help establish the style before booking recurring production.']
    ],
    faqs: [
      ['Can I outsource a recurring batch of videos?', 'Send your expected monthly volume, footage length and deadlines. We will discuss availability and a delivery scope before confirming a recurring arrangement.'],
      ['Can the work be white-label?', 'Agency branding, confidentiality and client communication can be agreed in the project scope.'],
      ['What should I send for a quote?', 'Provide a reference video, source-footage duration, target runtime, number of exports, caption requirements and delivery date.']
    ]
  }
});
