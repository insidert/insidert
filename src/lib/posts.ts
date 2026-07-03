import type { CollectionEntry } from 'astro:content';

export type Note = CollectionEntry<'notes'>;
export type NoteVariant = 'hero' | 'note' | 'snippet' | 'quote' | 'timeline';

export function sortPostsByDate(posts: Note[]): Note[] {
  return [...posts].sort(
    (a, b) => b.data.updatedDate.valueOf() - a.data.updatedDate.valueOf(),
  );
}

export function getFeaturedPosts(posts: Note[]): Note[] {
  return sortPostsByDate(posts).filter((p) => p.data.isFeatured);
}

export function getRecentNotes(posts: Note[], count = 6): Note[] {
  const featured = getFeaturedPosts(posts);
  if (featured.length >= count) return featured.slice(0, count);
  const sorted = sortPostsByDate(posts);
  const featuredIds = new Set(featured.map((p) => p.id));
  const rest = sorted.filter((p) => !featuredIds.has(p.id));
  return [...featured, ...rest].slice(0, count);
}

export function getNoteVariant(post: Note, index: number, heroFirst = false): NoteVariant {
  if (index === 0 && (post.data.isFeatured || heroFirst)) return 'hero';
  const cycle: NoteVariant[] = ['note', 'snippet', 'quote', 'timeline'];
  return cycle[index % cycle.length];
}

export function getCategory(post: Note): string {
  const tag = post.data.tags[0];
  if (!tag) return 'Post';
  const labels: Record<string, string> = {
    code: 'Technology',
    business: 'Startups',
    opinions: 'Life',
    productivity: 'Productivity',
    'how-to': 'Guide',
  };
  return labels[tag] ?? tag.charAt(0).toUpperCase() + tag.slice(1);
}

export function getAdjacentPosts(
  posts: Note[],
  currentId: string,
): { prev: Note | null; next: Note | null } {
  const sorted = sortPostsByDate(posts);
  const index = sorted.findIndex((p) => p.id === currentId);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index < sorted.length - 1 ? sorted[index + 1] : null,
    next: index > 0 ? sorted[index - 1] : null,
  };
}

export function getRelatedPosts(
  posts: Note[],
  current: Note,
  count = 3,
): Note[] {
  const currentTags = new Set(current.data.tags.map(normalizeTagSlug));
  return sortPostsByDate(posts)
    .filter((p) => p.id !== current.id)
    .map((p) => ({
      post: p,
      score: p.data.tags.filter((t) => currentTags.has(normalizeTagSlug(t))).length,
    }))
    .sort((a, b) => b.score - a.score || b.post.data.updatedDate.valueOf() - a.post.data.updatedDate.valueOf())
    .slice(0, count)
    .map(({ post }) => post);
}

export function normalizeTagSlug(tag: string): string {
  return tag.trim().toLowerCase();
}

function getTagVariantCounts(posts: Note[]): Map<string, Map<string, number>> {
  const variants = new Map<string, Map<string, number>>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = normalizeTagSlug(tag);
      if (!variants.has(slug)) variants.set(slug, new Map());
      const counts = variants.get(slug)!;
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return variants;
}

function pickCanonicalTagLabel(variantCounts: Map<string, number>): string {
  return [...variantCounts.entries()].sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
  )[0][0];
}

export function getCanonicalTagLabel(posts: Note[], slug: string): string {
  const variants = getTagVariantCounts(posts).get(slug);
  return variants ? pickCanonicalTagLabel(variants) : slug;
}

export function getUniqueTagSlugs(posts: Note[]): string[] {
  const slugs = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      slugs.add(normalizeTagSlug(tag));
    }
  }
  return [...slugs].sort();
}

export function postHasTag(post: Note, tagSlug: string): boolean {
  return post.data.tags.some((tag) => normalizeTagSlug(tag) === tagSlug);
}

export function getAllTags(posts: Note[]): string[] {
  const variants = getTagVariantCounts(posts);
  return [...variants.keys()]
    .sort()
    .map((slug) => pickCanonicalTagLabel(variants.get(slug)!));
}

export function getTagCounts(posts: Note[]): Map<string, number> {
  const counts = new Map<string, number>();
  const variants = getTagVariantCounts(posts);

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = normalizeTagSlug(tag);
      const label = pickCanonicalTagLabel(variants.get(slug)!);
      counts.set(label, (counts.get(label) ?? 0) + 1);
    }
  }
  return counts;
}

export function getRandomPosts(posts: Note[], count = 5): Note[] {
  const shuffled = [...posts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getPlaceholderImage(index: number): string {
  const placeholders = [
    '/src/assets/blog-placeholder-1.jpg',
    '/src/assets/blog-placeholder-2.jpg',
    '/src/assets/blog-placeholder-3.jpg',
    '/src/assets/blog-placeholder-4.jpg',
    '/src/assets/blog-placeholder-5.jpg',
  ];
  return placeholders[index % placeholders.length];
}
