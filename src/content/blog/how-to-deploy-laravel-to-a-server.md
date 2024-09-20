---
title: "How to deploy Laravel application to a server"
description: "Step-by-step guide on deploying laravel application to a VPS."
publishedDate: "Jun 2 2023"
updatedDate: "Mar 1 2024"
isFeatured: true
tags: ['code', 'how-to', 'laravel', 'server']
heroImage:
    url: ""
    alt: ""
---

This is a step-by-step guide to setup your Laravel application on Vultr or Digital Ocean or any other VPS with root access. 

- [Selecting a server](#selecting-a-server)
- [Creating a server](#creating-a-server)
- [Login to your server](#login-to-your-server)
- [Add a user](#add-a-user)
- [Setup SSH for the new user](#setup-ssh-for-the-new-user)
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

## Selecting a server

First you need to select a server in one of the service providers. I deploy all my servers on Vultr. I have been using this service since 2017. [Get 100$ as signup bonus on Vultr.](https://www.vultr.com/?ref=9367505-8H)

Or you can use DigitalOcean. [Get 200$ as signup bonus on DigitalOcean.](https://m.do.co/c/84577e41997d)

*Important: The signup bonus expires after 2 months from signup. Be careful with the resources you create with them. If you are not careful you will charged accordingly after the bonus duration.*

This post is a collection of commands that helped me setup Laravel in a VPS. I have written this for myself to just copy and past the commands directly so that I don't have to go to individual resources. Most of the resources are from [serversforhackers.com](https://serversforhackers.com/) by [Chris Fidao.](https://twitter.com/fideloper)

## Creating a server

After creating an account on Vultr or DigitalOcean, you should select a server size based on your needs and opt to install Ubuntu.

Please choose Ubuntu LTS version. If it is not LTS version, it will be hard to update our softwares - like PHP - in future. 

## Login to your server

After creating a server, you will be given the IP address and login credentails for root user.

You will need an ssh client to log into your newly created server. I use Windows Terminal app. 

To login, do ```ssh root@192.168.0.1``` from your terminal app.

Replace 192.168.0.1 with the IP address of your server.

## Add a user

After logging in as root, add a new user and add to sudo group.

```bash
sudo adduser raviteja

usermod -aG sudo raviteja
```

From here on, run commands as the new user with sudo permissions.

```bash
sudo su raviteja
```

- [Video](https://serversforhackers.com/c/creating-users-and-ssh-security)

## Setup SSH for the new user

On your local machine, you need to create public and private keys. Run the below command from your local terminal to create the keys. All the keys should be in *.ssh* folder

```bash
cd ~/.ssh
ssh-keygen -o -a 100 -t ed25519 -f id_some_identifier
```

Copy the public key

```bash
cat id_some_identifier.pub
```

On the server, add the public key. First we need to create the directly and then paste the key in *authorized_keys* file.

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

sudo apt-get install -y php8.2-fpm php8.2-cli php8.2-mysql \
  php8.2-mcrypt php8.2-gd php8.2-imap php8.2-curl \
  php8.2-mbstring php8.2-xml php8.2-bcmath php8.2-zip
```

You can replace the version number if you are installing more latest versions.

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

**Note:** We should add ssl_certificate details in the config only after installing ssl certificate with certbot. You can also refer laravel docs to get the config details.

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

Test the configuration everytime you change the nginx configs.

```bash
sudo nginx -t

sudo systemctl reload nginx
```

- Nginx setup in [Laravel docs](https://laravel.com/docs/8.x/deployment#nginx)

## Setup Git

It would be easy to push directly from your local machine. There are many other ways to push your code to the server. This will act as your starting point.

On your server:

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

// This command will edit the nginx configuration
sudo certbot --nginx

// I use this command so that the nginx configuration is not edited
sudo certbot certonly --nginx

// testing to renew
sudo certbot renew --dry-run
```

More instructions on the [official website.](https://certbot.eff.org/)

## Storage Symlink

```
php artisan storage:link
```