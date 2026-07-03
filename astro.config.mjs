// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import partytown from '@astrojs/partytown';
import { buildSitemapLastmodMap } from './src/lib/sitemap-lastmod.mjs';

const sitemapLastmod = buildSitemapLastmodMap();

// https://astro.build/config
export default defineConfig({
    site: 'https://insidert.com',
  redirects: {
    '/blog': '/notes',
    '/blog/[slug]': '/notes/[slug]',
    '/blog/page/[page]': '/notes/page/[page]',
  },
  integrations: [mdx({
    components: {
      Callout: './src/components/article/Callout.astro',
    },
  }), react(), sitemap({
    filter: (page) => !page.includes('/success') && !page.includes('/blog'),
    serialize(item) {
      const pathname = decodeURIComponent(new URL(item.url).pathname);
      const lastmod = sitemapLastmod.get(pathname);
      if (lastmod) item.lastmod = lastmod;
      return item;
    },
  }), partytown({
    config: {
      forward: ['dataLayer.push'],
    },
  })],
    markdown: {
        shikiConfig: {
            theme: 'github-dark-dimmed',
            wrap: true,
        },
    },
});