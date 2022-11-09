<?php

namespace Repository;

use Service\Connection;
use PDO;

class PrizeLogRepository
{

    function getOpenedBox (string $token) :array|bool{
        $sql = "SELECT box_number FROM prize_log WHERE token = :token";
        $query = Connection::dbQuery($sql, ['token'=>$token]);
        return $query->fetchAll(PDO::FETCH_COLUMN);
    }

    function setPrizeOpened(string $token, int $id, string $user_token=null) : bool{
        $sql = "INSERT INTO prize_log (token, box_number, user_token) VALUE (:token, :id, :user_token)";
        return (bool)Connection::dbQuery($sql, ['token'=>$token, 'id' => $id, 'user_token' => $user_token]);
    }

}