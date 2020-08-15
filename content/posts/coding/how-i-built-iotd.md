---
title: "How I built the IOTD app."
excerpt: "Short technical writing about IOTD internals."
updatedOn: "2020-07-26"
imageUrl: "https://imgur.com/CsFxIfg.png"
tags: ["coding", "work", "mobile-app"]
---

I have built the IOTD with [Flutter.](https://flutter.dev) After creating a new Flutter project, I have removed the default scaffolding and made only one *StatelessWidget.*

### How to display one image every day

Instead of downloading every image as a raw file from a single-endpoint every day, I chose to give a unique URL for every image. So that each image can be viewed at any point of time (feature not yet implemented.)

How can I give a unique URL for each image? Before that, I need to figure of where to host these images. Saving them on my server is not a good idea as they take space over time. I am using [Cloudinary](https://cloudinary.com) service to host MF7 (Craypolar) images. It gives a unique URL for each image automatically. I thought I could use the Cloudinary for the quotes too.

But what URL structure should I follow? Since, one image a day, and the dates will be unique, I need to somehow make the URL schema reflect the dates. For now, I am just getting the current date when the app is opened, and the URL is made dynamically with the date.

```dart
  final formattedDate = new DateTime.now().day;

  final imageUrl = 'https://cloudinary-unique-url/${formattedDate}.png';
```

The URL problem is solved. I am making the images and renaming the files with just the number from 1-31 based on the month and uploading to Cloudinary. Everything works automatically.

### Design

This is the simplified Widget tree of the app.

1. Following Material design system.
2. A container with padding on all sides.
3. A column to hold all the elements.
4. A column for the top text blocks.
5. A container for the image with box-shadow decoration.
6. ```Image.network()``` widget with a linear progress indicator.
7. The icon button for sharing.
8. Row for the last text.

Initial design

![Initial design](https://imgur.com/BImwnw6.png)

The final design (as of now)

![Final design](https://imgur.com/ch2C3CQ.png)

### Packages

These are the packages I have used for the app.

```dart
import 'dart:io';
import 'dart:typed_data';
import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:esys_flutter_share/esys_flutter_share.dart';
```

[Download the app from Play Store.](https://play.google.com/store/apps/details?id=com.craypolar.image_of_the_day)
