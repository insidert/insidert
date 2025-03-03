---
title: "How to add Laravel symlink in shared hosting"
description: "Use this simple script to add symlink easily."
publishedDate: "Mar 3 2025"
updatedDate: "Mar 3 2025"
isFeatured: false
tags: ['code', 'how-to', 'laravel', 'server']
heroImage:
    url: ""
    alt: ""
---

Before adding the symlink, get familiar with your folder structure in shared hosting. If your laravel app is inside a folder. like /root/laravel_app

```php
<?php

// echo $_SERVER['DOCUMENT_ROOT'];
// return '/home/someuser234/domains/domain.com/public_html/';

$targetFolder = '/home/someuser234/domains/domain.com/maarifaa/storage/app/public';

$linkFolder = '/home/someuser234/domains/domain.com/public_html/storage';

$s = symlink($targetFolder,$linkFolder);

echo $s;

echo 'Symlink completed';
```

