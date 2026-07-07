---
title: "Understanding min, compile, target sdk version for flutter projects"
description: "Each define its own task and plays major role in the project"
publishedDate: "Jul 7 2026"
updatedDate: "Jul 7 2026"
isFeatured: true
tags: ['flutter']
heroImage:
    url: ""
    alt: ""
---

All of them are fundamentally Android-specific settings. They tell the Android operating system and the Google Play Store how to build and handle your app.

### tl;dr

**minSdkVersion**: Who can install my app? (The oldest phone)

**compileSdkVersion**: What tools do I use to build my app? (The newest toolbox)

**targetSdkVersion**: What rules does my app follow while running? (The newest OS version I've tested for)

### minSdkVersion

The oldest version of the Android OS your app is allowed to run on. 

- Google Play Store prevents users with an Android version older than your minSdkVersion from downloading or even seeing your app.
- Example: If minSdkVersion = 21 (Android 5.0 "Lollipop"), a user with a phone running Android 4.4 "KitKat" (API 19) cannot install your app.

### compileSdkVersion

The specific version of the Android SDK that Gradle - Android's build tool - uses to build and compile your app. 

- It only gives you access to new Android APIs at compile time. For example, to use a new feature introduced in Android 14 (API 34), you must set your compileSdkVersion to 34 or higher.
- It only affects the build process. You can compile with SDK 34 but still have a minSdkVersion of 21.
- You should always use the latest or a very recent compileSdkVersion. This gives you access to the latest APIs and ensures your app is built with the most recent, optimized, and secure tools.

### targetSdkVersion 

This is you telling the Android OS which version your app was designed and tested for. 

- This value changes your app's runtime behavior. The Android OS uses this number to decide if it needs to apply any "compatibility behaviors" for your app.
- If your targetSdkVersion is 22 or lower, an Android 6.0+ phone will emulate the old behavior and ask for all permissions at install time.
- If your targetSdkVersion is 23 or higher, the OS enforces the new behavior. Your app must ask for permissions (like Camera or Location) while it's running, or it will crash.
- You must keep this updated. Google Play requires you to target a recent SDK version (usually within 1-2 years of the latest release) to publish new apps or updates. When you increase this value, you must test your app to make sure it works with the new behavioral changes (like new privacy restrictions or background processing limits) that the new OS version enforces.




##### References

https://developer.android.com/build/releases/gradle-plugin
