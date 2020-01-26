<?php

/* login class to handle logging in and out */

class LoginController
{

    private function __construct()
    { }

    /* simple logout to destroy session stuff */
    public static function logout()
    {
        if (isset($_SESSION)) {
            unset($_SESSION);
            session_destroy();
        }

        header('Location: ' . HOME_URL . '/index.php');
    }


    /* log user in and set session variables */
    public static function login($username)
    {
        //the form handles a query via ajax to save time
        //so these variables just need registered
        $_SESSION['logged_in'] = true;
        $_SESSION['logged_username'] = $username;

        header('Location: ' . HOME_URL . '/index.php');
    }
}
