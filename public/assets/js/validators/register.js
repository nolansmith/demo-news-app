/* 
anonymous function that calls on the library of jquery-validate to check registration credentials
asynchronously on the registration page 
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
  
      $("form[name='regForm']")
        .submit(function(e) {
          e.preventDefault();
  
        })
        .validate({
          rules: {
            register_first_name: {
              required: true,
              minlength: 4,
              maxlength: 15
            },
            register_last_name: {
              required: true,
              minlength: 4,
              maxlength: 15
            },
            register_username: {
              required: true,
              minlength: 4,
              alphanumeric: true,
              maxlength: 15
            },
            register_password: {
              required: true,
              minlength: 6
            }
          },
          messages: {
            register_first_name: {
              required: "First Name required",
              minlength: "At least 4 characters",
              maxlength: "15 characters max"
            },
            register_last_name: {
              required: "Last Name required",
              minlength: "At least 4 characters",
              maxlength: "15 characters max"
            },
            register_username: {
              required: "Username required",
              minlength: "At least 4 characters",
              alphanumeric: "Letters, numbers, and underscores only!",
              maxlength: "15 characters max"
            },
            register_password: {
              required: "Password required",
              minlength: "Password must be at least 6 characters"
            }
          },
          submitHandler: function(f) {
            ajaxRequest('register', f);
          }
        });
    });
  })();
  