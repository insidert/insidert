---
title: "Firebase cloud messaging with PHP"
excerpt: "Send notifications from your PHP code."
updatedOn: "2020-08-15"
imageUrl: ""
tags: ["coding"]
---

If your mobile app backend is written with PHP or any PHP framework like Laravel, you may need to trigger notifications programatically. These are the short steps to send notifications from your PHP project.

1. Create a new firebase project.
2. Go to **project settings** > **service accounts**.
3. Click on the button **Generate new private key** at the bottom.

A JSON file will be downloaded. This file is super important and **never** keep it in your project or commit to source control.

Now, we need to do two things. Authenticate the firebase project with the JSON file we downloaded and get a token. Call the cloud messaging REST API with the token received.

### Follow the steps

Install Google PHP client via composer. Refer the [GitHub repo](https://github.com/googleapis/google-api-php-client) for more details and instructions.

```bash
composer require google/apiclient:"^2.7"
```

Add the following in **composer.json** file. If you don't add the extra key, ~250 other modules will be downloaded.

```json
"scripts": {
  // other scripts
  "post-update-cmd": "Google_Task_Composer::cleanup"
},
"extra": {
  "google/apiclient-services": [
      "FirebaseCloudMessaging"
  ]
}
```

Get the token by authenticating with the JSON file we downloaded. I have stored the JSON file in a different folder and I have referenced the path in the **.env** file (I am working with Laravel.)

```php
$google_client = new \Google_Client();

$scope = 'https://www.googleapis.com/auth/cloud-platform';

$path = env('G_CLIENT_CREDENTIALS');

// We should add the scope
$google_client->addScope($scope);

// We should refer the JSON file path
$google_client->setAuthConfig($path);

$google_client->useApplicationDefaultCredentials();

$token_data = $google_client->fetchAccessTokenWithAssertion();

var_dump($token_data);
```

The response is an array and it will have ```access_token``` field. We now need to call the REST API with the token and the notification message object. I am using Laravel **HTTP** facade. You can do this directly with Guzzle or Curl.

```php
// For Laravel
use Illuminate\Support\Facades\Http;

// Replace <your-project-id> with the Firebase project ID.
$url = 'https://fcm.googleapis.com/v1/<your-project-id>/messages:send';

$response = Http::withToken($token_data['access_token'])
  ->withHeaders([
      'Accept' => 'application/json',
      'Content-Type' => 'application/json'
  ])
  ->post($url, [
    'message' => [
      'notification' => [
        'title' => 'The Notification Title',
        'body' => 'The Notification Object.'
      ],
      'token' => 'unique-device-token'
    ]
  ]);
```

The **token** key is to send the notification to a specific device. Remove it, the notfication will be broadcasted to all the devices.
