<?php

$htmlfiles = glob("../../*.html");
$resourse = [];
foreach ($htmlfiles as $file) {
    $resourse[] = basename($file);
}

echo json_encode($resourse);