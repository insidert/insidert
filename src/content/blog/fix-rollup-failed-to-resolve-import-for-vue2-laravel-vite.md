---
title: "Fix Rollup failed to resolve import for Vue2, Laravel and Vite"
description: "How we wrap our head around the unknown"
publishedDate: "Aug 14 2023"
updatedDate: "Aug 14 2023"
isFeatured: true
tags: ['code', 'laravel']
heroImage:
    url: ""
    alt: ""
---

If you are using Vue2 in your Laravel project and is upgrading to vite, you will face this error while building the assets. We need to change vue config in vite.config.js file

```js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue2';

export default defineConfig({
    plugins: [
      laravel({
        input: [
            'resources/sass/vendor.scss',
            'resources/js/vendor.js',
            'resources/js/app.js',
        ],
        refresh: true}),
      vue({
          template: {
            transformAssetUrlsOptions: {
                base: null,
                includeAbsolute: false,
              },
          },
      }),
    ],
});
```

The difference we must notice in the config file is **transformAssetUrlsOptions**. For vue 3 projects, it will be *transformAssetUrls.* If you do not change this option, images inside the vue components will throw **Rollup failed to resolve import "/img/imgname.png"** error while running npm run build.

