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

        return Connection::dbQuery($sql, ['token' => $token, 'nick' => $nick])?['token' => $token]:false;
    }

    function checkUserToken(string $token): array|bool{
        $sql = "SELECT token FROM user_token WHERE token = :token AND is_used = false";
        $query = Connection::dbQuery($sql, ['token' => $token]);
        return $query->fetch(PDO::FETCH_ASSOC);

    }
}