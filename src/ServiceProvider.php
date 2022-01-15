<?php

namespace Luuhai48\GmailOauth2;

use Flarum\Foundation\AbstractServiceProvider;
use Flarum\Mail\SendmailDriver;
use Flarum\Mail\MailgunDriver;
use Flarum\Mail\LogDriver;
use Flarum\Mail\SmtpDriver;

class ServiceProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->container->singleton('mail.supported_drivers', function () {
            return [
                'mail' => SendmailDriver::class,
                'mailgun' => MailgunDriver::class,
                'log' => LogDriver::class,
                'smtp' => SmtpDriver::class,
                'gmail-oauth2' => Driver::class,
            ];
        });
    }
}   
