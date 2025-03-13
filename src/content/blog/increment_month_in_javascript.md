---
title: "Increment month in Javascript"
description: "You do not have to miss this edge case."
publishedDate: "Mar 13 2025"
updatedDate: "Mar 13 2025"
isFeatured: false
tags: ['code', 'javascript']
heroImage:
    url: ""
    alt: ""
---

The easy way to increment month in Javascript is this

```js
const month = current.toLocaleString("default", { month: "short" });

const year = current.getFullYear();

current.setMonth(current.getMonth() + 1);
```

This works in most cases except for dates that fall after 27. 

This method just increments the month along with date. So if you are increments Jan 30, It will go to march. Because there is no Feb 30.

The safe way is to set day to 1 if you are not concerned about the day. The modified version is this

```js
const month = current.toLocaleString("default", { month: "short" });

const year = current.getFullYear();

current.setDate(1); 

current.setMonth(current.getMonth() + 1);
```