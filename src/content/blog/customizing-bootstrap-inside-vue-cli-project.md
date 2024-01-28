---
title: "Guide to customizing Bootstrap framework inside Vue-CLI project"
description: "A simple step-by-step tutorial to setup SASS and customize the framework."
publishedDate: "Dec 24 2018"
updatedDate: "Dec 24 2018"
isFeatured: false
tags: ['Sass', 'Vuejs','Bootstrap']
heroImage:
    url: ""
    alt: ""
---

- Select SCSS pre-processor while creating the project.
- Create styles inside the *src* directory.
- Create *styles > _variables.scss* file and copy all the contents from ```node_modules/bootstrap/scss/_variables.scss``` file.
- Create *styles > custom-bootstrap.scss* file and copy the following

```scss
// Make sure the functions come before custom variables 
@import "../node_modules/bootstrap/scss/functions";
// Our custom variables file
@import "./variables";
// The bootstrap file that compiles the CSS
@import "../node_modules/bootstrap/scss/bootstrap";
```

Inside app.vue
We call the custom-bootstrap.scss file we created before.

```vue
// app.vue 
<style lang="scss">
@import "./scss/custom-bootstrap";
</style>
```

This will compile our bootstrap file when we build or serve the app.

Accessing variables across the components
We may need colour variables inside our components. We can manually call functions and variables file.

```scss
// Manually accessing 
<style lang="scss">
@import "../node_modules/bootstrap/scss/functions";
@import "./scss/variables";
#some-element {
   background-color: $blue;
}
</style>

```

Or we can globally register the dependencies: create vue.config.js in the root directory and add the following

```js
// vue.config.js
module.exports = {
 css: {
  loaderOptions: {
   sass: {
    data: `
     @import "./node_modules/bootstrap/scss/_functions.scss";
     @import "@/scss/_variables.scss";
    `
   }
  }
 }
};

```

npm run serve.

