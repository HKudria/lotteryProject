<?php

namespace Repository;

use Service\Connection;
use Exception;
use PDO;
use Service\Token;


class LotteryRepository
{
    /**
     * @throws Exception
     */
    function createLottery(int $presentCount, int $boxCount, string $description = null): array
    {
        $result = false;
        $token = Token::generateToken(20);
        $sql = "INSERT INTO lottery (item_count, box_count ,description, token) VALUES (:item_count, :box_count, :description, :token)";
        if (Connection::dbQuery($sql, ['item_count' => $presentCount, 'box_count' => $boxCount,
            'description' => $description,'token' => $token])) {
            $result = $this->selectLotteryById(Connection::dbLastId());
        }

        return $result;
    }

    function selectLotteryById(int $lotteryId)
    {
        $sql = "SELECT * FROM lottery WHERE id = :id";
        $query = Connection::dbQuery($sql, ['id' => $lotteryId]);
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    function activateLottery(int $lotteryId): array
    {
        $sql = "UPDATE lottery SET active = false WHERE active = true;
UPDATE lottery SET active = true WHERE id = :id";
        $query = Connection::dbQuery($sql, ['id' => $lotteryId]);
        return ['message' => "Lottery with id '$lotteryId' was activated"];
    }

    function getActiveLottery(): bool|array
    {
        $sql = "SELECT id,token FROM lottery WHERE active = true";
        $query = Connection::dbQuery($sql);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    function getAllLottery(?int $limit = 50): bool|array
    {
        $sql = "SELECT lottery.id as id,  lottery.item_count as presents, lottery.box_count as boxes, lottery.active, lottery_present.lotterry_id as lotId, lottery_present.name, lottery_present.number, user_token.token, user_token.is_used as tokenUsed, user_token.nick, user_token.updated_at FROM lottery INNER JOIN lottery_present ON lottery.id = lottery_present.lotterry_id LEFT JOIN user_token ON lottery_present.token_id = user_token.id ORDER BY lottery.id DESC LIMIT $limit";
        $query = Connection::dbQuery($sql);
        return $query->fetchAll(PDO::FETCH_GROUP | PDO::FETCH_ASSOC);
    }
}