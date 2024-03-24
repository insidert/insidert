---
title: "Route Group in Laravel"
description: "Chain attributes in route group"
publishedDate: "Mar 22 2019"
updatedDate: "Mar 22 2019"
isFeatured: false
tags: ['laravel', 'code']
heroImage:
    url: ""
    alt: ""
---

An example has not been documented about laravel route grouping. You can chain attributes in an array like this.

```php
Route::group([
  'middleware' => ['admin'],
  'as' => 'admin.',
  'namespace' => 'Admin',
  'prefix' => 'admin'
], function () {
  Route::get('/', 'DashboardController@index')->name('dashboard');
});
```

