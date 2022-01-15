<?php

namespace Luuhai48\GmailOauth2;

use Flarum\Http\UrlGenerator;
use Flarum\Mail\DriverInterface;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Validation\Factory;
use Illuminate\Support\MessageBag;
use Swift_SmtpTransport;
use Swift_Transport;

class Driver implements DriverInterface
{
    /**
     * @var UrlGenerator
     */
    protected $url;

    public function __construct(UrlGenerator $url)
    {
        $this->url = $url;
    }

    public function availableSettings(): array
    {
        return [
            'gmail_oauth2_client_id' => '',
            'gmail_oauth2_client_secret' => '',
            'gmail_oauth2_token' => '',
            'gmail_oauth2_email' => '',
        ];
    }

    public function validate(SettingsRepositoryInterface $settings, Factory $validator): MessageBag
    {
        return $validator->make($settings->all(), [
            'gmail_oauth2_client_id' => 'required',
            'gmail_oauth2_client_secret' => 'required',
            'gmail_oauth2_token' => 'nullable|string',
            'gmail_oauth2_email' => 'nullable|string',
        ])->errors();
    }

    public function canSend(): bool
    {
        return true;
    }

    public function buildTransport(SettingsRepositoryInterface $settings): Swift_Transport
    {
        $gservice = new GmailOauth2Service($settings, $this->url);

        $transport = (new Swift_SmtpTransport('smtp.gmail.com', 587, 'tls'))
            ->setAuthMode('XOAUTH2')
            ->setUsername($settings->get('gmail_oauth2_email'))
            ->setPassword($gservice->getAccessTokenFromRefreshToken());

        return $transport;
    }
}
