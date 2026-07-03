---
title: "Moving to cloudinary api V2"
description: "Upload images to Cloudinary."
publishedDate: "Mar 12 2024"
updatedDate: "Mar 12 2024"
isFeatured: false
tags: ['code', 'how-to']
heroImage:
    url: ""
    alt: ""
---

Install Cloudinay PHP v2

```bash
# In your composer.json

"require": {
  # other dependencies
  "cloudinary/cloudinary_php": "^2",
}
```

Do ```composer update```

Inside your controller

```php
$image_to_upload = request()->file('avatar');

$url = Images::store(
    $image_to_upload->getRealPath(),
    $folder,
    $file_name
);
```

The upload function is handled by Images class.

```php
<?php

namespace App\Images;

class Images
{
  public function store($image, $folder, $file_name)
  {
    $config = Configuration::instance([
      'cloud' => [
        'cloud_name' => env('CLOUDINARY_CLOUD_NAME'), 
        'api_key' => env('CLOUDINARY_API_KEY'), 
        'api_secret' => env('CLOUDINARY_API_SECRET')
      ],
      'url' => [
        'secure' => true]]);

    new Cloudinary($config);

    $details = (new UploadApi())->upload($image, $image_data);

    return $details['secure_url'];
  }
}
```

This function will return the secure url for the image uploaded to Cloudinary.
