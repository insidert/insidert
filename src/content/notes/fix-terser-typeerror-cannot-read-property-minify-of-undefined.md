---
title: "Fix Terser TypeError: Cannot read property ‘minify’ of undefined"
description: "Simple fix."
publishedDate: "Feb 10 2019"
updatedDate: "Feb 10 2019"
isFeatured: false
tags: ['laravel', 'npm', 'code']
heroImage:
    url: ""
    alt: ""
---

If you are using Laravel mix to compile your assets, after updating mix to the latest version you would have encountered this TypeError while running npm run production.

Install the Terser package and everything will be fine like always.

```bash
npm i terser@3.14
```

