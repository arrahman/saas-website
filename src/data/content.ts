// All marketing copy lives here so it can be edited without touching components.
// Replace the [PLACEHOLDER] values and sample prices before launch.

export const brand = {
  name: 'Voxa',
  salesEmail: 'sales@voxa.ai',
  supportEmail: 'support@voxa.ai',
  address: '[YOUR OFFICE ADDRESS]',
  widgetSnippet: {
    src: 'https://cdn.voxa.ai/widget.js',
    agentId: 'agt_your_agent_id',
  },
};

export const navLinks = [
  { label: 'Products', href: '#products' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export const platforms = ['WordPress', 'Shopify', 'Wix', 'Webflow', 'WhatsApp', 'Messenger', 'Slack', 'Zendesk', 'HubSpot', 'Salesforce'];

export type ProductId = 'chat' | 'voice' | 'kb';

export const products: {
  id: ProductId;
  name: string;
  kicker: string;
  headline: string;
  description: string;
  bullets: string[];
}[] = [
  {
    id: 'chat',
    name: 'Chat Agent',
    kicker: 'Website & in-app chatbot',
    headline: 'A chatbot that knows your business inside out.',
    description:
      'Embed a branded chat widget on your website, app, WhatsApp or Messenger. It answers from your own content, captures leads and hands off to a person when it should.',
    bullets: [
      'Matches your brand colors, tone and avatar',
      'Answers in 50+ languages with cited sources',
      'Books meetings, takes orders and qualifies leads',
      'Seamless handoff to Slack, Zendesk or your inbox',
      'Conversation analytics and unanswered-question reports',
    ],
  },
  {
    id: 'voice',
    name: 'Voice Agent',
    kicker: 'Phone & web voice',
    headline: 'Never miss a call again — day or night.',
    description:
      'Give your business a natural-sounding voice agent on a new or existing phone number. It answers, books, routes and follows up, then logs everything to your CRM.',
    bullets: [
      'Human-like voices with interruption handling',
      'Inbound and outbound calls, plus click-to-talk on the web',
      'Books into Google, Outlook or Calendly in real time',
      'Warm transfer to your team with a call summary',
      'Recordings, transcripts and sentiment per call',
    ],
  },
  {
    id: 'kb',
    name: 'Knowledge Base',
    kicker: 'The brain behind every agent',
    headline: 'One source of truth, always up to date.',
    description:
      'Upload files or connect your site, help center and drives. Voxa keeps everything synced, so your agents never quote an outdated price or policy.',
    bullets: [
      'PDFs, docs, spreadsheets, web pages and FAQs',
      'Auto-sync from Google Drive, Notion and Confluence',
      'Replaced documents retire automatically',
      'Access groups for internal vs public answers',
      'Searchable internal helpdesk for your own staff',
    ],
  },
];

export const knowledgeSources = [
  { name: 'Help center', meta: 'help.yourcompany.com · 214 pages' },
  { name: 'Product catalog.xlsx', meta: 'Google Drive · auto-sync daily' },
  { name: 'Returns & warranty policy.pdf', meta: 'Uploaded · replaces v3' },
  { name: 'Internal SOPs', meta: 'Notion · staff-only access' },
];

export const steps = [
  { n: '01', title: 'Connect your knowledge', body: 'Upload documents or point Voxa at your website, help center and drives. We index everything in minutes.' },
  { n: '02', title: 'Shape your agent', body: 'Set the tone, goals and guardrails, choose a voice, and decide when a human should step in. Test it in the playground.' },
  { n: '03', title: 'Deploy anywhere', body: 'Go live on your site, app, messaging channels and phone line. Track every conversation from one dashboard.' },
];

export const segments = [
  {
    tag: 'Individuals',
    title: 'Creators, coaches & consultants',
    body: 'An always-on assistant that answers questions about your services and books calls while you focus on the work.',
    points: ['Set up in an afternoon', 'Calendar booking built in', 'Plans from Starter'],
  },
  {
    tag: 'Small business',
    title: 'Shops, clinics & local services',
    body: 'Answer every chat and phone call, capture leads after hours and cut repetitive support work.',
    points: ['Chat + voice on one plan', 'Shopify, WordPress & CRM ready', 'No developers needed'],
  },
  {
    tag: 'Enterprise',
    title: 'Support, sales & IT at scale',
    body: 'Deploy governed agents across brands, regions and departments with the controls your security team expects.',
    points: ['SSO, roles & audit logs', 'Data residency & private cloud', 'Dedicated success team'],
  },
];

export const useCases = [
  { t: 'Customer support', d: 'Resolve common questions instantly' },
  { t: 'Sales & lead gen', d: 'Qualify visitors and book demos' },
  { t: 'Appointment booking', d: 'Fill your calendar by chat or phone' },
  { t: 'Order tracking', d: 'Status, returns and refunds' },
  { t: 'After-hours reception', d: 'Answer calls 24/7' },
  { t: 'Internal helpdesk', d: 'HR and IT answers for staff' },
  { t: 'Onboarding', d: 'Guide new customers step by step' },
  { t: 'Surveys & follow-ups', d: 'Outbound calls that collect feedback' },
];

export type Plan = {
  name: string;
  audience: string;
  monthly: number | null; // null = custom pricing
  yearly: number | null; // per-month price when billed yearly
  popular?: boolean;
  cta: string;
  ctaHref: string;
  features: string[];
};

// Sample prices — replace with your real pricing.
export const plans: Plan[] = [
  {
    name: 'Starter', audience: 'For individuals & creators', monthly: 19, yearly: 15, cta: 'Start free trial', ctaHref: '#contact',
    features: ['1 chat agent', '1,000 messages / month', '50 knowledge documents', 'Website widget', 'Email support'],
  },
  {
    name: 'Growth', audience: 'For small businesses', monthly: 79, yearly: 63, popular: true, cta: 'Start free trial', ctaHref: '#contact',
    features: ['3 agents — chat + voice', '10,000 messages / month', '500 voice minutes / month', 'All integrations & remove branding', 'Lead capture & booking', 'Chat support'],
  },
  {
    name: 'Business', audience: 'For scaling teams', monthly: 249, yearly: 199, cta: 'Start free trial', ctaHref: '#contact',
    features: ['10 agents — chat + voice', '50,000 messages / month', '3,000 voice minutes / month', 'Human handoff & team inbox', 'Advanced analytics & API', 'Priority support'],
  },
  {
    name: 'Enterprise', audience: 'For large organizations', monthly: null, yearly: null, cta: 'Contact sales', ctaHref: '#contact',
    features: ['Unlimited agents & workspaces', 'Custom usage volumes', 'SSO, SCIM & audit logs', 'Regional data residency', 'Uptime SLA & dedicated manager', 'Private cloud deployment'],
  },
];

export const faqs = [
  { q: 'Can I integrate Voxa with my existing platform?', a: 'Yes. Paste one script tag into any website builder, or use our plugins for WordPress, Shopify and Wix, our SDKs for iOS, Android and React, or the REST API and webhooks for anything else.' },
  { q: 'How does the voice agent connect to my phone line?', a: 'Get a new local or toll-free number from us, forward your existing number, or connect your own telephony via SIP. Calls can be transferred to your team at any time.' },
  { q: 'Will the AI make things up?', a: 'Agents answer only from your knowledge base and cite their sources. When an answer isn’t covered, they say so and offer a handoff instead of guessing.' },
  { q: 'Where is my data stored?', a: 'Your data is encrypted in transit and at rest and is never used to train shared models. Enterprise plans can choose the region where data is stored.' },
  { q: 'Can I change or cancel my plan later?', a: 'Upgrade, downgrade or cancel anytime from your dashboard. Yearly plans are prorated when you upgrade.' },
];
