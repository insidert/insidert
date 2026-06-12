export const OBSESSIONS = [
  { label: 'AI', slug: 'ai', theme: 'technology' as const },
  { label: 'Startups', slug: 'business', theme: 'entrepreneurship' as const },
  { label: 'Fitness', slug: 'health', theme: 'fitness' as const },
  { label: 'Design', slug: 'code', theme: 'product' as const },
  { label: 'Marketing', slug: 'productivity', theme: 'marketing' as const },
] as const;

export const WRITING_ABOUT = [
  { label: 'Startups', href: '/tags/business' },
  { label: 'Experiments', href: '/tags/code' },
  { label: 'Lessons', href: '/tags/opinions' },
  { label: 'Guides', href: '/tags/how-to' },
] as const;

export const INSIGHTS = [
  {
    text: 'Focus on one thing at a time. Multitasking is a myth that slows everything down.',
    theme: 'coral' as const,
    rotate: -2.5,
  },
  {
    text: 'Ship early, learn fast. Perfection is the enemy of momentum.',
    theme: 'amber' as const,
    rotate: 1.8,
  },
  {
    text: 'The best marketing is a product people genuinely want to talk about.',
    theme: 'pink' as const,
    rotate: -1.2,
  },
  {
    text: 'Comfort zones feel safe — but nothing meaningful grows there.',
    theme: 'teal' as const,
    rotate: 2.2,
  },
  {
    text: 'Simple explanations for complex problems win every time.',
    theme: 'purple' as const,
    rotate: -0.8,
  },
] as const;

export const HERO_MIND_NODES = [
  { label: 'Startups', icon: '🚀', href: '/tags/business', theme: 'coral' as const },
  { label: 'Software', icon: '💻', href: '/tags/code', theme: 'purple' as const },
  { label: 'Fitness', icon: '🏋️', href: '/tags/health', theme: 'green' as const },
  { label: 'AI', icon: '🤖', href: '/tags/ai', theme: 'purple' as const },
  { label: 'Marketing', icon: '📈', href: '/tags/productivity', theme: 'pink' as const },
  { label: 'Writing', icon: '📝', href: '/blog', theme: 'coral' as const },
  { label: 'Experiments', icon: '🧪', href: '/tags/code', theme: 'orange' as const },
  { label: 'Ideas', icon: '💡', href: '/tags/opinions', theme: 'teal' as const },
] as const;

export const HERO_FLOATING_WORDS = [
  'Building', 'Learning', 'Experimenting', 'Failing',
  'Improving', 'Launching', 'Teaching', 'Growing',
] as const;

export const HERO_MICROCOPY = {
  status: 'Building more things than I probably should.',
  mood: 'Optimistic and slightly overwhelmed.',
  experiment: 'Making software more human.',
} as const;

export const FOOTER_EXPLORE = [
  { href: '/blog', label: 'Notes' },
  { href: '/tags/code', label: 'Experiments' },
  { href: '/tags/opinions', label: 'Lessons' },
  { href: '/tags/business', label: 'Ideas' },
  { href: '/projects', label: 'Projects' },
  { href: '/search', label: 'Search' },
] as const;

export const CURRENT_STATUS = [
  { icon: '☕', text: 'Drinking coffee' },
  { icon: '🚀', text: 'Building products' },
  { icon: '📚', text: 'Learning new things' },
] as const;

export const FOOTER_QUOTES = [
  'Ship early, learn fast.',
  'Focus on one thing at a time.',
  'Simple beats clever every time.',
  'The best marketing is a great product.',
  'Comfort zones are where dreams go to sleep.',
] as const;

export const RAVI_NOTES = [
  'Currently obsessed with how AI changes the builder workflow.',
  'Always happy to chat about startups, fitness, or product design.',
  'Best ideas usually start as half-baked notes.',
] as const;

export const CONTACT_INTERESTS = [
  'Startups & entrepreneurship',
  'AI and builder tools',
  'Product design',
  'Fitness & wellness',
  'Marketing that doesn\'t feel gross',
] as const;

/** Per-card layout tweaks for the project workbench */
export const PROJECT_LAYOUT = [
  { rotate: -2.2, offset: 0, wide: true },
  { rotate: 1.4, offset: 12, wide: false },
  { rotate: -1.1, offset: 6, wide: false },
  { rotate: 2.5, offset: 18, wide: true },
  { rotate: -1.8, offset: 8, wide: false },
] as const;
