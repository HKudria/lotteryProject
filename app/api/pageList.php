<?php
session_start();
if(array_key_exists('auth',$_SESSION) && $_SESSION["auth"]!=true) {
    header("HTTP/1.0 403 Forbidden");
    die;
}
$htmlfiles = glob("../../*.html");
$resourse = [];
foreach ($htmlfiles as $file) {
    $resourse[] = basename($file);
}

echo json_encode($resourse);