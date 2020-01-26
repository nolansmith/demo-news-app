<?php
/*
File to store a few helpful functions if we need them to re-use
*/

function getLogPanel()
{
    ?>
    <div>
        <?php
        if (!isset($_SESSION['logged_in']) || false === $_SESSION['logged_in']) {
            ?>

            <a class="nb-link " href="login.php">Login</a> | 
            <a class="nb-link " href="register.php"><span class="sign-up">Sign Up</span></a>
        <?php
        } else {
            ?>
            <i class="fa fa-user" aria-hidden="true"></i> <?php echo "<span class=\"logged-in-user\">" . $_SESSION['logged_username'] . "</span>"; ?> <a class="nb-link " href="login.php?action=out">Logout</a>
        <?php
        } ?>
    </div>
<?php
} //getLogPanel



?>