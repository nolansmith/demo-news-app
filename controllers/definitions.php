<?php
/* 
Definitions file for global variables throughout the project
*/


if (!defined("HOME_URL")) {
    define("HOME_URL", getenv('HOME_URL'));
}

if (!defined("TIMESTAMP")) {
    define("TIMESTAMP", date("Y-m-d H:i:s"));
}

if (!defined('DB_HOST')) {
    define('DB_HOST', getenv('DB_HOST'));
} 
if (!defined('DB_USER')) {
    define('DB_USER', getenv('DB_USER'));
}
if (!defined('DB_PASS')) {
    define('DB_PASS', getenv('DB_PASS'));
}
if (!defined('DB_NAME')) {
    define('DB_NAME', getenv('DB_NAME'));
}

if (!defined('NEWS_URL')) {
    define('NEWS_URL', getenv('NEWS_URL'));
}


?>
