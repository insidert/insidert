export const GA_MEASUREMENT_ID = 'G-N096Z2Y4XF';

export const SITE = {
  title: 'insidert',
  tagline: 'Inside Ravi Teja',
  description:
    'Personal blog of Ravi Teja Veligatla — writing about startups, software, entrepreneurship, and lessons from building products.',
  url: 'https://insidert.com',
  author: {
    name: 'Ravi Teja Veligatla',
    shortName: 'Ravi Teja',
    bio: 'Co-founder of Prasanta Communications. Coder, entrepreneur. Writing about startups, software, and the journey of making things.',
    avatar: '/favicons/v1/apple-touch-icon.png',
  },
} as const;

export const SOCIAL = {
  twitter: 'https://twitter.com/insidert_',
  linkedin: 'https://www.linkedin.com/in/ravitejaveligatla/',
  github: 'https://github.com/ravitejaveligatla',
  instagram: 'https://www.instagram.com/insidert_',
  youtube: 'https://www.youtube.com/@insidert',
  medium: 'https://medium.com/@insidert',
} as const;

export const NAV_LINKS = [
  { href: '/notes', label: 'Notes', variant: 'notes' as const },
  { href: '/tags', label: 'Tags', variant: 'tags' as const },
  { href: '/search', label: 'Search', variant: 'search' as const },
  { href: '/connect', label: 'Connect', variant: 'contact' as const },
] as const;

export const FOOTER_LINKS = [
  { href: '/connect', label: 'Say hello' },
  { href: '/notes', label: 'Notes' },
  { href: '/projects', label: 'Building' },
  { href: '/search', label: 'Archive' },
] as const;

export const TOPICS = [
  { slug: 'business', label: 'Entrepreneurship' },
  { slug: 'business', label: 'Startups' },
  { slug: 'code', label: 'Product Building' },
  { slug: 'code', label: 'Technology' },
  { slug: 'productivity', label: 'Marketing' },
  { slug: 'productivity', label: 'Fitness' },
  { slug: 'opinions', label: 'Life' },
] as const;

export const PROJECTS = [
  {
    name: 'MF7',
    description: 'CRM that helps manage gyms the simplest and easiest way.',
    status: 'Active' as const,
    url: 'https://mf7.in',
  },
  {
    name: 'WorkbaseHQ',
    description: 'Essential Tools and Resources for Your Daily Workflow',
    status: 'WIP' as const,
    url: 'https://workbasehq.com',
  },
  {
    name: 'ROOMR',
    description: 'The simplest and easiest way to rent without any non-sense.',
    status: 'Building' as const,
    url: 'https://roomr.in',
  },
  {
    name: 'Bolty',
    description: 'Worry free denting, painting and detailing services.',
    status: 'Active' as const,
    url: 'https://bolty.in',
  },
  {
    name: 'Zoneout',
    description: 'D2C perfume brand that make you escape, unwind and be yourself.',
    status: 'Building' as const,
    url: '#',
  },
] as const;

export const NOTES_PAGE_SIZE = 50;

export const CATEGORY_LABELS: Record<string, string> = {
  code: 'Technology',
  business: 'Startups',
  opinions: 'Life',
  productivity: 'Productivity',
  'how-to': 'Guide',
};
