---
title: "Guide for new coders"
description: "List of things to remember while coding as a beginner"
publishedDate: "May 30 2023"
updatedDate: "May 30 2023"
isFeatured: false
tags: ['code']
heroImage:
    url: ""
    alt: ""
---

The following guide is for beginners when working with me. Use them as reference while working and also read the comments in the code blocks to understand better. 

If you find something is missing or needs to be updated, open a PR on [Github.](https://github.com/insidert/insidert/pulls)

- [Git](#git)
- [Laravel](#laravel)
  - [Static Assets](#static-assets)
  - [Databases](#databases)
    - [Creating a new database](#creating-a-new-database)

## Git

- Give precise and elaborate commit message.

```bash
# bad commit messages
git commit -m "commit 2"
git commit -m "changes"
git commit -m "new changes"
git commit -m "feature 8"

# good commit messages
git commit -m "Fix heading alignment."
git commit -m "Update user profile settings"
git commit -m "Database query for unique user search"
```

- Always work on a separate branch unless mentioned.

```bash
# command to checkout to new branch
git checkout -b new_branch_name
```

- After pushing the new branch, open a pull-request. In most cases the destination branch will be **develop** branch

## Laravel

### Static Assets

- You can add new images directly in Public folder and refer it as a normal file inside the blade file. 

```html

<!-- Put file-1.png inside public > images folder and the refer in the Laravel as below -->

<img src="/images/file-1.png">
```

### Databases

#### Creating a new database

- Use PhpMyAdmin to access the databases locally. Create a new database with utf8mb4_unicode_ci collation and remember the database_name
- Update the .env file to have the database name and the credentails. 

```bash

# username is mysql username used to log into PhpMyAdmin. Most cases it is root.
# password is mysql user password.

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=database_name
DB_USERNAME=root
DB_PASSWORD=
```