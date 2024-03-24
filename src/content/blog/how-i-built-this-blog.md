---
title: "How I built this blog"
description: "Evolution of the technologies behind this blog"
publishedDate: "Jun 06 2019"
updatedDate: "May 13 2023"
isFeatured: true
tags: ['code', 'how-to']
heroImage:
    url: ""
    alt: ""
---

Navigate for tl;dr

- [Looking back](#looking-back)
- [Fast forward](#fast-forward)
- [The beginning with HTML](#the-beginning-with-html)
- [Moving to SPA](#moving-to-spa)
- [Getting serious with Web App](#getting-serious-with-web-app)
- [JSON file as a database](#json-file-as-a-database)
- [JSON is not enjoyable](#json-is-not-enjoyable)
- [Let me try Express JS](#let-me-try-express-js)
- [Back to Gridsome](#back-to-gridsome)
- [Astro (2023)](#astro-2023)
- [Why you should build your blog](#why-you-should-build-your-blog)

## Looking back

Blogging is not new to me. I hosted my first blog on blogger.com almost 13 years ago. It was amusing setting up a page on the internet. I maintained a technical blog during my engineering which has internet tips and tricks, links to ebooks and syllabus. I also used MediaFire to host those ebooks. Next, I opened a personal blog - insidert (still functional)- and a magazine - skatespace (deleted a year later) - on wordpress.com.

## Fast forward

When I started coding I did not concentrate on building my blog with my own hands. I used WordPress for a long time and then tried a few different services. I was not happy with them so I decided to build one.

## The beginning with HTML

For the start, I wanted to build a single-page website just like a one-page resume. At first, there are a lot of options to host static sites. GitHub, GitLab pages are a good start. We can deploy plain HTML files and add a custom domain. But watching the extension '.html' in the address bar was a huge upset for me. REST architecture is awesome.

And then I tried static site generators like Hugo, Jekyll. A lot of people use them but I could not get my head over them in the short time I have.

## Moving to SPA

I use Vue js in all of my Laravel based projects. At the time Vue released its static site generator - Vuepress and a CLI to quickly scaffold a SPA with an option to add superpowers like routing and state management. At the same time, Netlify has emerged to host static sites for free.

I then started with Vuepress but I did not like that either. So I moved to CLI and scaffolded the project and started making things.
Putting together the pieces for the blog.

I started with my go-to framework bootstrap, customized using SASS and made the first draft. Um, not satisfied with the design. Why should I use the same framework I use every day? So I switched to Tailwind - a utility-first CSS framework. I made a page with Tailwind but things did not turn out as I wanted. I then decided to write in vanilla CSS and review my CSS skills.

I started with CSS grid but it seems like a dragon to handle for a novice. Meanwhile, I tried Gridsome – the JAM stack revolution. When I created a project with it, the homepage has a single column layout with just a few lines of CSS. That is all I need for my blog. I copied it and started building the content.

## Getting serious with Web App

Again I was not happy with the output. I thought it was enough with these static generators and static files and decided to try NodeJS. I wanted to write NodeJS since its first days but could not find time for it. Now anyway I want to code my blog badly, I thought this is the right time to try node for serious.

The first thing that comes to my mind for a web application is routing. Laravel has one and I want to do the same way for node. ExpressJS is the best start. So I went to the docs and followed express-generator steps to quickly scaffold the project. It is a breeze.

It took a while to get used to PUG templating system but it is easy and fun. I built the homepage, contact page and projects page. Then I want to write blog posts. How should I do it?

## JSON file as a database

I first used a JSON file as my database. I wrote a script to create a markdown file for a new post, add the post details to the JSON file. I then query this file to display the list of posts and render a specific post. It was fun writing it. The project is ready. Where to host it?

It looks like express projects cannot be deployed with netlify in the standard way. We need to use netlify functions to handle them. At the time of deployment, I could not find any good resources to host via functions. Then came Google Firebase.

I googled it and I found out that I can deploy express apps with firebase. There is an official firebase channel on youtube that helped me deploying to firebase. Adding the custom domain to firebase took some days. I struggled a bit to get the CNAME and A records setting right. But finally, I did it.

## JSON is not enjoyable

I Got bored with JSON as database. I then wanted to use a real database. I use MySQL daily but wanted to use something different this time just like NodeJS. I chose MongoDB. With mongo atlas, we can host the database in the cloud. So another new technology has added to the stack.

## Let me try Express JS

ExpressJS + MongoDB.

I struggled for a while to wire NodeJS and MongoDB but eventually, I made it. I also changed the layout of the website, everything is ready and the time has come for hosting. I deployed that to firebase and opened my domain to see the site go live. But boom! I saw ‘could not process the request’ error on the homepage.

The logs said that we had to set up a payment method to access an external network. MongoDB is hosted on mongo atlas and because I did not add any payment methods, firebase is restricting it and showing errors.

Now what? should I add a payment method and proceed? I then thought about the alternatives because moving an existing express app to firebase function is one tiresome job. Though you do the conversion once but running locally is slow, the entire function should compile before we can see the changes – even if that is just an HTML tag.

So I remembered Heroku. What if I host on Heroku? I need not make any changes to deploy and it is just as simple as pushing to remote. So I want to give it a try. I installed Heroku CLI, created the project, deployed, fixed errors and yep. The site is running. Very happy with the flow. Now adding the domain.

To add a custom domain, Heroku needs to verify our account with a payment method. I added my payment method and insidert domain. But it running only on HTTP. I need HTTPS. What to do now? Cloudflare has come to the rescue. I googled again, created a Cloudflare account. Changed nameservers on GoDaddy. Gave full control to Cloudflare.

But it took almost two days to completely set up redirecting all traffic to [insidert.com](https://insidert.com). I changed CNAMES, added page rules, and added domains on Heroku to make it happen.

But finally the site is breathing and I like the output. I want to continue with this stack for some time now.

## Back to Gridsome

After a while, I wanted to try a new stack. Cricling back, I wanted to give Gridsome a try. This time, I did not want to have any database connections and CRUD operations. I want a simple setup. That's where markdown has come.

The beauty with the markdown is that you don't have to worry about the changes. Just edit the file and save. SSG will recompile the site and the changes are live. It's as simple as that. 

I liked the markdown content query with GraphQL. It was impressive. 

## Astro (2023)

I was happy with Gridsome but it's not actively maintained. Github is also throwing security issues in the repo. And also I want to try a new technology. I considered next.js and tried to implement the blog few times. But did not happen. Then I came across Astro. 

It's 2023 and I started this blog again with Astro. This time I removed all my previous content and starting fresh. This will be my first post in my redesigned blog.

## Why you should build your blog

I think everyone should write something to the world and I strongly recommend it. Writing clears your mind. It's a skill worth having. 

If you are a developer, do create a blog on your own. It allows for trying different technologies and different approaches which you cannot do in your job. You can make a lot of trial and errors with your website and it costs nothing. 

Expand your technical horizons.
