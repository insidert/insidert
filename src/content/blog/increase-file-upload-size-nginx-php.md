---
title: "Increase file upload size in Nginx and PHP"
description: "Handle bigger file uploads."
publishedDate: "Mar 12 2023"
updatedDate: "Mar 12 2023"
isFeatured: false
tags: ['code', 'how-to']
heroImage:
    url: ""
    alt: ""
---

```bash

sudo nano /etc/nginx/nginx.conf

add

http {
    // other config
    client_max_body_size 100M;
}

sudo nginx -t

sudo nano /etc/php/8.2/fpm/php.ini

Change 
upload_max_filesize = 100M  ; Maximum upload file size
post_max_size = 100M       ; Maximum size of POST data

sudo systemctl restart php8.2-fpm

```
