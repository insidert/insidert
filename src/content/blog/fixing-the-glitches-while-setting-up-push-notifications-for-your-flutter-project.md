---
title: "Fixing the glitches while setting up push notifications for your Flutter project"
description: "A comprehensive guide on setting up notifications"
publishedDate: "Aug 8 2020"
updatedDate: "Aug 8 2020"
isFeatured: false
tags: ['flutter', 'firebased cloud messaging', 'firebase', 'code']
heroImage:
    url: ""
    alt: ""
---

**Setting up and fixing possible errors**

Import the package https://pub.dev/packages/firebase_messaging into your Flutter app. Go through each and every installation step. You may run into few errors here when running the app.

1. The first error could be in your Application.java file. Make sure the IDE doesn’t give any warning signs. If there are no warning signs, then there is no need to change. If it does at this line, consider changing the registerWith method as below.

```java
// The error line
FlutterFirebaseMessagingService.setPluginRegistrant(this);
```
As of this writing, you need to change the registerWith method as follows.

```java
@Override
public void registerWith(PluginRegistry registry) {
    GeneratedPluginRegistrant.registerWith((FlutterEngine) registry);
}
```
This has not been documented yet.

Make sure the *android/app/build.grade* file has the correct dependencies

```java
dependencies {
    implementation 'com.google.firebase:firebase-analytics:17.2.2'
    implementation 'com.google.firebase:firebase-messaging:20.2.4'
}
```

Your intent filters should be correct
```xml
<intent-filter>
    <action android:name="android.intent.action.MAIN"/>
    <category android:name="android.intent.category.LAUNCHER"/>
</intent-filter>
<intent-filter>
    <action android:name="FLUTTER_NOTIFICATION_CLICK" />
    <category android:name="android.intent.category.DEFAULT" />
</intent-filter>
```

The FLUTTER_NOTIFICATION_CLICK should be added as a separate intent-filter but not inside the existing one.

**Create Firebase project**

Your Firebase project will verify your app by the *application_id* and the google-services.json file it generated while creating an Android project form the dashboard.

At this time, you must *reinstall* the app on your AVD or physical device. The notifications will only be pushed once firebase verifies your app.

Mandatory Code
Before writing your own implementation of how notifications should be handled, keep this code to test whether you did all the steps correctly.

```dart
// Inside a stateful widget
@override
void initState() {
  super.initState();
  final fbm = FirebaseMessaging();
  fbm.requestNotificationPermissions();
  fbm.configure(onMessage: (msg) {
    print(msg);
    return;
  }, onLaunch: (msg) {
    print(msg);
    return;
  }, onResume: (msg) {
    print(msg);
    return;
  });
}
```

Start pushing notification from the Firebase console.
