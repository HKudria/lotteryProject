<?php

namespace Service;
use PDO;
use PDOStatement;

class Connection
{

   static function dbInstance() : PDO{
        $dbParams = json_decode(file_get_contents('./config/setting.json', true));
        static $db;
        if($db === null){
            $db = new PDO('mysql:dbname='.$dbParams->dbName.';host='.$dbParams->host.';
        port='.$dbParams->port.';charset=utf8', $dbParams->userName,
                $dbParams->passwordDB);
        }
        return $db;
    }

    static function dbQuery(string $sql, array $params = []) : PDOStatement{
        $db = self::dbInstance();
        $query = $db->prepare($sql);
        $query->execute($params);
        self::dbCheckError($query);
        return $query;
    }

    static function dbCheckError(PDOStatement $query) : bool{
        $errInfo = $query->errorInfo();

        if($errInfo[0] !== PDO::ERR_NONE){
            echo $errInfo[2];
            exit();
        }

        return true;
    }

    static function dbLastId() : string{
        $db = self::dbInstance();
        return $db->lastInsertId();
    }

}



