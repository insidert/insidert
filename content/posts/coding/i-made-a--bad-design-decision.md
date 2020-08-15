---
title: "I made a bad design decision."
excerpt: "I was wrong about the authentication feature for a new project."
updatedOn: "2020-08-15"
imageUrl: ""
tags: ["coding", "mobile-app"]
---

We are working on a new project and authentication is one of the essential features. We cannot imagine a system that deals with personal and sensitive information without the authentication layer. There are three ways any system can identify you.

1. **Something you know.** Your password, PIN.
2. **Something you are.** Your biometrics like fingerprint, retina, face recognition.
3. **Something you have.** A physical device like your mobile, ATM Card.

A system can use any one of the above or use a combination of them. If a combination is used, we call it 2FA - 2-Factor Authentication. If all of the above are used, it's called Multi-Factor authentication.

### What we took

We are building two mobile apps and during the discussions, I insisted on a 2FA for the apps (Something you know + something you have.) It took almost a month to finish the API. The flow is below.

1. User registers with the phone number and password.
2. The User then verifies the phone number with an OTP.
3. User will login with the password.

You may have seen this kind of setup in many systems. It is very common for web apps.

### Where it went wrong

There is nothing wrong with this approach and it is highly recommended, but along the way, it made few things complex and tightly coupled.

For passwords, you need to implement the *forgot password* feature. To check the right user is resetting the password, the system should trigger an OTP to identify the user, verify and reset.

I need to implement OTP feature for registration and for resetting the password. Is that it? No!

- What if a user does not verify the phone after registration?
- What if a user who did not verify the phone tried to log in?
- What if the system could not trigger OTP while registration, resetting the password?

I implemented all of these edge cases, triggering OTP whenever and wherever necessary. Looking at what I have done, it looked like a mess. Although I have written test cases, there might be things that can go wrong. I just don't know them yet.

The flow charts became very long with many loops. **The more complex and tightly coupled a system is, the more prone it is for errors and bugs.** If more things go wrong in a system, it impacts the user experience.

Then I came to the conclusion that I made a bad authentication design decision.

### The fix

We removed the passwords feature and relying only on OTP verification. Since there are only apps and the frequency of registering and signing in to the app will be very low, registering without a password and verifying with 'something they have' will have a nice user experience and also lightens the system. It has its downsides, yet given the flow and requirements of the project, this approach seems best. But we also need to implement more about the devices, attempts, timestamps etc. This is way easier to implement and maintain with fewer chances of failures.
