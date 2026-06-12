export const SITE = {
  title: 'insidert',
  tagline: 'Inside Ravi Teja',
  description:
    'Personal blog of Ravi Teja Veligatla — startups, software, entrepreneurship, and lessons from building products.',
  url: 'https://insidert.com',
  author: {
    name: 'Ravi Teja Veligatla',
    shortName: 'Ravi Teja',
    bio: 'Co-founder of Prasanta Communications. Builder, entrepreneur, and product creator writing about startups, software, and the journey of making things.',
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
  { href: '/tags/business', label: 'Ideas' },
  { href: '/tags/code', label: 'Experiments' },
  { href: '/projects', label: 'Building' },
  { href: '/blog', label: 'Notes' },
  { href: '/search', label: 'Archive', compactHide: true },
] as const;

export const FOOTER_LINKS = [
  { href: '/connect', label: 'Say hello' },
  { href: '/blog', label: 'Notes' },
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
    name: 'MF7+',
    description: 'Fitness and wellness platform helping people build sustainable health habits.',
    status: 'Active' as const,
    url: 'https://mf7plus.com',
  },
  {
    name: 'WorkbaseHQ',
    description: 'Workforce management and operations platform for modern teams.',
    status: 'Active' as const,
    url: 'https://workbasehq.com',
  },
  {
    name: 'RoomR',
    description: 'Room and property management solution for hospitality businesses.',
    status: 'Active' as const,
    url: 'https://roomr.in',
  },
  {
    name: 'Bolty',
    description: 'Lightning-fast tools for builders and independent makers.',
    status: 'Building' as const,
    url: '#',
  },
  {
    name: 'Zoneout',
    description: 'Focus and productivity app for deep work sessions.',
    status: 'Building' as const,
    url: '#',
  },
] as const;

export const BLOG_PAGE_SIZE = 50;

export const CATEGORY_LABELS: Record<string, string> = {
  code: 'Technology',
  business: 'Startups',
  opinions: 'Life',
  productivity: 'Productivity',
  'how-to': 'Guide',
};
