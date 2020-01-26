<?php
/* login page. performs ajax requests to make sure a) user exists and b) password is good */

include_once("../includes/header.php");

/* if there is an action passed, process it */
if (isset($_GET['action'])) {
    /* log the user out if so */
    if ($_GET['action'] === 'out') {
        LoginController::logout();
    }
}
/* perform a login */
if (isset($_POST['let_me_log_in'])) {
    $username = strtolower(trim($_POST['login_username']));
    LoginController::login($username);
}
/* Check to see if user is logged in */
if (isset($_SESSION['logged_in']) && true === $_SESSION['logged_in']) {
    header('Location: ' . HOME_URL . '/index.php');
    die();
} else {
    ?>


    <div id="user-login-area">
        <h2>Login Here!</h2>
        <div class="col-md-12" id="login-form">
            <form name='loginForm' method="post" action="login.php">
                <div class="form-group">
                    <label for="username">Username: </label>
                    <input class="form-control" type="text" name="login_username" id="username">
                </div>

                <div class="form-group">
                    <label for="password">Password: </label>
                    <input class="form-control" type="password" name="login_password" id="password">
                </div>

                <button class="btn primary-btn" id="btn-login">Log In</button>
                <input type="hidden" name="let_me_log_in" value="ready" />
        </div>
    </div>
    <div class="col-md-12" id="not-a-member">
        <div>
            <h4>Not a member?</h4>
        </div>
        <div>
            <h4><a class='primary-link' href="register.php">Register Now</a></h4>
        </div>
    </div>

    <!-- login validator script. differs from register in that it posts a password -->
    <script src="./assets/js/validators/login.js"></script>

<?php
} //endif    
include_once("../includes/footer.php");
?>