---
title: "Fix no procfile using ‘web heroku-php-apache2’ for Laravel on Windows"
description: "How we wrap our head around the unknown"
publishedDate: "Aug 14 2023"
updatedDate: "Aug 8 2019"
isFeatured: false
tags: ['code', 'heroku']
heroImage:
    url: ""
    alt: ""
---

If you have followed the docs and see this error two things you should do…

1. Creating Procfile correctly
The docs ask us to execute this command

```bash
// Do not do this
echo "web: vendor/bin/heroku-php-apache2 public/" > Procfile

```

Remember, you need to remove those quotes when executing from the command prompt. The exact line is

```bash
// Execute this
echo web: vendor/bin/heroku-php-apache2 public/ > Procfile
```

And do check the name of the file, it should start with p in uppercase: Procfile

2. Checking the branch
If you are not on the local master branch while deploying the code to Heroku, you will end up with the errors.

You need to push to heroku master while you are on your local master branch. This is the default setup.

For some reasons, if you want to push to Heroku from a different branch you need to do this:

```bash
git push heroku you-local-branch:master
```

Rename your-local-branch to the actual name of your current branch. This also solves everything up-to-date issue.

```bash
// E.g. If I need to push my local "checking-branch" to heroku instead of master, I need to do:
git push heroku check-branch:master
```
