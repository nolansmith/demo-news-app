<?php
include_once("../includes/header.php");

/* Check to see if user is logged in */
if (isset($_SESSION['logged_in']) && true === $_SESSION['logged_in']) {
    header('Location: index.php');
    die();
} else {

    /* activation to register via a post */
    if (isset($_POST['let_me_register'])) {
        //we scanned the values with jquery, some level of trust
        UsersController::createNewUser($_POST);
    }

    ?>
    <div id="user-registration-area">
        <div class="col-md-12" id="registration-form">
            <h2>Register Here!</h2>
            <form name='regForm' method="post" action="register.php">
                <div class="form-group">
                    <label for="first">First Name: </label>
                    <input class="form-control" type="text" name="register_first_name" id="first">
                </div>
                <div class="form-group">
                    <label for="last">Last Name: </label>
                    <input class="form-control" type="text" name="register_last_name" id="last">
                </div>
                <div class="form-group">
                    <label for="username">Username: </label>
                    <input class="form-control" type="text" name="register_username" id="username">
                </div>

                <div class="form-group">
                    <label for="password_one">Password: </label>
                    <input class="form-control" type="password" name="register_password" id="password_one">
                </div>


                <button class="btn primary-btn" id="btn-register">Register</button>
                <input type="hidden" name="let_me_register" value="ready" />
            </form>
        </div>
    </div>

    <!-- validator script for the register form -->
    <script src="./assets/js/validators/register.js"></script>

<?php
} //endif    
include_once("../includes/footer.php");
?>