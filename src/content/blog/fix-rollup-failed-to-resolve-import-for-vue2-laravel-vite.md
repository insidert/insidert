---
title: "Fix Rollup failed to resolve import for Vue2, Laravel and Vite"
description: "Upgrade to vite using vue2"
publishedDate: "Jan 30 2024"
updatedDate: "Jan 30 2024"
isFeatured: false
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

The difference we must notice in the config file is **transformAssetUrlsOptions**. 

For vue 3 projects, it will be *transformAssetUrls.* 

If you do not change this option, images inside the vue components will throw **Rollup failed to resolve import "/img/imgname.png"** error while running npm run build.

