---
title: "Allow localhost traffic to LAN from apache."
description: "Allow localhost traffic."
publishedDate: "Jan 12 2026"
updatedDate: "Jan 12 2026"
isFeatured: false
tags: ['code', 'apache']
heroImage:
    url: ""
    alt: ""
---

To expose virtual host traffic to other LAN systems, we need to update the following rules in Apache vhosts file.

```
<VirtualHost *:80>
	ServerName project.local
	DocumentRoot "g:/wamp64/www/project/public"
	<Directory  "g:/wamp64/www/project/public/">
		Options +Indexes +Includes +FollowSymLinks +MultiViews
		AllowOverride All
		Require all granted
	</Directory>
</VirtualHost>
```