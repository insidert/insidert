import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => b.data.updatedDate.valueOf() - a.data.updatedDate.valueOf(),
  );
}

export function getFeaturedPosts(posts: BlogPost[]): BlogPost[] {
  return sortPostsByDate(posts).filter((p) => p.data.isFeatured);
}

export function getCategory(post: BlogPost): string {
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
  posts: BlogPost[],
  currentId: string,
): { prev: BlogPost | null; next: BlogPost | null } {
  const sorted = sortPostsByDate(posts);
  const index = sorted.findIndex((p) => p.id === currentId);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index < sorted.length - 1 ? sorted[index + 1] : null,
    next: index > 0 ? sorted[index - 1] : null,
  };
}

export function getRelatedPosts(
  posts: BlogPost[],
  current: BlogPost,
  count = 3,
): BlogPost[] {
  const currentTags = new Set(current.data.tags);
  return sortPostsByDate(posts)
    .filter((p) => p.id !== current.id)
    .map((p) => ({
      post: p,
      score: p.data.tags.filter((t) => currentTags.has(t)).length,
    }))
    .sort((a, b) => b.score - a.score || b.post.data.updatedDate.valueOf() - a.post.data.updatedDate.valueOf())
    .slice(0, count)
    .map(({ post }) => post);
}

export function getAllTags(posts: BlogPost[]): string[] {
  return [...new Set(posts.flatMap((p) => p.data.tags))].sort();
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
