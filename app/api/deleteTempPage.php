<?php
session_start();
if(array_key_exists('auth',$_SESSION) && $_SESSION["auth"]!=true) {
    header("HTTP/1.0 403 Forbidden");
    die;
}
$file = "../../gsdfetewtgg46643.html";

if(file_exists($file)){
    unlink($file);
}else{
    header("HTTP/1.0 400 Bad Request");
}