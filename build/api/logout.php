<?php
session_start();

if(array_key_exists('auth',$_SESSION) && $_SESSION["auth"]==true){
    session_destroy();
}
