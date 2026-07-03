import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';
import { buildLlmsFullTxt } from '../lib/llms';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('notes');
  const content = buildLlmsFullTxt(posts, site?.href ?? SITE.url);

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
