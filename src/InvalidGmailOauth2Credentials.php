<?php

namespace Luuhai48\GmailOauth2;

use Exception;
use Flarum\Foundation\KnownError;

class InvalidGmailOauth2Credentials extends Exception implements KnownError
{
    public function getType(): string
    {
        return 'invalid_gmail_oauth2_credentials';
    }
}
