---
title: "Add Boostrap to Astro site"
description: "Guide on adding Bootstrap framework and customizing it in Astro"
publishedDate: "Sep 20 2024"
updatedDate: "Sep 20 2024"
isFeatured: false
tags: ['code', 'bootstrap']
heroImage:
    url: ""
    alt: ""
---

Install the dependencies

```bash
npm install sass

npm install bootstrap@5.3.3
```

Add vite configuration in *astro.config.mjs* file

```js
export default defineConfig({
  vite: {
    css: {
      transformer: "scss",
    },
  },
});
```

Add a variables file to overwrite variables. Especially Bootstrap themeing. Create a file inside ```src > styles > _variables.scss```

```scss
// _variables.scss

$blue:    #0a1630 ;

// And other variables here.
```

Add an index file inside src directory. ```src > styles > index.scss``` 

This is the main file which compiles the SASS.


```scss

// index.scss

@import "../../node_modules/bootstrap/scss/_functions.scss";
@import "./_variables.scss";
@import "../../node_modules/bootstrap/scss/bootstrap.scss";
```

Now import this style sheet in the Astro component

```js
// Layout.astro

---
import "../styles/index.scss";

interface Props {
	title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="en">
// other html
```





