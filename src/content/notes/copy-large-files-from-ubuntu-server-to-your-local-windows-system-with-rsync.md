---
title: "Copy large files from Ubuntu Server to your local Windows system with rsync."
description: "The simplest way to download files from the server to your local system"
publishedDate: "Dec 19 2021"
updatedDate: "Dec 19 2021"
isFeatured: false
tags: ['ubuntu', 'windows', 'rsync', 'tooling', 'code']
heroImage:
    url: ""
    alt: ""
---

There will be times where you need to backup large files from Ubuntu server to your local windows system. 

Rsync is a great way to do it and here are the steps. If you are familiar with scp, you can use rsync with ease. The following steps are only installation process.

1. Install rsync inside your Ubuntu server ```sudo apt install rsync```
2. Download Cygwin for windows from [Cygwin website.](https://www.cygwin.com/)
3. Install Cygwin from .exe file.
4. When asked for the packages to install, we need to install two packages. When prompted with the packages window, search the two packages at the top.

Package 1: **Rsync**

1. Search for rsync and hit enter.
2. You will get all the packges related to rsync. You will see net packages in the list. Click on that and open the dropdown. You need to select a version to install.

Package 2: **openssh**

1. Search for openssh and hit enter.
2. You will get all the packges related to openssh. Select openssh & openssh-debug by clicking the version from the dropdown.

Click next and both of these packages will be installed. You will see a terminal shortcut on your desktop.

Once installed, open the cgywin terminal and start copying the files/folder

```bash
rsync 
    user@1.2.3.4:/the/directory/to/copy/from 
    /cygdrive/f/the/folder/inside/the/f/drive/in/windows
```

This command copies the from folder — from remote server connected via ssh — in the Ubuntu server to the windows folder in your local system.

Remember, to add the windows folder we need to start with ```/cygdrive/```

Reference links:

- [Rsync commands and usage](https://linuxize.com/post/how-to-use-rsync-for-local-and-remote-data-transfer-and-synchronization/)
- Installation and using rsync terminal — [YouTube video](https://www.youtube.com/watch?v=PWCCJJ0i1ec)
