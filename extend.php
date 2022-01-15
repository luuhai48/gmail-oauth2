<?php

namespace Luuhai48\GmailOauth2;

use Flarum\Extend;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Routes('forum'))
        ->get('/gmail-oauth2', 'gmail-oauth2', Controller::class),

    (new Extend\ServiceProvider())
        ->register(ServiceProvider::class),
];
