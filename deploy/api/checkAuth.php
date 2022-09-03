<?php
session_start();

if(array_key_exists('auth',$_SESSION) && $_SESSION["auth"]==true) {
    echo json_encode(["auth" => true]);
} else {
    echo json_encode(["auth" => false]);
}