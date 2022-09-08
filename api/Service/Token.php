<?php

namespace Service;

use Exception;

class Token {

    /**
     * @throws Exception
     */
    public static function generateToken(int $byteLen = 15): string{
        return bin2hex(random_bytes($byteLen));
    }
}