---
title: "Setting up a Laravel project on Windows with XAMPP / WAMP."
description: "How we wrap our head around the unknown"
publishedDate: "May 3 2017"
updatedDate: "May 3 2017"
isFeatured: false
tags: ['PHP', 'Laravel','Xampp']
heroImage:
    url: ""
    alt: ""
---
Using XAMPP

Download XAMPP here and install.

After installation set a password for root user in MySql Database. Start Apache, MySql in XAMPP control panel, open Shell from the right menu and execute the following

``````
mysqladmin.exe -u root password your_new_password

``````

Go to XAMPP directory > phpMyAdmin and open the config.inc.php file. Add your new password in the configuration settings.

``````
$cfg['Servers'][$i]['user'] = 'root';
$cfg['Servers'][$i]['password'] = 'your_new_password';

``````
Restart XAMPP and you have successfully setup.

Using WAMP Server

1.Make sure you have all required (2010, 2012, 2013, 2017) C++ redistributables before installing WAMP server.

2.Download WAMP server and install.

3.Open localhost in the browser and you can see Wamp Server dashboard.

Create a new Database

Go to localhost/phpmyadmin in the browser or click Admin button of MySQL module and create a new Database.

GIT and Node

Download and install the latest versions of Git, Node.

You can skip installing both of them for later if you want.

Psst, If you want to update any of them, uninstall the older version, download the newer version and install again.

Composer
It’s our dependency manager. Get the .exe file from the official site.

Run the installer and in midway it asks for php.exe path. Browse for Xampp > Php > php.exe and we are done. After installing, it prompts three steps to follow. Do it and we have setup Composer too.

Checking GIT, Node and Composer

Let’s check whether everything has been installed correctly. Right click anywhere on the desktop/ File explorer, open Git Bash. Type the following commands

``````
git --version
node -v
npm -v
composer

``````
Laravel Installer
Go to XAMPP > htdocs. Or Go to Wamp64 > www.
Right click> Git bash here.

You need Laravel installer to create a new Laravel project. You need to run the following command only once.

``````
composer global require "laravel/installer"

``````
After installing, you can create a fresh project using the following command.

``````
Laravel new your_project_name
``````

You can see a new directory your_project_name in htdocs or www folder.
Move into the project folder and open git bash again there.
Let’s make up the project.

Making up the project
Install the project dependencies
Run the following command to install the dependencies in composer.json file.

``````
composer install
``````
Check whether the project has .env file. If not, rename .env.example to .env

``````
Change the DB settings in the .env file
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=root
DB_PASSWORD=your_new_password
``````
Laravel Mix for Front-end

You can change your front-end dependencies in package.json file.

``````
npm install
npm install --no-bin-links

``````
Virtual Host
On XAMPP
Let’s setup or Dev virtual host.

Go to F:\xampp\apache\conf\extra and open httpd-vhosts.conf file and add the following lines. You need to change Document Root and Servername ( also the logs if needed.)

``````
<VirtualHost *:80>
##ServerAdmin webmaster@dummy-host2.example.com
DocumentRoot "F:/xampp/htdocs/your_new_project/public"
ServerName newproject.dev
##ErrorLog "logs/dummy-host2.example.com-error.log"
##CustomLog "logs/dummy-host2.example.com-access.log" common
</VirtualHost>

``````
Open notepad with Administrator rights.

Open the file C:\Windows\System32\drivers\etc and open hosts file and add your Servername.

``````
# localhost name resolution is handled within DNS itself.
# 127.0.0.1       localhost
# ::1             localhost
 127.0.0.1       newproject.dev

``````
Remember to restart Apache every time you change XAMPP configuration settings or .env file settings.

On Wamp

1.Go to localhost and you can see Add a virtual host option under tools. Click on it.

2.Give the host name, Eg: medium.lc, medium.local, medium.wip. Don’t use .dev

3.Give the path of our project folder. eg: wamp64/www/medium/public

4.Click on start creating virtual host and you are done.

I personally prefer Wamp server as I can add newer PHP and MySQL versions easy.



