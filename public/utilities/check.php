<?php
include_once('../../controllers/UsersController.php');
/* 
File to be called against an ajax request,
This is useful for register and login forms to see if a user exists or a password is wrong
*/

if (isset($_POST['checkTheseCredentials'])) {
    $username = $_POST['username'];
    $user = UsersController::getUserByUsername($username);
    $response = array();

    if ( $user === null) {
        $response = array_merge($response,['requested' => $username, 'found' => false]);
    } else {
        $response = array_merge($response,['requested' => $username, 'found' => true]);

    }

    //now see if the username is to be checked
    if (isset($_POST['password']) && null !== $_POST['password']) {
        $password = md5(trim($_POST['password']));
        if ($password === $user['password']) {
            $response = array_merge($response, ['passwordMatch' => true]);
        } else {
            $response = array_merge($response, ['passwordMatch' => false]);
        }
    }
    //send the JSON back to the request
    echo json_encode($response);

    

} else {
    echo 'Nothing to do...';
}
