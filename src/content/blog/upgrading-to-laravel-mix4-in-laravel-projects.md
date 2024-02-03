---
title: "Upgrading to Laravel Mix 4 in Laravel Projects"
description: "How we wrap our head around the unknown"
publishedDate: "Dec 19 2018"
updatedDate: "Dec 19 2018"
isFeatured: false
tags: ['javascript', 'Laravel','Vuejs','Laravel Mix']
heroImage:
    url: ""
    alt: ""
---
You may run into issues while upgrading to Laravel Mix 4 in your Laravel projects. Here are a few things to make the upgrade easy.

.Remove node_modules

.Change the laravel-mix version to 4.0.7 in package.json file.

.If you are using vue, update vue and vue-template-compiler to newer versions (2.5.21 — as of this writing.) Make sure they both have Same versions.

.Update components in app.js file to have .default method.

``````
// Old
Vue.component('example-component', require('./components/ExampleComponent.vue'));
// New
Vue.component('example-component', require('./components/ExampleComponent.vue').default)

``````
.Npm install
