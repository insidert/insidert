---
title: "Get all Enum items"
description: "A simple code to add in Enum file"
publishedDate: "Jul 7 2026"
updatedDate: "Jul 7 2026"
isFeatured: false
tags: ['code', 'php']
heroImage:
    url: ""
    alt: ""
---

To get all the Enum items in an array, add this little function in the Enum file.

```php
// Assume the Enum is about brands

public static function getAllItems(): array {
    return array_map(fn($brand) => $brand->value, self::cases());
}
```
