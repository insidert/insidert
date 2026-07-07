---
title: "Fix wrong PPA path on Ubuntu"
description: "If you are trying to update the PHP and get this wrong PPA path, this is the fix"
publishedDate: "Jul 7 2026"
updatedDate: "Jul 7 2026"
isFeatured: false
tags: ['ubuntu', 'server']
heroImage:
    url: ""
    alt: ""
---

The below answer is by [Eyoung100](https://askubuntu.com/users/267913/eyoung100)

```bash
# Remove the offending PPA 
sudo add-apt-repository --remove ppa:ondrej/php

# Resync all repositories 
sudo apt update

# Upgrade held packages 
sudo apt install distro-info-data python3-update-manager update-manager update-manager-core

# Now upgrade 
sudo apt upgrade

# Reinstall the PPA 
sudo add-apt-repository ppa:ondrej/php

# Resync the repositories again 
sudo apt update
```

Reference Link: https://askubuntu.com/questions/1512754/i-could-not-install-php8-3-on-my-ubuntu-22-04-wrong-ppa-path