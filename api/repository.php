<?php

use Connect\Connection;

require_once 'connection.php';

class Repository
{
    function createLottery(int $count, string $description = null)
    {
        $result = false;
        $sql = "INSERT INTO lottery (item_count, description) VALUES (:item_count,:description)";
        if (Connection::dbQuery($sql, ['item_count'=>$count, 'description'=>$description])){
            $result = $this->selectLotteryById(Connection::dbLastId());
        }

        return $result;
    }

    function selectLotteryById(int $lotteryId){
        $sql = "SELECT * FROM lottery WHERE id = :id";
        $query = Connection::dbQuery($sql, ['id'=>$lotteryId]);
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    function getLotteryStack(int $lotteryId): bool|array
    {
        $sql = "SELECT * FROM lottery INNER JOIN lottery_present ON lottery.id = lottery_present.lotterry_id WHERE lottery.id = :id";
        $query = Connection::dbQuery($sql, ['id'=>$lotteryId]);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    function createPresent(int $lotteryId, array $presents): bool|array
    {
        $randArray = [];
        $lottery=$this->selectLotteryById($lotteryId);
        while(count($randArray) !== $lottery['item_count']){
           $randomNumber = rand(0, $lottery['box_count']);
            if(!in_array($randomNumber,$randArray)) {
               $randArray[] = $randomNumber;
           }
        }
        var_dump($randArray);

        foreach ($presents as $index => $present){
            $sql = "INSERT INTO lottery_present (lotterry_id, name, number) VALUES (:lottery_id,:name,:number)";
            Connection::dbQuery($sql,['lottery_id'=>$lotteryId,'name'=>$present, 'number'=>$randArray[$index]]);
        }

        return $this->getLotteryStack($lotteryId);
    }
}