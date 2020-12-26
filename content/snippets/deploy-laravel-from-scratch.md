---
title: "Deploy laravel to VPS from scratch"
excerpt: "A step by step guide to deploying Laravel app to Vultr or Digital Ocean."
updatedOn: "2020-12-22"
imageUrl: ""
tags: ["servers", "laravel"]
---

This post is a collection of commands that helped me setup Laravel in a VPS. I have written this for myself to just copy and past the commands directly so that I don't have to go to individual resources. Most of the resources are from [serversforhackers.com](https://serversforhackers.com/) by [Chris Fidao.](https://twitter.com/fideloper)

- [Add a user](#add-a-user)
- [Setup SSH](#setup-ssh)
- [Install PHP](#install-php)
- [Install Composer](#install-composer)
- [Install Nginx](#install-nginx)
- [Set permissions](#set-permissions)
- [Setup MySQL](#setup-mysql)
- [Setup Redis](#setup-redis)
- [Setup Supervisor for Queues](#setup-supervisor-for-queues)
- [Setup Cron for Scheduled jobs](#setup-cron-for-scheduled-jobs)
- [SSL Certificate](#ssl-certificate)

## Add a user

After logging in as root, add a new user and add to sudo group.

```bash
sudo adduser raviteja

usermod -aG sudo raviteja
```

- [Video](https://serversforhackers.com/c/creating-users-and-ssh-security)

## Setup SSH

```bash
cd ~/.ssh
ssh-keygen -o -a 100 -t ed25519 -f id_some_identifier
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

sudo apt install php php-cli php-fpm php-mysql php-zip php-gd php-mbstring php-curl php-xml php-pear php-bcmath php-mcrypt php-mbstring php-xml
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

Change config at */etc/nginx/sites-available/default*

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
    try_files $uri $uri/ /index.php$is_args$args;
  }

  location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php/php7.3-fpm.sock;
  }

  location ~* (?:^|/)\. {
    deny all;
  }

  location ^~ /.well-known/acme-challenge/ {
    allow all;
  }
}
```

- Nginx setup in [Laravel docs](https://laravel.com/docs/8.x/deployment#nginx)

## Set permissions

```bash
ps aux | grep php

cd /var/www/thelaravelappfolder
sudo chown -R www-data: storage bootstrap
```

If that does not work, try this.

```bash
chown -R {username}:www-data {laravel-folder}
chmod -R 777 {laravel-folder}/storage
chmod -R 777 {laravel-folder}/bootstrap/cache/
```

If that does not work too, try

```bash
find /path/to/your/root/dir/ -type f -exec chmod 644 {} \;
find /path/to/your/root/dir/ -type d -exec chmod 755 {} \;

chown -R www-data:www-data /path/to/your/root/dir/

chgrp -R www-data storage bootstrap/cache
chmod -R ug+rwx storage bootstrap/cache
```

## Setup MySQL

```bash
sudo apt-get install -y mysql-server 

sudo mysql_secure_installation

create database yourdatabase

create user databaseclient@'localhost' identified by 'a-password';

grant all privileges on yourdatabase.* to databaseclient@'localhost';
```

Import/Export database 

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
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/thelaravelfolder/artisan queue:work redis --tries=1 --max-time=3600
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
```

## Setup Cron for Scheduled jobs

```bash
crontab -e

* * * * * cd /var/www/laravelfolder && php artisan schedule:run >> /dev/null 2>&1
```

## SSL Certificate

Install certbot from the [official website.](https://certbot.eff.org/)

```bash
sudo certbot certonly 
  --webroot -w /var/www/yourlaravelproject/public 
  -d thedomain.com 
  --non-interactive 
  --agree-tos 
  --email raviteja@thedomain.com 
  --force-renew
```