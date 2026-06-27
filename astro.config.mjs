// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
    site: 'https://insidert.com',
  integrations: [mdx({
    components: {
      Callout: './src/components/article/Callout.astro',
    },
  }), react(), sitemap(), partytown({
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