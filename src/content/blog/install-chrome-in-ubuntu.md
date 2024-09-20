---
title: "Install chrome in Ubuntu"
description: "Simple guide to installing chrome on Ubuntu systems"
publishedDate: "Jul 29 2024"
updatedDate: "Jul 29 2024"
isFeatured: false
tags: ['code', 'ubuntu']
heroImage:
    url: ""
    alt: ""
---

I wanted to use headless chrome for generating pdfs from Laravel apps. Open source chromium-browser was straight forward. But it has issues with snap. So installing chrome rather than chromium-browser is the best choice. 

```bash
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
```

Then install it

```
sudo apt install ./google-chrome-stable_current_amd64.deb
```

Sometimes the chrome will be terminated and may not work as expected. In that case, reinstalling will clear the issue.