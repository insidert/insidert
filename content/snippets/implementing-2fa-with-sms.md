---
title: "Implement 2FA with OTP in Laravel."
excerpt: "A simple approach to implement otp authentication in your Laravel app."
updatedOn: "2021-06-01"
imageUrl: ""
tags: ["laravel", "2fa"]
---

The following code implements 2FA for your Laravel application. Protect the routes with middlewares based on your usage.

### Note on sending OTPs

You need to have an SMS service provider to send SMS / OTP SMS. I use [MSG91](https://msg91.com) and I recommend them. If you are new to sms, you need to sign up on DLT platform first. I recommnend [JIO's true connect.](https://trueconnect.jio.com/#/) After signing up on true connect, you need to register sender id, and sms templates. Only then you can use SMS service providers. This is because of the new TRAI rules in India. For more details search 'SMS DLT'. Also, the service providers charge a bit higer rate for OTPs. Do verify the DLT process and your service provider settings for OTPs before making any payments.

### Setting up the code

Migration

```php
Schema::create('otps', function (Blueprint $table) {
    $table->bigIncrements('id');
    $table->unsignedBigInteger('phone')->unique();
    $table->string('otp');

    // Can differentiate whether you are sending it
    // for registration or to change password.
    $table->string('type');

    // Will be incremented after
    // the user tries to verify the OTP.
    $table->unsignedTinyInteger('verification_attempts')->default(0);

    // Used to disable firing the sms
    // if a user exceeds given timegaps.
    // Timegap can be added on the controller level
    $table->unsignedTinyInteger('time_gaps')->default(0);
    $table->timestamps();
});
```

Routes

```php
 Route::prefix('verify')->group(function () {
 	// Show the form
    Route::get('phone-number', 'VerifyPhoneNumberController@index')->name('verify.phoneNumber.index');

    // Submit the OTP
    Route::post('phone-number', 'VerifyPhoneNumberController@store')->name('verify.phoneNumber.store');
});
```

Verify Phone Number Controller

```php
<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use App\Otp\{NewOtp, VerifyOtp};
use App\Http\Controllers\Controller;

class VerifyPhoneNumberController extends Controller
{
    public function index()
    {
        if (Auth::user()->phone_verified_at) {
            return redirect()->route('profile.show');
        }

        // We are triggering the OTP here.
        // We will check whether this is a duplicate request
        // from the same user on NewOtp class.
        $response = (new NewOtp(Auth::user()->phone, 'registration'))->send();

        if ($response['status'] == 'error') {
            return view('verify.duplicateRequest', ['errors' => $response['errors']]);
        }

        return view('verify.phoneNumber');
    }

    public function store(Request $request)
    {
        $request->validate([
            'otp' => 'required|numeric|digits:5'
        ]);

        $user = Auth::user();

        // VerifyOtp class triggers multiple error responses
        $response = (new VerifyOtp)->verify($request->otp, $user->phone, 'registration');

        if ($response['status'] == 'error') {
            return response()->json([
                'errors' => $response['errors']
            ], 422);
        }

        // If everything is fine, mark the user as verified
        // You can have your own implementation here.
        $user->markVerified();

        session()->flash('phone-verified', 'You have successfully verified your account.');

        return response()->json(['status' => 'success']);
    }
}
```

New OTP Class

```php
<?php

namespace App\Otp;

use App\Sms\Sms;
use Carbon\Carbon;
use App\Models\Otp;

class NewOtp
{
    public $generated_otp;

    public function __construct($phone, $type)
    {
        $this->phone = $phone;

        $this->type = $type;
    }

    public function send()
    {
        $otp = Otp::where('phone', $this->phone)->first();

        if (empty($otp)) {
            return $this->triggerNewOtp();
        }

        $now = Carbon::now();

        $otp_created_at = Carbon::parse($otp->created_at);

        // Because the user can refresh the browser,
        // We can restrict to resend the sms
        if ($now->diffInMinutes($otp_created_at) <= 30) {
            return [
                'status' => 'error',
                'errors' => [
                    'otp' => [
                        'Duplicate request for OTP. Try again after 30 minutes.'
                    ]
                ]
            ];
        }

        // You can check for timegaps here.
        // Time gap is just how many times a user can request an otp in a day.

        // The user can try to get a new OTP after 30 min.
        // Change the time difference above according to your needs.
        return $this->updateOtp($otp);
    }

    private function updateOtp($otp)
    {
        $this->generated_otp = mt_rand(11111, 99999);

        $time_gaps = $otp->time_gap + 1;

        $otp->update([
            'otp' => $this->generated_otp,
            'verification_attempts' => 0,
            'time_gaps' => $time_gaps,
            'created_at' => Carbon::now()
        ]);

        $this->sendOtp();

        return ['status' => 'success'];
    }

    private function triggerNewOtp()
    {
        $this->generated_otp = mt_rand(11111, 99999);

        Otp::create([
            'phone' => $this->phone,
            'otp' => $this->generated_otp,
            'type' => $this->type
        ]);

        $this->sendOtp();

        return ['status' => 'success'];
    }

    private function sendOtp()
    {
        // Construct the message
        // Send SMS
        // Better to have a dedicated class
        // Because we will be firing the sms from multiple places
    }
}
```

Verify OTP Class

```php
<?php

namespace App\Otp;

use Exception;
use App\Models\Otp;
use Carbon\Carbon;

class VerifyOtp
{
    public function verify($request_otp, $phone, $type)
    {
        $otp = Otp::where('phone', $phone)->first();

        if (empty($otp)) {
            return $this->errorResponse('otp', 'No OTP is associated with the given phone number.');
        }

        if ($otp->type != $type) {
            throw new Exception('The type is not correct.');
        }

        $otp->increment('verification_attempts');

        $created_at_time = Carbon::parse($otp->created_at);

        if ($created_at_time->diffInMinutes(Carbon::now()) > 3) {
            return $this->errorResponse('otp', 'Took too long to verify. Try again after 30 minutes.');
        }

        if ($otp->verification_attempts > 3) {
            return $this->errorResponse('otp', 'Maximum OTP verification attempts reached. Try again after 30 minutes.');
        }

        if ($otp->otp != $request_otp) {
            return $this->errorResponse('otp', 'OTP is incorrect.');
        }

        $otp->delete();

        return ['status' => 'success'];
    }

    private function errorResponse($type, $text)
    {
        return [
            'status' => 'error',
            'errors' => [
                $type => $text
            ]
        ];
    }
}
```

Resend OTP

```php
// Route
Route::post('otp/resend', 'ResendOtpController')->name('otp.resend');
```

Resend OTP Controller

```php
<?php

namespace App\Http\Controllers;

use App\Sms\Sms;
use Carbon\Carbon;
use App\Models\Otp;
use Illuminate\Http\Request;

class ResendOtpController extends Controller
{
    public $otp;

    public function __invoke(Request $request)
    {
        $request->validate([
            'phone' => 'required|exists:otps',
        ]);

        $this->otp = Otp::where('phone', $request->phone)->first();

        $now = Carbon::now();

        $otp_created_at = Carbon::parse($this->otp->created_at);

        // Only resend the SMS
        // When the current time is less than 3 min
        // From when it has been created
        $time_difference = $now->diffInMinutes($otp_created_at);

        if ($time_difference < 3) {
            return $this->checkSmsAttemptsAndResendOtp();
        }

        return $this->errorResponse('Timeout. Try again after 30 minutes', '1001');
    }

    private function checkSmsAttemptsAndResendOtp()
    {
        // SMS attempts is being handled by the front-end
        // If necessary, we can move the resend times logic here.

        $otp = $this->otp->otp;

        // Trigger sms

        return response()->json([
            'status' => 'ok',
            'message' => 'OTP Sent',
        ]);
    }

    private function errorResponse($text, $errorCode)
    {
        return response()->json([
            'errors' => [
                'otp' => [
                    $text
                ]
            ],
            'errorCode' => $errorCode
        ], 422);
    }
}

```