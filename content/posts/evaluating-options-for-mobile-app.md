---
title: "Evaluating options for mobile app."
excerpt: "How I chose React Native to build the mobile app."
updatedOn: "2020-04-29"
imageUrl: "https://imgur.com/f7Zd0yV.png"
tags: ["coding"]
---

The time has come to build a mobile app for Craypolar - A CRM for gyms. I'm building this app for the customers of our clients. So, after evaluating three options on how can I achieve mobile experience I finally chose to build the app with React Native.

## Option 1: Progressive Web Apps

I already have the web application, so the first easy step is to make it a progressive web app so that I can bring it to mobiles with very little extra code. With the help of service workers, it is easier to design offline experience, cache important data and prompt to install the app. The problem is the UI. Responsive websites do render beautifully on mobiles - thanks to the frameworks - but cannot match the experience of a native application. I lost a client because of this. He said that he liked the product but wants to have a native app but not the web UI optimised for mobile. I do not what that to happen to my clients. Even though PWA is a great addition to the web, because of business reasons I had to rule this option out.

## Option 2: First-Party Native Apps

First-party native apps are true native apps developed with the official platform-specific programming languages like Java or kotlin for Android and Swift or Objective-C for iOS. Thinking of long-term this is a good choice but we do not have enough resources to hire a dedicated developer. I don't want to outsource the work for many reasons. And so, this is also not the best option for us.

## Option 3: Cross-platform Native Apps

The last option I have is cross-platform native applications. Even though there are good options like the Ionic framework, NativeScript I chose to use React native to build the app. React Native components are built upon React components which looks similar to Vue. I use Vue in all of my websites and so I can understand React much faster. After reading the docs for two days I thought this would be a good option to build the app faster and I started writing the first screen.

## Resources

- [Different ways](https://www.youtube.com/watch?v=4m7msadL5iA) to build mobile apps.
- Understand [PWA.](https://www.youtube.com/watch?v=z2JgN6Ae-Bo)
- React Native [docs.](http://reactnative.dev/)
