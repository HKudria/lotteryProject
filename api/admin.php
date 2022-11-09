<?php

require_once 'config/autoload.php';

use Routing\Routing;


$routing = new Routing(json_decode(file_get_contents("php://input"), true));

echo json_encode($routing->adminRouting());
