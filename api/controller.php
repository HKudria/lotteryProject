<?php
session_start();
require_once 'repository.php';

$data = json_decode(file_get_contents("php://input"),true);

$repo = new Repository();
$error = '';

switch ($_GET['fn']){
    case 'createLottery':
        if($data["count"] > 0){
            $result = $repo->createLottery($data["count"],$data["desc"]);
            echo json_encode($result);
        } else {
            $error = 'Error - create lottery';
        }
        break;
    case 'createPresent':
        if($data['lottery_id'] && $data['presents']){
            echo json_encode($repo->createPresent($data['lottery_id'], $data['presents']));
        } else {
            echo 'no data';
        }
        break;
    default:
        echo 'wrong request';
        break;
}




//if($count > 0 && $_SESSION["auth"]){
