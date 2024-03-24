---
title: "Flutter Target API 31 and above"
description: "Fix the deployment bundle"
publishedDate: "Mar 8 2022"
updatedDate: "Mar 8 2022"
isFeatured: false
tags: ['flutter', 'android', 'code']
heroImage:
    url: ""
    alt: ""
---
If your flutter app is throwing an error while publishing to Play Store to update to target api to 31 or anything beyond 31, this is the simple fix.

Inside **android > app > build.gradle**

change the following line.

```flutter
defaultConfig {
  // other values
  targetSdkVersion 31
}
```

Android will target different SDK version when there are new releases. Based on them, change the number. 

If using the imports from local.properties, do the following

```gradle
def targetSdkVersion = localProperties.getProperty('flutter.targetSdkVersion')
if (targetSdkVersion == null) {
    targetSdkVersion = '31'
}

defaultConfig {
  # other configs
  targetSdkVersion targetSdkVersion
}

```

