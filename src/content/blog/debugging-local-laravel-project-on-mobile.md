---
title: "Debugging local Laravel project on Mobile"
description: "Open your local project on mobile to debug"
publishedDate: "Mar 30 2024"
updatedDate: "Mar 30 2024"
isFeatured: false
tags: ['code', 'laravel']
heroImage:
    url: ""
    alt: ""
---

There will be times where you need to debug your laravel app on mobile. This is one the ways to connect.

- Connect your laptop and mobile to the same WiFi.
- Check your local ip address. Open cmd and type **ipconfig** Check IPV4 address. Eg: 192.168.1.7
- Start your laravel app with ```php artisan serve --host=192.168.1.7```
- In a new terminal, start vite. ```npm run dev -- --host=192.168.1.7```
- Open the url in your mobile. ```http://192.168.1.7:8000``` and you can access the website including the hotreload.

## Inspecting mobile website

It is hard to inspect the website on mobile browser. For that we can use remote debugging via usb.

- Connect your mobile to your laptop with usb.
- Enable usb debugging on your mobile.
- Allow access when prompted.
- Go to ```chrome://inspect/#devices``` in chrome.
- There you need to check **Discover USB devices.**
- Below you can see your mobile and click on *inspect* to open.

[Refer chrome docs for more](https://developer.chrome.com/docs/devtools/remote-debugging/local-server)