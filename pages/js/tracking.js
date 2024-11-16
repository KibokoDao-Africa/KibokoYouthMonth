$(document).ready(function(){
  // var sid = document.cookies.sid;//'<%=Session["sid"] %>';//'@Session["email"]';//$.cookie('sid');sessionStoragesessionStorage
  //  console.log(sid);                           //<%= Session["sid"]
    var isLoggedIn = localStorage.getItem("agroAfric_user_name");
    let custProf = document.getElementById("user_profile")
    let custProds = document.getElementById("customerProducts")
    let custShips = document.getElementById("customerShipments")
    let custOrds = document.getElementById("customerOrders")
    let custPays = document.getElementById("customerPayments")
    let custTrans = document.getElementById("customerTransactions")
    let custTracks = document.getElementById("user_settings")
    let custCart = document.getElementById("customerCart")
    console.log(isLoggedIn);
    if (typeof isLoggedIn === 'undefined' || isLoggedIn === null || !isLoggedIn){
      window.location.href = "/";
    }
    else{
      //var cart_items = localStorage.getItem("cart");
      //$('#cartItems').text(cart_items);
      var UserName = localStorage.getItem("agroAfric_user_name");
     $("#name").text(UserName)
      let AUTH_BACKEND_URL = 'http://localhost:5000';
      let logout = document.getElementById("logout")
      $(logout).click(function(){
        localStorage.setItem('agroAfric_user_name', "");
        //$("#name").html('');
        localStorage.setItem('user_id',"");
        localStorage.setItem('auth_token_agroAfric',"");
        localStorage.setItem('product', "");
        localStorage.setItem('cart', "");
        localStorage.setItem('product', "");
        localStorage.setItem('cart_id', "");
        localStorage.setItem('order', "");
        localStorage.setItem('order_id', "");
        localStorage.setItem('role', "");
      $.ajax({
            url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/logout`,
            dataType: "JSON",
            contentType: "application/json",
            method: "POST",
            data : {},
            error: (err) => {
                $("#placement_error_log").html(err.mesage);
             },
            success: function (results) {
                window.location.href = "/";
            }
       })
      })
      $(custProf).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id'))

      $(custProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/products')

      $(custShips).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/shipments')

      $(custOrds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/orders')

      $(custPays).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/payments')

      $(custTrans).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/transactions')

      $(custTracks).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/update')

      $(custCart).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/cart')

      }
      });
      var cartItems = document.querySelector('.nav a span');
      console.log(cartItems);
      //var cartItems = document.getElementById('cartItems');
      setInterval(function(){
        if (cartItems.text !== localStorage.getItem("cart")) {
          cartItems.text = localStorage.getItem("cart");
        }
      }, 1000);

      setInterval(function(){
        const BACKEND_URL = 'http://localhost:5000';
          $.ajax({
            url: `${BACKEND_URL}/agroAfrica/v1/user/${localStorage.getItem("role")}/profile/${localStorage.getItem("user_id")}/`,
            dataType: "JSON",
            contentType: "application/json",
            method: "GET",
            error: (err) => {
              if (err.status === 401){
              alert("Session Expired! Kindly login again");
              localStorage.setItem('agroAfric_user_name', "");
              localStorage.setItem('role', "");
              window.location.href = "/";
            }
            },
            success: function(results){

            }
          });
        }, 1800000);
