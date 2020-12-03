---
title: "Fix cURL error 60 in WampServer"
excerpt: "Steps to add self-signed certificate correctly in WampServer"
updatedOn: "2020-12-03"
imageUrl: ""
tags: ["curl", "wampserver", "lemp-stack"]
---

It is frustrating to see *cURL error 60: SSL certificate problem: self signed certificate in certificate chain* error while calling external APIs from your PHP project. Well, the fix is easy. But, sometimes, especially when multiple PHP versions are available in WampServer, extra care should be taken to install it correctly. Follow along:

1. [Download](https://curl.haxx.se/docs/caextract.html) the latest cacert.pem file.
2. Move the file to the desired location. I keep it inside the wamp64 folder. My path to the file is *D:/wamp64/cacert.pem*
3. Now we need to add this path in ```php.ini``` files located in different folders.
4. Left-click the wampserver icon in the system tray. Select PHP > php.ini. (This file is located inside the Apache folder.) And add the path to *curl.cainfo* setting as below.

```bash
; A default value for the CURLOPT_CAINFO option.
; This is required to be an absolute path.
curl.cainfo="D:/wamp64/cacert.pem"
```

**Don't forget** to uncomment the line by removing **;** at the beginning of the line.

5. Now go to D:/wamp64/bin/php folder. You can see all the available PHP versions. You need to change the same line in two php.ini files. One in the php5.6.40 folder and the other in your latest version / the version you are using.
6. Go to php5.6.40 folder and find and open ```php.ini``` file, change *curl.cainfo* setting as above.
7. Go to the latest php version, as of this writing, the latest version on my system is 7.4.6. Find and open ```php.ini``` file, change *curl.cainfo* setting as above.
8. Restart the wamp server and you are done.
