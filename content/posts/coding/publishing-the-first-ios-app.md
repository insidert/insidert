---
title: "Publishing the first iOS app."
excerpt: "Work behind the scenes."
updatedOn: "2021-04-16"
imageUrl: ""
tags: ["coding", "work", "mobile-app"]
---

On April 16, 2021, iOS store approved the MF7 app. Our first app on the iOS platform. I started working seriously to publish the app two weeks ago from the time of this writing. It's a flutter app and we can build and deploy it to multiple platforms. We published the android app first. Almost  8 months ago. So what took so long?

We decided not to publish an iOS app until the covid situation calms down and gyms can get back on track. One hurdle is the 99$ recurring fee to publish the app. We decided not to make this investment until we are sure of the business after covid. At the time of this writing, the situations seem fine and we decided to proceed.

The next hurdle is the Mac. To build the app for iOS we need a Mac. We have windows laptops and our mac friends are not close to us. Since, there will be a lot of debugging and changes to the codebase and publishing, working via Anydesk or Teamviewer is not a viable option.

I searched for VMs. There are ways to get a Mac os running on a VM but a lot of tinkering is involved. After more research, I found a great product called [Code Magic.](https://codemagic.io)

It builds the app directly from Github/GitLab with a Mac mini VM. We can access the VM in the VNC viewer and SSH into it. And the best part, it has a free tier without the need for any credit card. I signed up and started using it. It was a bit tough at the beginning to get used to the flow. But I started using the product by watching a tutorial from their official YT channel.

There were a lot of failed builds. After a week I finally got a working build that can be published to App Store.

Pushing to App Store is a mess. We should sign up on three different apple services, generate secret keys, add them to build setup in different places and a lot of juggling between the services. Luckily Codemagic streamlined some of the publishing steps. That saved a lot of time for me.

There were push notifications issue in the first successful build and got rejected by App Store. I then worked on it for almost two days straight. Understanding those steps and getting them to work, checking them on VM is one cumbersome task.

Fortunately, I could fix everything and published it. It got approved for testing. Finally, a happy moment. I added three friends for internal testing and everything was fine. It's now time to push the app for the world.

I need to fill a lot of forms about the app. Age rating, copyrights, versions, build number etc. Pure developer task. But one thing bugged me so much. App screenshots.  I spent almost a day just to get the screenshot dimensions right. I went back to my favourite service, Canva, for the required dimensions.

Finally, on April 15, I submitted for review and on 16 I received an email about approval.

That's my initial journey with iOS.
