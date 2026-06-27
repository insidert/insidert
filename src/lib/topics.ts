export type TopicTheme = {
  color: string;
  muted: string;
  gradient?: string;
};

export const TAG_THEMES: Record<string, TopicTheme> = {
  code: {
    color: '#A855F7',
    muted: 'rgba(168, 85, 247, 0.12)',
    gradient: 'linear-gradient(135deg, #F472B6 0%, #A855F7 100%)',
  },
  business: {
    color: '#FF6B6B',
    muted: 'rgba(255, 107, 107, 0.12)',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
  },
  opinions: {
    color: '#14B8A6',
    muted: 'rgba(20, 184, 166, 0.12)',
    gradient: 'linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)',
  },
  productivity: {
    color: '#F472B6',
    muted: 'rgba(244, 114, 182, 0.12)',
    gradient: 'linear-gradient(135deg, #F472B6 0%, #FB7185 100%)',
  },
  'how-to': {
    color: '#FF8E53',
    muted: 'rgba(255, 142, 83, 0.12)',
    gradient: 'linear-gradient(135deg, #FFB347 0%, #FF6B6B 100%)',
  },
};

export const LABEL_THEMES: Record<string, TopicTheme> = {
  Technology: TAG_THEMES.code,
  Entrepreneurship: TAG_THEMES.business,
  Startups: TAG_THEMES.business,
  'Product Building': {
    color: '#FF8E53',
    muted: 'rgba(255, 142, 83, 0.12)',
    gradient: 'linear-gradient(135deg, #FFB347 0%, #FF8E53 100%)',
  },
  Marketing: TAG_THEMES.productivity,
  Life: TAG_THEMES.opinions,
  Fitness: {
    color: '#22C55E',
    muted: 'rgba(34, 197, 94, 0.12)',
    gradient: 'linear-gradient(135deg, #22C55E 0%, #4ADE80 100%)',
  },
  Productivity: TAG_THEMES.productivity,
  Guide: TAG_THEMES['how-to'],
};

export function getTagTheme(tag?: string): TopicTheme {
  if (tag && TAG_THEMES[tag]) return TAG_THEMES[tag];
  return {
    color: 'var(--color-accent)',
    muted: 'var(--color-accent-muted)',
    gradient: 'var(--gradient-hero)',
  };
}

export function getLabelTheme(label: string): TopicTheme {
  return LABEL_THEMES[label] ?? getTagTheme();
}
