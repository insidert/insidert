import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const NOTES_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '../content/notes');
const NOTES_PAGE_SIZE = 50;

function parseFrontmatterField(content, field) {
  const match = content.match(new RegExp(`^${field}:\\s*["']?([^"'\\n]+)`, 'm'));
  return match ? match[1].trim() : null;
}

function parseFrontmatterDate(content, field) {
  const value = parseFrontmatterField(content, field);
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? null : date;
}

function parseFrontmatterTags(content) {
  const match = content.match(/^tags:\s*\[(.*?)\]/ms);
  if (!match) return [];
  return [...match[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]);
}

function normalizeTagSlug(tag) {
  return tag.trim().toLowerCase();
}

function maxDate(current, candidate) {
  if (!candidate) return current;
  if (!current || candidate > current) return candidate;
  return current;
}

export function buildSitemapLastmodMap() {
  const byPath = new Map();
  const posts = [];

  for (const file of fs.readdirSync(NOTES_DIR).filter((name) => name.endsWith('.md'))) {
    const content = fs.readFileSync(path.join(NOTES_DIR, file), 'utf-8');
    const updatedDate = parseFrontmatterDate(content, 'updatedDate');
    if (!updatedDate) continue;

    const slug = file.replace(/\.md$/, '');
    posts.push({ slug, updatedDate, tags: parseFrontmatterTags(content) });
    byPath.set(`/notes/${slug}/`, updatedDate);
  }

  posts.sort((a, b) => b.updatedDate - a.updatedDate);

  let notesIndexLastmod = null;
  for (const post of posts) {
    notesIndexLastmod = maxDate(notesIndexLastmod, post.updatedDate);

    for (const tag of post.tags) {
      const tagPath = `/tags/${normalizeTagSlug(tag)}/`;
      byPath.set(tagPath, maxDate(byPath.get(tagPath), post.updatedDate));
    }
  }

  if (notesIndexLastmod) {
    byPath.set('/notes/', notesIndexLastmod);

    const lastPage = Math.ceil(posts.length / NOTES_PAGE_SIZE);
    for (let page = 2; page <= lastPage; page += 1) {
      const start = (page - 1) * NOTES_PAGE_SIZE;
      const pagePosts = posts.slice(start, start + NOTES_PAGE_SIZE);
      const pageLastmod = pagePosts.reduce(
        (latest, post) => maxDate(latest, post.updatedDate),
        null,
      );
      if (pageLastmod) byPath.set(`/notes/page/${page}/`, pageLastmod);
    }
  }

  return byPath;
}
