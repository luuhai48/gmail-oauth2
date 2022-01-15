<?php

namespace Luuhai48\GmailOauth2;

use Illuminate\Support\Arr;
use Flarum\Http\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;
use Laminas\Diactoros\Response\RedirectResponse;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class Controller implements RequestHandlerInterface
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var UrlGenerator
     */
    protected $url;

    /**
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings, UrlGenerator $url)
    {
        $this->settings = $settings;
        $this->url = $url;
    }

    /**
     * @param ServerRequestInterface $request
     *
     * @throws Exception
     *
     * @return ResponseInterface
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $session = $request->getAttribute('session');

        $queryParams = $request->getQueryParams();
        $code = Arr::get($queryParams, 'code');
        $state = Arr::get($queryParams, 'state');

        $gservice = new GmailOauth2Service($this->settings, $this->url);

        if (!$code) {
            $state = bin2hex(random_bytes(16));
            $gservice->setState($state);
            $session->put('gmailoauth2state', $state);

            $url = $gservice->createAuthUrl();
            return new RedirectResponse($url);
        } elseif (!$state || $state !== $session->get('gmailoauth2state')) {
            $session->remove('gmailoauth2state');
            throw new \Exception('Invalid state');
        }

        $token = $gservice->getTokenFromAuthCode($code);
        $userinfo = $gservice->getUserInfo();
        $email = $userinfo['email'];

        $this->settings->set('gmail_oauth2_token', $token['refresh_token']);
        $this->settings->set('gmail_oauth2_email', $email);

        return new RedirectResponse($this->url->to('admin')->route('index').'#/mail');
    }
}
