---
title: "Route Group"
description: "How we wrap our head around the unknown"
publishedDate: "Mar 22 2019"
updatedDate: "Mar 22 2019"
isFeatured: true
tags: ['Laravel']
heroImage:
    url: ""
    alt: ""
---
An example has not been documented about laravel route grouping. You can chain attributes in an array like this.

``````
Route::group([
  'middleware' => ['admin'],
  'as' => 'admin.',
  'namespace' => 'Admin',
  'prefix' => 'admin'
], function () {
  Route::get('/', 'DashboardController@index')->name('dashboard');
});

``````

