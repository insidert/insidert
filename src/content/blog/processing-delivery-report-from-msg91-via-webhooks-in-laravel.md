---
title: "Processing delivery report from MSG91 via Webhooks in Laravel"
description: "Save the details correctly."
publishedDate: "Aug 2 2019"
updatedDate: "Aug 2 2019"
isFeatured: false
tags: ['laravel', 'sms', 'msg91', 'code']
heroImage:
    url: ""
    alt: ""
---

MSG91 is the SMS service provider I am using for MF7. It is a really great service and should definitely consider for your projects if you have an sms use case.

I assume you have set up the API and sending the messages and this article focuses on how to receive delivery reports.

1. Set up a route in your web.php Remember it should be POST request.

```php
Route::post('messages-activity/delivery-report', 'DeliveryReportController@index');
```

2. In your MSG91 panel, add the full route in webhooks input.
3. Get the delivery report data sent by MSG91 in your controller

```php
// DeliveryReportController.php
public function index(Request $request)
{
   $data = $request->all();
   $items = json_decode($data['data'], true);
   foreach ($items as $item) {
      // do all that you want
   }
}
```

