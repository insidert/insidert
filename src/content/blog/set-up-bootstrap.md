---
title: "Setting up Bootstrap, Vue SFC in Laravel 9+ using Vite"
description: "How we wrap our head around the unknown"
publishedDate: "Feb 13 2022"
updatedDate: "Feb 13 2022"
isFeatured: false
tags: ['Laravel', 'Vitejs','Bootstrap','Scss','Vuejs']
heroImage:
    url: ""
    alt: ""
---
If you are starting with Laravel 9, you need to manually setup the Vue Single file components and Bootstrap as follows.

The installations
Before installing the new dependencies, remove the node_modules folder by doing rm -rf node_mouldes from git bash inside your project folder.

Update Laravel vite plugin to its latest version, as of this writing, this is how I changed my package.json entry

```"laravel-vite-plugin": "^0.7.4"```

After this, do npm install and then install the following

```
npm install --save-dev @vitejs/plugin-vue

npm install --save-dev sass

npm install bootstrap@5.3.0-alpha1
```
Next change app.js file to the following:
```
import './bootstrap';

import { createApp } from "vue/dist/vue.esm-bundler";

// Import all your components here.
import RegistrationType from './components/RegistrationType.vue';

const app = createApp({
  components: {
    RegistrationType
 }
});

app.mount('#app')
```
To customize Bootstrap, create a folder scss inside resources and create a file app.scss
``````
@import "../../node_modules/bootstrap/scss/functions";
@import "./variables";
@import "../../node_modules/bootstrap/scss/bootstrap.scss";
``````
The variables file is your custom changes for Bootstrap.

You are done setting up at this point and all you need is to import them in your blade files.

Just do:
``````
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My App</title>
    @vite('resources/scss/app.scss')

  </head>
<body>

<!-- your code -->

 @vite('resources/js/app.js')
</body>
</html>
``````
You can do them in one-line as explained the docs. I like adding them at difference sections, so I added scss file in the head and js at the bottom.