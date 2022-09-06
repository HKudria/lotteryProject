<?php
session_start();
require_once 'repository.php';

$data = json_decode(file_get_contents("php://input"),true);

$repo = new Repository();
$error = '';

switch ($_GET['fn']){
    case 'createLottery':
        if($data["present_count"] > 0 && $data["box_count"] > $data["present_count"]){
            $result = $repo->createLottery($data["present_count"], $data["box_count"], $data["desc"]);
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
    case 'getAllList':
        echo json_encode($repo->getAllLottery());
        break;
    case 'activateLottery':
        echo json_encode($repo->activateLottery($data['lottery_id']));
        break;
    case 'generateToken':
        $nick = null;
        if (isset($data['nick'])){
            $nick = $data['nick'];
        }
        try {
            echo json_encode($repo->generateToken($nick));
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        break;
    default:
        echo 'wrong request';
        break;
}




//if($count > 0 && $_SESSION["auth"]){
