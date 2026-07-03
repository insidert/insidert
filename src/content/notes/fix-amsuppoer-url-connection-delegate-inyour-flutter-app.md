---
title: "Fix AMSupportURLConnectionDelegate in your flutter app"
description: "A simple fix for your flutter app while building ios."
publishedDate: "Dec 25 2021"
updatedDate: "Dec 25 2021"
isFeatured: false
tags: ['flutter','ios']
heroImage:
    url: ""
    alt: ""
---

You will encounter this error while building for iOS. To begin with try these commands

```bash
flutter clean
flutter pub get
flutter run
```

If you still getting this error message, then it is not the actual error. Some dependencies are breaking the build. So continue reading the error message in debug console (VS Code.)

I encountered this error with Firebase Crashlytics. So, I removed it from dependencies, removed from runner and the code implementation.

I know it is sad, but there is no other way.

And then, you will get other errors. May be a version mismatch. Or a dependency is not null-safe. You fix those errors and they should be gone and you can run the app on iOS simulator or device.

For beginners: In case if you are wondering, the camera does not work on iOS simulator. You need an actual device to test.
