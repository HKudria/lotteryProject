<?php

use Connect\Connection;

require_once 'connection.php';

class Repository
{
    function createLottery(int $presentCount, int $boxCount, string $description = null)
    {
        $result = false;
        $sql = "INSERT INTO lottery (item_count, box_count,description) VALUES (:item_count, :box_count, :description)";
        if (Connection::dbQuery($sql, ['item_count' => $presentCount, 'box_count' => $boxCount,
            'description' => $description])) {
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

    function getAllLottery(?int $limit = 50): bool|array
    {
        $sql = "SELECT lottery.id as id,  lottery.item_count as presents, lottery.box_count as boxes, lottery.active, lottery_present.lotterry_id as lotId, lottery_present.name, lottery_present.number, user_token.token, user_token.is_used as tokenUsed, user_token.nick, user_token.updated_at FROM lottery INNER JOIN lottery_present ON lottery.id = lottery_present.lotterry_id LEFT JOIN user_token ON lottery_present.token_id = user_token.id ORDER BY lottery.id DESC LIMIT $limit";
        $query = Connection::dbQuery($sql);
        return $query->fetchAll(PDO::FETCH_GROUP | PDO::FETCH_ASSOC);
    }

    function activateLottery(int $lotteryId): array
    {
        $sql = "UPDATE lottery SET active = false WHERE active = true;
UPDATE lottery SET active = true WHERE id = :id";
        $query = Connection::dbQuery($sql, ['id' => $lotteryId]);
        return ['message' => "Lottery with id '$lotteryId' was activated"];
    }

    function getLotteryStack(int $lotteryId): bool|array
    {
        $sql = "SELECT * FROM lottery_present LEFT JOIN user_token ON lottery_present.token_id = user_token.id WHERE lottery_present.lotterry_id = :id";
        $query = Connection::dbQuery($sql, ['id' => $lotteryId]);
        return $query->fetchAll(PDO::FETCH_COLUMN);
    }

    function createPresent(int $lotteryId, array $presents): bool|array
    {
        $randArray = [];
        $lottery = $this->selectLotteryById($lotteryId);
        while (count($randArray) !== $lottery['item_count']) {
            $randomNumber = rand(0, $lottery['box_count']);
            if (!in_array($randomNumber, $randArray)) {
                $randArray[] = $randomNumber;
            }
        }

        foreach ($presents as $index => $present) {
            $sql = "INSERT INTO lottery_present (lotterry_id, name, number) VALUES (:lottery_id,:name,:number)";
            Connection::dbQuery($sql, ['lottery_id' => $lotteryId, 'name' => $present, 'number' => $randArray[$index]]);
        }

        return ['message' => "Lottery has been created"];
    }

    /**
     * @throws Exception
     */
    function generateToken(?string $nick = ''): array
    {
        $token = bin2hex(random_bytes(15));
        $sql = "INSERT INTO user_token (token, nick) VALUES (:token,:nick)";
        Connection::dbQuery($sql, ['token' => $token, 'nick' => $nick]);
        return ['token' => $token];
    }
}