---
title: "Send custom JSON error response in Laravel"
description: "Comes handy when dealing with ajax requests."
publishedDate: "Aug 14 2023"
updatedDate: "Mar 22 2019"
isFeatured: false
tags: ['laravel', 'code']
heroImage:
    url: ""
    alt: ""
---

Instead of using a validator, you can send custom JSON error responses in Laravel. If you are using axios library, the catch() method will grab the response.

```php
if ($some_check_here) {
  return response()->json([
    'errors' => [
      'contact_type' => [
         'You must give either valid email or phone number'
      ]
    ]
  ], 422);
}
```
