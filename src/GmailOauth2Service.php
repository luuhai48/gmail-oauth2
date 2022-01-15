<?php

namespace Luuhai48\GmailOauth2;

class GmailOauth2Service
{
  private $settings;
  private $url;
  private $client;

  public function __construct($settings, $url)
  {
    if (empty($settings->get('gmail_oauth2_token')) || empty($settings->get('gmail_oauth2_email'))) {
      throw new InvalidGmailOauth2Credentials();
    }
  
    $this->settings = $settings;
    $this->url = $url;

    $this->client = new \Google_Client(
        array(
            'client_id' => $settings->get('gmail_oauth2_client_id'),
            'client_secret' => $settings->get('gmail_oauth2_client_secret'),
            'redirect_uri' => $this->url->to('forum')->route('gmail-oauth2'),
            'scopes' => array(
                'https://mail.google.com/',
                'https://www.googleapis.com/auth/userinfo.email'
            ),
            'prompt' => 'consent',
            'access_type' => 'offline',
            'include_granted_scopes' => true,
        )
    );
  }

  public function getTokenFromAuthCode($code)
  {
    $token = $this->client->fetchAccessTokenWithAuthCode($code);
    $this->client->setAccessToken($token['access_token']);
    return $token;
  }

  public function getUserInfo()
  {
    $goauth = new \Google\Service\Oauth2($this->client);
    $userinfo = $goauth->userinfo->get();
    return $userinfo;
  }

  public function setState($state)
  {
    $this->client->setState($state);
  }

  public function createAuthUrl(): string
  {
    return $this->client->createAuthUrl();
  }

  public function getAccessTokenFromRefreshToken(): string
  {
    $token = $this->client->fetchAccessTokenWithRefreshToken($this->settings->get('gmail_oauth2_token'));
    return $token['access_token'];
  }
}
