import type { CollectionEntry } from 'astro:content';
import { PROJECTS, SITE, SOCIAL } from '../consts';
import { sortPostsByDate } from './posts';

type BlogPost = CollectionEntry<'blog'>;

function absoluteUrl(path: string, siteUrl: string): string {
  return new URL(path, siteUrl).href;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function formatPostLink(post: BlogPost, siteUrl: string): string {
  const url = absoluteUrl(`/blog/${post.id}/`, siteUrl);
  return `- [${post.data.title}](${url}): ${post.data.description}`;
}

export function buildLlmsTxt(posts: BlogPost[], siteUrl: string): string {
  const sorted = sortPostsByDate(posts);

  const lines = [
    `# ${SITE.title}`,
    '',
    `> ${SITE.description}`,
    '',
    `${SITE.author.name} — ${SITE.author.bio}`,
    '',
    'This site is a personal blog and portfolio. Notes cover software development, startups, entrepreneurship, product building, and personal essays.',
    '',
    '## Pages',
    `- [Home](${absoluteUrl('/', siteUrl)}): ${SITE.tagline}`,
    `- [Notes](${absoluteUrl('/blog/', siteUrl)}): Blog posts and essays`,
    `- [Tags](${absoluteUrl('/tags/', siteUrl)}): Browse posts by topic`,
    `- [Search](${absoluteUrl('/search/', siteUrl)}): Search the archive`,
    `- [Projects](${absoluteUrl('/projects/', siteUrl)}): Products and ventures being built`,
    `- [Connect](${absoluteUrl('/connect/', siteUrl)}): Contact and social links`,
    '',
    '## Notes',
    ...sorted.map((post) => formatPostLink(post, siteUrl)),
    '',
    '## Projects',
    ...PROJECTS.map((project) => {
      const url = project.url === '#' ? absoluteUrl('/projects/', siteUrl) : project.url;
      return `- [${project.name}](${url}): ${project.description} (${project.status})`;
    }),
    '',
    '## Optional',
    `- [Full content bundle](${absoluteUrl('/llms-full.txt', siteUrl)}): All notes in a single Markdown file`,
    `- [RSS Feed](${absoluteUrl('/rss.xml', siteUrl)}): Feed of all posts`,
    `- [Sitemap](${absoluteUrl('/sitemap-index.xml', siteUrl)}): XML sitemap`,
    `- [GitHub](${SOCIAL.github}): Open-source work`,
    `- [LinkedIn](${SOCIAL.linkedin}): Professional profile`,
  ];

  return `${lines.join('\n')}\n`;
}

export function buildLlmsFullTxt(posts: BlogPost[], siteUrl: string): string {
  const sorted = sortPostsByDate(posts);

  const header = [
    `# ${SITE.title} — Full Content`,
    '',
    `> ${SITE.description}`,
    '',
    `Full text of all notes on ${SITE.url}, ordered by most recently updated.`,
    '',
    '---',
    '',
  ].join('\n');

  const sections = sorted.map((post) => {
    const url = absoluteUrl(`/blog/${post.id}/`, siteUrl);
    const tags = post.data.tags.join(', ');

    return [
      `# ${post.data.title}`,
      '',
      `Source: ${url}`,
      `Published: ${formatDate(post.data.publishedDate)}`,
      `Updated: ${formatDate(post.data.updatedDate)}`,
      `Tags: ${tags}`,
      '',
      post.body,
      '',
      '---',
      '',
    ].join('\n');
  });

  return header + sections.join('\n');
}
