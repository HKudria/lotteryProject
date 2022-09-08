<?php

namespace Controller;

use Repository\TokenRepository;

class UserTokenController{

    private TokenRepository $tokenRepository;

    public function __construct()
    {
        $this->tokenRepository = new TokenRepository();
    }

    function checkUserToken(string $token):array|bool{
        return $this->tokenRepository->checkUserToken($token);
    }
}