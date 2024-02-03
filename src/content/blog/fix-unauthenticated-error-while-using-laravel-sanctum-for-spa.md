---
title: "Fixing ‘unauthenticated error’ while using Laravel Sanctum for SPA."
description: "How we wrap our head around the unknown"
publishedDate: "Oct 29 2020"
updatedDate: "Oct 29 2020"
isFeatured: false
tags: ['Laravel', ';Laravel Sanctum']
heroImage:
    url: ""
    alt: ""
---
You may be working locally with the Laravel project; scaffolded a front-end app with React/Vue/Angular and when making requests to routes wrapped within auth:sanctum middleware, you may get an unauthenticated error. It is because of misconfigurations. Let’s fix this.

1.Make sure the laravel app is serving from localhost (127.0.0.1) by doing the good old php artisan serve. Do not use virtual hosts because you cannot serve the front-end apps from the same virtual host.

2.Check the port numbers of your front-end app. Usually, React app serves at http://localhost:3000 and Vue app serve from http://localhost:8080.

3.It is necessary for the front-end app(s) and the laravel app to serve from the same domain — localhost in our case.

4.Set sanctum stateful domains in .env file. These are the addresses of our front-end apps including the port numbers.
``````
SANCTUM_STATEFUL_DOMAINS=localhost:8080,127.0.0.1:8080,localhost:3000,127.0.0.1:3000
``````

Set session domain in .env file. You need to change this at production to your domain name.
``````
SESSION_DOMAIN=localhost
``````

.Set paths and supports_credentails in cors.php The routes of web.php you wish to have access to in your front-end app should be added to the paths array.
``````
'paths' => ['api/*', 'login', 'register', 'otp/*', 'sanctum/csrf-cookie'],
'supports_credentials' => true,
``````
.And finally, you should make requests from the front-end app to the localhost/api/other-route but not to 127.0.0.1/api/other-route using axios.

References

Official doccumentation.
Laracast video.


This post has been originally published on my blog. https://insidert.com/snippets/fixing-unauthenticated-error-while-using-laravel-sanctum-for-spa/
