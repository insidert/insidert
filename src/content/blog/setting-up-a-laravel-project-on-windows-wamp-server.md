---
title: "Setting up a Laravel project on Windows with WAMP server"
description: "Step-by-step guide on how to setup WAMP Server for your PHP and Laravel applications."
publishedDate: "May 3 2017"
updatedDate: "May 3 2017"
isFeatured: false
tags: ['php', 'laravel', 'wamp', 'code']
heroImage:
    url: ""
    alt: ""
---

## Download and Install

1. Make sure you have all required (2010, 2012, 2013, 2017) C++ redistributables before installing WAMP server.
2. [Download WAMP server](http://www.wampserver.com/en/) and install.
3. Open localhost in the browser and you can see Wamp Server dashboard.

## Create a new Database

Go to localhost/phpmyadmin in the browser or click Admin button of MySQL module and create a new Database.

## GIT and Node

Download and install the latest versions of Git, Node.

You can skip installing both of them for later if you want.

Psst, If you want to update any of them, uninstall the older version, download the newer version and install again.

## Composer

It’s our dependency manager. Get the .exe file from the official site.

Run the installer and in midway it asks for php.exe path. Browse for Xampp > Php > php.exe and we are done. After installing, it prompts three steps to follow. Do it and we have setup Composer too.

Checking GIT, Node and Composer

Let’s check whether everything has been installed correctly. Right click anywhere on the desktop/ File explorer, open Git Bash. Type the following commands

```bash
git --version
node -v
npm -v
composer
```

## Laravel Installer

Go to Wamp64 > www.
Right click > Git bash here.

You need Laravel installer to create a new Laravel project. You need to run the following command only once.

```bash
composer global require "laravel/installer"
```

After installing, you can create a fresh project using the following command.

```bash
Laravel new your_project_name
```

You can see a new directory your_project_name in htdocs or www folder.
Move into the project folder and open git bash again there.
Let’s make up the project.

## Making up the project

Install the project dependencies
Run the following command to install the dependencies in composer.json file.

```bash
composer install
```

Check whether the project has .env file. If not, rename .env.example to .env

```bash
Change the DB settings in the .env file
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=root
DB_PASSWORD=your_new_password
```

## Laravel Mix for Front-end

You can change your front-end dependencies in package.json file.

```bash
npm install
npm install --no-bin-links
```

## Virtual Host

1. Go to ```http://localhost``` and you can see Add a virtual host option under tools. Click on it.
2. Give the host name, Eg: medium.lc, medium.local, medium.wip. Don’t use .dev
3. Give the path of our project folder. eg: D:/wamp64/www/projectdirectory/public
4. Click on start creating virtual host and you are done.

I personally prefer Wamp server as I can add newer PHP and MySQL versions easy.
