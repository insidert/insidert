---
title: "Fix @php artisan package:discover — ansi handling the post-autoload-dump event returned with error code 255 error"
description: "Upgrading to Laravel 7"
publishedDate: "Mar 16 2020"
updatedDate: "Mar 16 2020"
isFeatured: false
tags: ['Laravel', 'Composer']
heroImage:
    url: ""
    alt: ""
---
You may encounter this error while upgrading to Laravel 7. Most of the things in the upgrade guide are very straight forward but the Exception handling section is what causes this issue mostly.

Your Exception.php file should be like this

```php
<?php
namespace App\Exceptions;

use Throwable;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
   // use Throwable - you should NOT import Throwable class as a trait here. You need to just import it above the class
   
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    public function render($request, Throwable $exception)
    {
        return parent::render($request, $exception);
    }
}

```