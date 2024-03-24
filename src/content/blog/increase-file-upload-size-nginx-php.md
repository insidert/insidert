---
title: "Increase file upload size in Nginx and PHP"
description: "Handle bigger file uploads."
publishedDate: "Mar 12 2024"
updatedDate: "Mar 12 2024"
isFeatured: false
tags: ['code', 'how-to', 'server']
heroImage:
    url: ""
    alt: ""
---

Change the nginx config file. 

```bash
sudo nano /etc/nginx/nginx.conf

# In the http block, add the max body size.
http {
    // other config
    client_max_body_size 100M;
}
```

Check the configuration.

```bash
sudo nginx -t
```

Change config in php.ini file

```bash
sudo nano /etc/php/8.2/fpm/php.ini

# Change the following lines 
upload_max_filesize = 100M  ; Maximum upload file size
post_max_size = 100M       ; Maximum size of POST data
```

Once it is done, restart the php-fpm

```bash
sudo systemctl restart php8.2-fpm
```

Replace php8.2 with the version you installed on your server.