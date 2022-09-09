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
        $token = $this->tokenRepository->checkUserToken($token);
        if($token){
            if (isset($token['is_used']) && $token['is_used']){
                return ['used'=>true];
            }
            return ['token' => $token['token']];
        }
        return $token;
    }

    function makeTokenUsed(string $token) : bool{
        return $this->tokenRepository->makeTokenUsed($token);
    }
}