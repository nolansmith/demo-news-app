<?php
/* static class for database stuff */

include('LoginController.php'); //we'll use to to automatically log in once we register



class UsersController
{

    private static $conn, $host, $user, $pass, $db;

    private function __construct()
    {
        /* no instantiations */ }

    /* return a connection */
    private static function getConnection()
    {

        if (UsersController::$conn === null) {
            include('definitions.php');
            UsersController::$host = DB_HOST;
            UsersController::$user = DB_USER;
            UsersController::$pass = DB_PASS;
            UsersController::$db = DB_NAME;
            UsersController::$conn = new mysqli(UsersController::$host, UsersController::$user, UsersController::$pass, UsersController::$db);
            if (UsersController::$conn->connect_error) {
                echo json_encode(['error' => UsersController::$conn->connect_error]);
                UsersController::$conn->close();
                exit();
            } else {
                return UsersController::$conn;
            }
        }
    } //getConnection


    /* function to get a particular user */
    public static function getUserByUsername($username)
    {
        $user = null;
        $conn = UsersController::getConnection();
        $q =  "SELECT * FROM users where username=\"$username\"";

        if ($res = $conn->query($q)) {
            $user = $res->fetch_assoc();
            $res->free();
        }

        $conn->close();
        return $user;
    } //getUserByUsername

    /* create a new user */
    public static function createNewUser($user)
    {
        $conn = UsersController::getConnection();
        //destructured user data from a $_POST
        [
            'register_first_name' => $first,
            'register_last_name' => $last,
            'register_username' => $username,
            'register_password' => $password

        ] = $user;
        //every username will be lowercased 
        $username = strtolower($username);
        //a simple hash
        $password = md5($password);

        $q = "INSERT INTO users (firstname, 
                   lastname, 
                   username, 
                   password, created_at, updated_at) 
                   VALUES (\"$first\", \"$last\", \"$username\", \"$password\", now(), now())";

        if ($conn->query($q)) {
            $conn->close();
            LoginController::login($username);
        } else {
            printf("Error: %s\n", $conn->error);
            $conn->close();
            die();
        }
    } //createNewUser
}
