<?php

namespace Repository;
use Service\Connection;
use PDO;

class LotteryPresentRepository
{

    function createPresent(array $lottery, array $presents): bool|array
    {
        $randArray = [];
        while (count($randArray) !== $lottery['item_count']) {
            $randomNumber = rand(0, $lottery['box_count']);
            if (!in_array($randomNumber, $randArray)) {
                $randArray[] = $randomNumber;
            }
        }

        foreach ($presents as $index => $present) {
            $sql = "INSERT INTO lottery_present (lotterry_id, name, number) VALUES (:lottery_id,:name,:number)";
            Connection::dbQuery($sql, ['lottery_id' => $lottery['id'], 'name' => $present, 'number' =>
                $randArray[$index]]);
        }

        return ['message' => "Lottery has been created"];
    }

    function countNotUsedPrize(int $id){
        $sql = "SELECT COUNT(*) as prize FROM lottery_present WHERE lotterry_id = :id and token_id is null";
        $query = Connection::dbQuery($sql, ['id' => $id]);
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    function checkWin(int $id,int  $number){
        $sql = "SELECT * FROM lottery_present WHERE lotterry_id = :id and number = :number AND token_id is null";
        $query = Connection::dbQuery($sql, ['id' => $id, 'number'=>$number]);
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    function setWinUser(int $tokenId, int $number): bool{
        $sql = "UPDATE lottery_present SET token_id = :token WHERE number = :number";
        return (bool)Connection::dbQuery($sql, ['token' => $tokenId, 'number'=>$number]);
    }
}