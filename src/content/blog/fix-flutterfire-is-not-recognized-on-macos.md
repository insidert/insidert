---
title: "Fix flutterfire is not recognized on macos"
description: "Step-by-step guide to fix"
publishedDate: "Feb 18 2022"
updatedDate: "Feb 18 2022"
isFeatured: false
tags: ['Flutter', 'Firebase','Flutter App Development','Firebase cloud messaging']
heroImage:
    url: ""
    alt: ""
---

If you are new to flutter development and working on mac to develop apps, you may run into flutterfire not recognised command while adding the Firebase CLI.

You need to follow these steps.

1.You need to install firebase-cli first. https://firebase.google.com/docs/cli and check your firebase projects are displayed locally.

2.Install futterfire-cli https://firebase.flutter.dev/docs/cli For which you need nodejs installed on your system.

3.```dart pub global activate flutterfire_cli``` activates the cli.

4.flutterfire configure configures the necessary firebase tools for your project.

At step 4, you may run into the command not recognized error. You need to export the pub-cache/bin to your path.

```bash
export PATH="$PATH:$HOME/Devtools/Flutter/bin:$HOME/.pub-cache/bin"
```

After doing this, refresh the terminal by running
```bash
source $HOME/.zshrc
```

Check whether your paths have been updated
```bash
echo $PATH
```
