    $(document).ready(function(){
        $("#resetPwd").click(function(e){
            e.preventDefault()

            function refresh(){
              $("#username").val('')
              $("#newPassword").val('')
              $("#confirmPassword").val('')
            }
              let AUTH_BACKEND_URL = 'http://localhost:5000';
              let email = document.getElementById('username').value
              let password = document.getElementById('newPassword').value

              if(email === '') {
                  $("#placement_error").html('*Email is required')
                  return
              }
              if(password === '') {
                  $("#placement_error").html('*Password is required')
                  return
              }
              $.ajax({
                    url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/updatePassword`,
                    dataType: "JSON",
                    contentType: "application/json",
                    method: "POST",
                    data: JSON.stringify({
                        'email': email,
                        'password' : password
                    }),
                    error: (err) => {
                      refresh();
                        if(err.status === 403) {
                            //alert(err.message);
                            $("#placement_error").html('User Not Registered or Wrong Email');
                        }
                        else{
                          $("#placement_error").html('Incorrect Details or Server Error');
                        }
                    },
                    success: function (results) {
                        alert("password successfully reset");
                        refresh();
                        window.location.href = "/index.html";
                    }
            })
          })
        })

        var cartItems = document.querySelector('.nav a span');
        console.log(cartItems);
        //var cartItems = document.getElementById('cartItems');
        setInterval(function(){
          if (cartItems.text !== localStorage.getItem('cart')) {
            cartItems.text = localStorage.getItem('cart');
          }
        }, 1000);
