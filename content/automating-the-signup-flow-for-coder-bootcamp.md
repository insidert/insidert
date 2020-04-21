---
title: "Automating the signup flow for Coder Bootcamp."
excerpt: "Overview of the email automation."
updatedOn: "2020-01-23"
imageUrl: ""
---

Previously I used to submit the Coder Bootcamp form details to my telegram bot and then manually send the email. I wanted to automate the flow and here is what I did. I created an endpoint in insidert.com and then submitting the form details to it. And then I ran into CORS issue. Coder Bootcamp is sending the request to a different domain and the default security of the browser suspended the request. I struggled a bit before to enable cors on the server but understood the theory when I read with a poised and quiet mind. After collecting the details at the server, I am storing them in the database followed by triggering the email and telegram message. I am using SendGrid service to handle the emails.Happy with the results.
