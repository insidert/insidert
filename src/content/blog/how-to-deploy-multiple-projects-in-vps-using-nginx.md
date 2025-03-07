---
title: "How to deploy multiple projects in vps using nginx"
description: "Setup to use same server to host multiple projects."
publishedDate: "Mar 7 2025"
updatedDate: "Mar 7 2025"
isFeatured: false
tags: ['code', 'how-to', 'server', 'nginx']
heroImage:
    url: ""
    alt: ""
---

If you want to serve multiple projects from the same VPS (Vultr, Digital Ocean and others), this is the way to do.

Here are simple steps. (If you are working with laravel, Refer [Deploy laravel to VPS post](/blog/how-to-deploy-laravel-to-a-server/))

- Deploy you project files like you normally do. Put them inside */var/www/* folder.
- Go to /etc/nginx/sites-available and create separate config files for each project. 
- Inside the config, the server_name and the location of the project is important. 

**Project-1.conf** File
Make sure you remove *default_server* attribute. Keep the server_name your domain address.


```bash
server {
  listen 80;

  server_name thedomain.in www.thedomain.in;
  return 301 https://thedomain.in$request_uri;
}

server {
  listen 443 ssl;

  ssl_certificate      /etc/letsencrypt/live/<thedomain.in>/fullchain.pem;
  ssl_certificate_key  /etc/letsencrypt/live/<thedomain.in>/privkey.pem;

  root /var/www/project-1/public;

  index index.php;

  location / {
    try_files $uri $uri/ /index.php?$query_string;
  }

  location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
  }

  location ~* (?:^|/)\. {
    deny all;
  }

  location ^~ /.well-known/acme-challenge/ {
    allow all;
  }
}
```


**Project-2.conf** File
Make sure you remove *default_server* attribute. Keep the server_name your domain address.


```bash
server {
  listen 80;

  server_name anotherdomain.in www.anotherdomain.in;
  return 301 https://anotherdomain.in$request_uri;
}

server {
  listen 443 ssl;

  ssl_certificate      /etc/letsencrypt/live/<anotherdomain.in>/fullchain.pem;
  ssl_certificate_key  /etc/letsencrypt/live/<anotherdomain.in>/privkey.pem;

  root /var/www/project-2/public;

  index index.php;

  location / {
    try_files $uri $uri/ /index.php?$query_string;
  }

  location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
  }

  location ~* (?:^|/)\. {
    deny all;
  }

  location ^~ /.well-known/acme-challenge/ {
    allow all;
  }
}
```

- Go to sites-enabled folder inside */etc/nginx/sites-enabled* and create symlinks for each config file like this.

```
sudo ln -s /etc/nginx/sites-available/project-1.conf /etc/nginx/sites-enabled/project-1.conf 

sudo ln -s /etc/nginx/sites-available/project-2.conf /etc/nginx/sites-enabled/project-2.conf;
```

When done, test the configuration to see if everything went ok by running ```sudo nginx -t``` 

If the configs are correct, you will get a success messsage. Now restart nginx. ```sudo systemctl reload nginx```

Important point is that, always add ssl certs only after doing the above steps. In the meantime, comment the ssl cert command lines using #.