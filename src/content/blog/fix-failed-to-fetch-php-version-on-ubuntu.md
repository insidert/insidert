---
title: "Fix failed to fetch new php version on your Ubuntu OS"
description: "Step-by-step guide to fix installing new PHP version."
publishedDate: "Jan 04 2026"
updatedDate: "Jan 04 2026"
isFeatured: false
tags: ['code', 'ubuntu']
heroImage:
    url: ""
    alt: ""
---

When trying to update php on the server if you get the message that new php is failed to fetch from ppa repo, [follow the link](https://askubuntu.com/questions/1512754/i-could-not-install-php8-3-on-my-ubuntu-22-04-wrong-ppa-path).

The steps as per the answer in the link

```
sudo add-apt-repository --remove ppa:ondrej/php

sudo apt update

sudo apt install distro-info-data python3-update-manager update-manager update-manager-core

sudo apt upgrade

sudo add-apt-repository ppa:ondrej/php

sudo apt update
```