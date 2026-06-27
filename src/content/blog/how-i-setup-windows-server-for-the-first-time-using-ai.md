---
title: "How I setup windows server for the first time using AI"
description: "A brief account of using my coding experience and AI tools"
publishedDate: "Mar 1 2026"
updatedDate: "Mar 1 2026"
isFeatured: true
tags: ['code', 'ai', 'server']
heroImage:
    url: ""
    alt: ""
---
 
I got a requirement to setup a windows server to be used by a small organisation. The requirement is simple. They need a centralized setup so that employees can login to the system and work on a custom software.

In the beginning it is straight forward. Setup windows server and RDS. 

I am new to windows server. I have been using Ubuntu for all my servers so far. Before taking up the projece I asked ChatGPT, Cluade and Gemini for the setup. All three told the same. I watched YouTube videos and read blogs to check the process.

I finished setting up the server, required software and RDS.

Then came a new requirement. The files created by software needs to be available in other local systems so that the same files will be used by the local software. It is a hybrid approach. 

The server files stays as single source of truth. So I needed to setup the files in such a way that local systems will be getting the latest files at any time. The solution, file server.

I shared the required files as network. Setup VPN using Wireguard, connect local systems to the server. Along the way, I had to setup the firewall on the VPS opening up TCP and UDP ports for RDS and also file sharing.

For this new setup, I have taken most of the help from Claude. I did ask copilot learning for official docs and references. 
 
Luckily for windows, most of the work is clicking buttons. You just need to click the right buttons.

If I were doing this few years ago, I had to struggle between blogs, YouTube videos, StackOverflow, trial and error and seeking help from God.

I really like how AI tools are helping in an unprecedented way.