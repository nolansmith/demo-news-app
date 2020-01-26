# YourNewsApp
## About
### This was a code test I submitted for a full-stack dev opening with the requirements of "make a simple login app using PHP and MySQL" with a time limit. I got some good feedback on it and was ultimately offered the job at a great salary. I'm definitely not a PHP expert nor do I use it day-to-day but this app worked for me to land that particular offer. I'm not saying this will get you hired because a) this code might be complete crap to you or a potential employer and b) there's other variables in the job acquisition process. But, if you're like me I enjoy seeing real examples that had meaningful outcomes.


## Example: https://your-news-app.herokuapp.com/
#### Simple demo using PHP/MySQL/JS emulating a user-based news site in which you can only get your breaking news after you login

## Register.php
#### Simple registration form made with bootstrap styles. Checks against database to find existing username, if none it registers the user and logs her in.

## Login.php
#### Another simple form using bootstrap styling. Checks to see if a user exists and if the password matches the username. Brings you to the index page after successful login.

## Models
#### Only one model which is the Users schema/table. Contains basic text fields with one md5 password hash.

## Views
#### The primary presentation components are located in /includes. Header and Footer and be re-used for each view in fact header is necessary due to all the configuration it holds. News is only viewed once authenticated

## Controllers
#### Two controllers in /controllers are LoginController, UsersController. They provide basic functionality against the database and user session.

## Config
#### Edit the controllers/definitions.php file with your own credentials and variables