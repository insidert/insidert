---
title: "Flutter Target API 31"
description: "How we wrap our head around the unknown"
publishedDate: "Mar 8 2022"
updatedDate: "Mar 8 2022"
isFeatured: true
tags: ['Flutter', 'Android','Play Store']
heroImage:
    url: ""
    alt: ""
---
If your flutter app is throwing an error while publishing to Play Store to update to target api to 31, this is the simple fix.

Inside android > app > build.gradle

``````
defaultConfig {
  // other values
  targetSdkVersion 31
}
``````
