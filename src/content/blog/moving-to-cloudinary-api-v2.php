---
title: "Moving to cloudinary api V2"
description: "Upload images to Cloudinary."
publishedDate: "Mar 12 2023"
updatedDate: "Mar 12 2023"
isFeatured: false
tags: ['code', 'how-to']
heroImage:
    url: ""
    alt: ""
---

```php

$image_to_upload = request()->webCamAvatar ?? request()->file('avatar');

$url = Images::store(
    $image_to_upload->getRealPath(),
    $folder,
    $file_name
);

$config = Configuration::instance([
            'cloud' => [
              'cloud_name' => env('CLOUDINARY_CLOUD_NAME'), 
              'api_key' => env('CLOUDINARY_API_KEY'), 
              'api_secret' => env('CLOUDINARY_API_SECRET')
            ],
            'url' => [
              'secure' => true]]);

$details = (new UploadApi())->upload($image, $image_data);

return $details['secure_url'];

```
