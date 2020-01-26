<?php
/* header file. this should be included at the top of every new php page */

if (!isset($_SESSION)) {
    session_start();
}


include_once('functions.php'); //a place where php functions are kept
include_once('../controllers/definitions.php'); //definitions for the site
include_once('../controllers/UsersController.php');  //handling getting/creating of users
include_once('../controllers/LoginController.php'); //handling login/logout


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>User App</title>
    <link rel="stylesheet" href="<?php echo HOME_URL; ?>/assets/css/bootstrap.css" />
    <link rel="stylesheet" href="<?php echo HOME_URL; ?>/assets/css/style.css" />
    <link rel="stylesheet" href=https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css />
    <link href="https://fonts.googleapis.com/css?family=Beth+Ellen&display=swap" rel="stylesheet">
    <script src="<?php echo HOME_URL; ?>/assets/js/jquery.min.js"></script>
    <script src="<?php echo HOME_URL; ?>/assets/js/jquery-validate.js"></script>
    <script src="<?php echo HOME_URL; ?>/assets/js/functions.js"></script>
    <script>
        //establish $ at the top so everyone can use it
        const $ = jQuery;
    </script>
    <!-- Main site URL -->
    <?php echo "<script> const HOME_URL =\"" . HOME_URL .  "\" </script>"; ?>
    <!-- News API URL -->
    <?php echo "<script> const NEWS_URL =\"" . NEWS_URL .  "\" </script>"; ?>

</head>

<body>

    <header>
        <nav class="navigation-bar">
            <h4>
                <a href=<?php echo HOME_URL; ?> class="nb-link">
                    <i class="fa fa-newspaper-o" aria-hidden="true"></i>
                </a>
                <a href=<?php echo HOME_URL; ?> class="nb-link">
                    <span class="nav-header">Your News App</span>
                    <span class="nav-header-mobile">YNA</span>
                </a>
            </h4>
            <?php
            /* display either login|sign-up or username/logout */
            getLogPanel();
            ?>
        </nav>
    </header>

    <main>