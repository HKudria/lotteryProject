<?php

namespace Controller;
session_start();

class AuthController
{

    function login(string $password): array
    {
        $settings = json_decode(file_get_contents('./config/setting.json', true));
        if ($password == $settings->password) {
            $_SESSION["auth"] = 'true';
            return ["auth" => true, 'id' => session_id()];
        } else {
            return ["auth" => false, 'error' => 'Wrong password'];
        }
    }

    function logout(): bool
    {
        if (array_key_exists('auth', $_SESSION) && $_SESSION["auth"]) {
            session_destroy();
            return true;
        }
        return false;
    }

    function checkAuth(): array
    {
        if (array_key_exists('auth', $_SESSION) && $_SESSION["auth"]) {
            return ["auth" => true];
        } else {
            return ["auth" => false];
        }
    }
}