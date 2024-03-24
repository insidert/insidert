---
title: "Setting up a Laravel project on Windows with XAMPP"
description: "Step-by-step guide on how to setup XAMPP for your PHP and Laravel applications."
publishedDate: "May 3 2017"
updatedDate: "May 3 2017"
isFeatured: false
tags: ['php', 'laravel', 'xampp', 'code']
heroImage:
    url: ""
    alt: ""
---
- [Download and install](#download-and-install)
- [GIT and Node](#git-and-node)
- [Composer](#composer)
- [Checking GIT, Node and Composer](#checking-git-node-and-composer)
- [Laravel Installer](#laravel-installer)
- [Making up the project](#making-up-the-project)
- [Laravel Mix for Front-end](#laravel-mix-for-front-end)
- [Virtual Host](#virtual-host)

## Download and install

[Download XAMPP](https://www.apachefriends.org/index.html) and install.

After installation set a password for root user in MySql Database. Start Apache, MySql in XAMPP control panel, open Shell from the right menu and execute the following

```bash
mysqladmin.exe -u root password your_new_password
```

Go to XAMPP directory > phpMyAdmin and open the config.inc.php file. Add your new password in the configuration settings.

```bash
$cfg['Servers'][$i]['user'] = 'root';
$cfg['Servers'][$i]['password'] = 'your_new_password';
```

Restart XAMPP and you have successfully setup.

## GIT and Node

Download and install the latest versions of Git, Node.

You can skip installing both of them for later if you want.

Psst, If you want to update any of them, uninstall the older version, download the newer version and install again.

## Composer
It’s our dependency manager. Get the .exe file from the official site.

Run the installer and in midway it asks for php.exe path. Browse for Xampp > Php > php.exe and we are done. After installing, it prompts three steps to follow. Do it and we have setup Composer too.

## Checking GIT, Node and Composer

Let’s check whether everything has been installed correctly. Right click anywhere on the desktop/ File explorer, open Git Bash. Type the following commands

```bash
git --version
node -v
npm -v
composer
```

## Laravel Installer

Go to XAMPP > htdocs
Right click > Git bash here.

You need Laravel installer to create a new Laravel project. You need to run the following command only once.

```bash
composer global require "laravel/installer"
```

After installing, you can create a fresh project using the following command.

```bash
Laravel new your_project_name
```

You can see a new directory your_project_name in htdocs.
Move into the project folder and open git bash again there.
Let’s make up the project.

## Making up the project
- Install the project dependencies
- Run the following command to install the dependencies in composer.json file.

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
On XAMPP
Let’s setup or Dev virtual host.

Go to F:\xampp\apache\conf\extra and open httpd-vhosts.conf file and add the following lines. You need to change Document Root and Servername ( also the logs if needed.)

```xml
<VirtualHost *:80>
##ServerAdmin webmaster@dummy-host2.example.com
DocumentRoot "F:/xampp/htdocs/your_new_project/public"
ServerName newproject.dev
##ErrorLog "logs/dummy-host2.example.com-error.log"
##CustomLog "logs/dummy-host2.example.com-access.log" common
</VirtualHost>
```

Open notepad with Administrator rights.

Open the file C:\Windows\System32\drivers\etc and open hosts file and add your Servername.

```bash
# localhost name resolution is handled within DNS itself.
# 127.0.0.1       localhost
# ::1             localhost
127.0.0.1       newproject.dev
```

Remember to restart Apache every time you change XAMPP configuration settings or .env file settings.
