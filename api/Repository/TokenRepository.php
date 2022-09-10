<?php

namespace Repository;

use PDO;
use Service\Connection;
use Exception;
use Service\Token;


class TokenRepository
{
    /**
     * @throws Exception
     */
    function generateUserToken(?string $nick = ''): array|bool
    {
        $token = Token::generateToken();
        $sql = "INSERT INTO user_token (token, nick) VALUES (:token,:nick)";
        return Connection::dbQuery($sql, ['token' => $token, 'nick' => $nick]) ? ['token' => $token] : false;
    }

    function checkUserToken(string $token): array|bool
    {
        $sql = "SELECT token, is_used FROM user_token WHERE token = :token";
        $query = Connection::dbQuery($sql, ['token' => $token]);
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    function makeTokenUsed(string $token): bool
    {
        $sql = "UPDATE user_token SET is_used = true, updated_at = CURRENT_TIMESTAMP WHERE token = :token";
        return (bool)Connection::dbQuery($sql, ['token' => $token]);
    }

    function getTokenByToken(string $token): array
    {
        $sql = "SELECT * FROM user_token WHERE token = :token";
        $query = Connection::dbQuery($sql, ['token' => $token]);
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    function selectAllUsedToken(int $day = 30): bool|array
    {
        $sql = "SELECT * FROM user_token WHERE DATE(updated_at) >= DATE(NOW()) - INTERVAL :day DAY AND is_used = true AND nick is not null";
        $query = Connection::dbQuery($sql, ['day' => $day]);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

}