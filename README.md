# Gmail-Oauth2

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/luuhai48/gmail-oauth2.svg)](https://packagist.org/packages/luuhai48/gmail-oauth2)

A [Flarum](http://flarum.org) extension. Send email using Google API.

------
### Installation

**Install the extension**

```sh
composer require luuhai48/gmail-oauth2
```

**Note:**
This requires to install the package `google/apiclient-services`, which comes with over 200 services and can be unecessary. Include this in your `composer.json` file before installing the package to only keep what we need.
```json
{
    ...
    "scripts": {
        "pre-autoload-dump": "Google\\Task\\Composer::cleanup"
    },
    "extra": {
        "google/apiclient-services": [
            "Oauth2"
        ]
    }
}
```
Or run: `composer dump-autoload -o` to run the cleanup again.

**Follow this instruction to create a Google Oauth2 App**
https://github.com/PHPMailer/PHPMailer/wiki/Using-Gmail-with-XOAUTH2

 - Redirect URI: must be `your-website-address/gmail-oauth2`

After that, you will get your `client_id` and `client_secret`.


### Updating

```sh
composer update luuhai48/gmail-oauth2
```
------
### Links
- [Github](https://github.com/luuhai48/gmail-oauth2)
- [Packagist](https://packagist.org/packages/luuhai/gmail-oauth2)
