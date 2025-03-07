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

Before adding the symlink, get familiar with your folder structure in shared hosting. 

I keep the laravel app in a separate folder and the public contents inside public_html folder.

Assume the laravel app folde is my-project. The folders will look like this.

/root/my-project
/root/public_html

To add the symlink, the easiest way is to create a new file call symlink.php and keep it inside public_html folder.

First find what's the document root. You can do that by echoing ```$_SERVER['DOCUMENT_ROOT']```

Once you find the document root, add target folder and link folder like in the code below.

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

