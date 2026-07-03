---
title: "How to send local file to server"
description: "Use this command to send local file to your remote server."
publishedDate: "Mar 6 2025"
updatedDate: "Mar 6 2025"
isFeatured: false
tags: ['code', 'how-to', 'server']
heroImage:
    url: ""
    alt: ""
---

The easiest way to send local file to server is to use *scp* protocol.

This is the command.

```scp -r -O local_file user@ip:/home/user```

Remember always to send the file to ssh user directory. From there you can move around the file.