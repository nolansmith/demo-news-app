<?php
include_once("../includes/header.php");
?>

<div class="row">
    <div class="col-md-12">
        <?php
        if (!isset($_SESSION['logged_in']) || false === $_SESSION['logged_in']) {
            ?>
            <h2 class="regular">
                <a href="login.php" class="primary-link">Login</a> or <a href="register.php" class="primary-link">Sign Up</a> to see the news!</h2>

        <?php
        } else {

            ?>
            <h2>Welcome, <?php echo $_SESSION['logged_username']; ?></h2>
            <h3>Your latest breaking news</h3>



        </div>

    </div>
    <?php
    include('../includes/news.php');
} ?>




<?php
include_once("../includes/footer.php");
?>