---
title: "Fix pod install and update for Flutter on iOS, M1 mac."
description: "Install pod dependencies"
publishedDate: "May 27 2022"
updatedDate: "May 27 2022"
isFeatured: false
tags: ['IOS', 'Flutter']
heroImage:
    url: ""
    alt: ""
---

Use the below command to install pod dependencies if you are on Mac M1 chips.

Inside your flutter project, ```cd ios```

And run

```arch -x86_64 pod install ```
