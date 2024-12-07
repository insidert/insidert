---
title: "Update Laravel Mix to Vite with Vue 2"
description: "Step by step upgrade guide."
publishedDate: "Feb 13 2024"
updatedDate: "Feb 13 2024"
isFeatured: false
tags: ['code', 'laravel']
heroImage:
    url: ""
    alt: ""
---

Vite is the new asset bundler in Laravel. Upgrading to vite from mix is easy task. But few changes have to be made for projects that have Vue 2. Here are the steps:

## Upgrade steps

- Follow the upgrade guide and install the dependencies. [Upgrade guide](https://github.com/laravel/vite-plugin/blob/main/UPGRADE.md#migrating-from-laravel-mix-to-vite)
- Update npm scripts. ```npm update```
- Add vite.config.js file. I have the following setup.

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

## Important config note

One difference we must notice in the config file is **transformAssetUrlsOptions**. For vue 3 projects, it will be *transformAssetUrls.* If you do not change this option, images inside the vue components will throw **Rollup failed to resolve import "/img/imgname.png"** error while running npm run build.

## Vue component registration

With mix, we used to require the SFC component and register globally like ```Vue.component("upload-image", require("./components/UploadImage.vue").default);```

This way will not work with vite. So we need to import them.

```js
import vue from 'vue/dist/vue.js';
window.Vue = vue;

import UploadImage from "./components/UploadImage.vue"

Vue.component("upload-image", UploadImage);

new Vue({
  el: "#app",
  data: {},
});
```

My app.js file look like this after the changes

```js
import axios from 'axios';
import moment from 'moment';
import Echo from 'laravel-echo';
import pusher from 'pusher-js';
import * as bootstrap from 'bootstrap';

window.axios = axios;
window.moment = moment;
window.bootstrap = bootstrap;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
} else {
  console.error("CSRF Issue");
}
```

## Bootstrap SCSS

There are no major changes for compiling SCSS. My app.scss file looks like

```scss
@import "./variables";
@import "../../node_modules/bootstrap/scss/bootstrap";
```

## Accessing the files in blade

```html
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @vite('resources/sass/vendor.scss')
</head>
<body>
    <!-- all the content -->
    @vite('resources/js/vendor.js')
    @vite('resources/js/app.js')
</body>
```

## Building for production

When building for production using ```npm run build``` you need to change the Vue import.

```js
import vue from 'vue/dist/vue.common.js';
window.Vue = vue;

# other contents
```

You should use vue.common.js instead of vue.js.
