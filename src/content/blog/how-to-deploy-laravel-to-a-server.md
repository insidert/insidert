---
title: "How to deploy Laravel application to a server"
description: "Step-by-step guide about creating a virtual private server and the setup."
publishedDate: "Jun 2 2023"
updatedDate: "Jun 2 2023"
isFeatured: false
tags: ['code', 'how-to']
heroImage:
    url: ""
    alt: ""
---

This is a step-by-step guide to setup your Laravel application on Vultr or Digital Ocean. 

First you need to select a server in one of the service providers.

This post is a collection of commands that helped me setup Laravel in a VPS. I have written this for myself to just copy and past the commands directly so that I don't have to go to individual resources. Most of the resources are from [serversforhackers.com](https://serversforhackers.com/) by [Chris Fidao.](https://twitter.com/fideloper)

- [Add a user](#add-a-user)
- [Setup SSH](#setup-ssh)
- [Install PHP](#install-php)
- [Install Composer](#install-composer)
- [Install Nginx](#install-nginx)
- [Setup Git](#setup-git)
- [Set permissions](#set-permissions)
- [Setup MySQL](#setup-mysql)
- [Import/Export database](#importexport-database)
- [Setup Redis](#setup-redis)
- [Setup Supervisor for Queues](#setup-supervisor-for-queues)
- [Setup Cron for Scheduled jobs](#setup-cron-for-scheduled-jobs)
- [SSL Certificate](#ssl-certificate)
- [Storage Symlink](#storage-symlink)

## Add a user

After logging in as root, add a new user and add to sudo group.

```bash
sudo adduser raviteja

usermod -aG sudo raviteja
```

Run commands as the new user with sudo permissions.

```bash
sudo su raviteja
```

- [Video](https://serversforhackers.com/c/creating-users-and-ssh-security)

## Setup SSH

```bash
cd ~/.ssh
ssh-keygen -o -a 100 -t ed25519 -f id_some_identifier
```

Copy the public key

```bash
cat id_some_identifier.pub
```

On the server, add the public key.

```bash
sudo su raviteja
mkdir ~/.ssh
cd ~/.ssh
nano authorized_keys
```

- [Video](https://serversforhackers.com/s/ssh-usage-tips-and-tricks)

## Install PHP

Installs the latest version if you have not added PPA package.

```bash
sudo apt-get install git curl wget zip unzip

sudo add-apt-repository -y ppa:ondrej/php

sudo apt-get update

sudo apt-get install -y php8.0-fpm php8.0-cli php8.0-mysql \
  php8.0-mcrypt php8.0-gd php8.0-imap php8.0-curl \
  php8.0-mbstring php8.0-xml php8.0-bcmath php8.0-zip
```

- [Video](https://serversforhackers.com/c/lemp-nginx-php-laravel)

## Install Composer

```bash
php -r "readfile('http://getcomposer.org/installer');" | sudo php -- --install-dir=/usr/bin/ --filename=composer
```

## Install Nginx

```bash
sudo apt-get install nginx
```

Allow Nginx in firewall

```bash
sudo ufw app list

sudo ufw allow 'nginx full'

sudo ufw reload
```

Change nginx config

```bash
sudo nano /etc/nginx/sites-available/default
```

We should add ssl_certificate details in the config only after installing ssl certificate with certbot.

```bash
server {
  listen 80 default_server;

  server_name thedomain.in www.thedomain.in;
  return 301 https://thedomain.in$request_uri;
}

server {
  listen 443 ssl default_server;

  ssl_certificate      /etc/letsencrypt/live/<thedomain.in>/fullchain.pem;
  ssl_certificate_key  /etc/letsencrypt/live/<thedomain.in>/privkey.pem;

  root /var/www/ourprojectfolder/public;

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

Test the configuration

```bash
sudo nginx -t

sudo systemctl reload nginx
```

- Nginx setup in [Laravel docs](https://laravel.com/docs/8.x/deployment#nginx)

## Setup Git

```bash
cd /var

sudo mkdir repo && cd repo

sudo mkdir site.git && cd site.git

sudo git init --bare
```

Setup post-receive hoook

```bash
cd /var/repo/site.git/hooks

sudo nano post-receive
```

Add the contents to the post-recieve file

```bash
#!/bin/sh
git --work-tree=/var/www/laravel --git-dir=/var/repo/site.git checkout -f
```

Change the permission

```bash
sudo chmod +x post-receive
```

Change the ownership for the current user

```bash
cd /var/repo

sudo chown -R raviteja site.git
```

On your local system, inside your Laravel project

```bash
git remote add production ssh://raviteja@example.com/var/repo/site.git

git push production master
```

If you are using main branch locally, do ```git push production main:master```

- [Dev Marketer Post](https://devmarketer.io/learn/deploy-laravel-5-app-lemp-stack-ubuntu-nginx/)

## Set permissions

```bash
ps aux | grep php

cd /var/www/thelaravelappfolder

sudo chown -R www-data:raviteja storage bootstrap
```

## Setup MySQL

```bash
sudo apt-get install -y mysql-server

create database yourdatabase

create user databaseclient@'localhost' identified by 'a-password';

grant all privileges on yourdatabase.* to databaseclient@'localhost';
```

## Import/Export database

```bash
// Export
mysqldump -u databaseclient -p yourdatabase | gzip > the_database_file_name.sql.gz

// Import
gunzip < 20122020_b.sql.gz | mysql -u databaseclient -p yourdatabase
```

## Setup Redis

```bash
sudo apt-get install redis-server

redis-cli ping
```

## Setup Supervisor for Queues

[Supervisor docs.](https://laravel.com/docs/8.x/queues#supervisor-configuration)

```bash
sudo apt-get install supervisor
```

Create new file *laravel-worker.conf* inside */etc/supervisor/conf.d* directory.

```bash
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/thelaravelfolder/artisan queue:work redis --tries=1 --timeout=3600 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=raviteja
numprocs=8
redirect_stderr=true
stdout_logfile=/home/raviteja/thelaravelfolder/worker.log
stopwaitsecs=3600
```

Make this directory */home/raviteja/thelaravelfolder/* for the log.

Start supervisor

```bash
sudo supervisorctl reread

sudo supervisorctl update

sudo supervisorctl start laravel-worker:*

sudo supervisorctl status
```

For timeout function to work on the queues, pcntl extension should be enabled.

```bash
php -i | grep pcntl
```

## Setup Cron for Scheduled jobs

```bash
crontab -e

* * * * * cd /var/www/laravelfolder && php artisan schedule:run >> /dev/null 2>&1
```

## SSL Certificate

```bash
sudo snap install core; sudo snap refresh core

sudo snap install --classic certbot

sudo ln -s /snap/bin/certbot /usr/bin/certbot

sudo certbot --nginx

// testing to renew
sudo certbot renew --dry-run
```

More instructions on the [official website.](https://certbot.eff.org/)

## Storage Symlink

```
php artisan storage:link
```