---
title: "Formatting dates in Javscript"
description: "Code snippets to format date in different ways."
publishedDate: "Mar 15 2025"
updatedDate: "Mar 15 2025"
isFeatured: false
tags: ['code', 'javascript']
heroImage:
    url: ""
    alt: ""
---


15 Mar 2025

```js
formatDate(date) {
    const newDate = new Date(date);

    return newDate.toLocaleDateString("en-In", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}
```

15/3/2025

```js
formatDate(date) {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat('en-In').format(newDate);
}
```

15-03-2025

```js
formatDate(date) {
    const newDate = new Date(date);
    const day = String(newDate.getDate()).padStart(2, "0"); // Ensure two digits
    const month = String(newDate.getMonth() + 1).padStart(2, "0"); // JS months are 0-based
    const year = newDate.getFullYear();

    return `${day}-${month}-${year}`;
}
```