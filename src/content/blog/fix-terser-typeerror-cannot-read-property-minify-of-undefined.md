---
title: "Fix Terser TypeError: Cannot read property ‘minify’ of undefined"
description: "How we wrap our head around the unknown"
publishedDate: "Feb 10 2019"
updatedDate: "Feb 10 2019"
isFeatured: true
tags: ['Laravel', 'Laravel Mix','NPM']
heroImage:
    url: ""
    alt: ""
---
If you are using Laravel mix to compile your assets, after updating mix to the latest version you would have encountered this TypeError while running npm run production.

Install the Terser package and everything will be fine as always.

``````
npm i terser@3.14
``````

