---
title: "How to import MySQL dump using cli"
description: "Single command to import MySQL dump"
publishedDate: "Jun 24 2025"
updatedDate: "Jun 24 2025"
isFeatured: false
tags: ['code', 'how-to', 'mysql']
heroImage:
    url: ""
    alt: ""
---

Make sure MySQL is available from your terminal. If not add MySQL to the path.

```bash
mysql -u root -p the_database_name < the_sql_file_name.sql
```

This command will import large files into the database without server timeouts. Make sure to clear the database before importing the data. 