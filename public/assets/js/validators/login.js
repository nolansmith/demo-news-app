/* 
anonymous function that calls on the library of jquery-validate to check login credentials
asynchronously on the login page 
*/

(function() {
    //simple form checker from jquery-validate
    $(document).ready(function() {
      /* validator add-on for alphanumeric validation */
      jQuery.validator.addMethod(
        "alphanumeric",
        function(value, element) {
          return this.optional(element) || /^[\w.]+$/i.test(value);
        },
        "Letters, numbers, and underscores only please"
      );
  
      $("form[name='loginForm']")
        .submit(function(e) {
            e.preventDefault();
        
        })
        .validate({
          rules: {
            login_username: {
              required: true,
              minlength: 4,
              maxlength: 15,
              alphanumeric: true
            },
            login_password: {
              required: true,
              minlength: 6
            }
          },
          messages: {
            login_username: {
              required: "Username required",
              minlength: "At least 4 characters",
              alphanumeric: "Only letters,numbers,underscore",
              maxlength: "Limit 15 characters"
            },
            login_password: {
              required: "Password required",
              minlength: "At least 6 characters"
            }
          },
          submitHandler: function(f) {
              ajaxRequest('login',f);
              
          }
        });
    });
  })();
  