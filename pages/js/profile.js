$(document).ready(function(){
  let AUTH_BACKEND_URL = 'http://localhost:5000';
  let custProf = document.getElementById("user_profile")
  let custSet = document.getElementById("user_settings")
  let custProds = document.getElementById("customerProducts")
  let custShips = document.getElementById("customerShipments")
  let custOrds = document.getElementById("customerOrders")
  let custPays = document.getElementById("customerPayments")
  let custTrans = document.getElementById("customerTransactions")
  let custTracks = document.getElementById("customerTracking")
  let custCart = document.getElementById("customerCart")

  var isLoggedIn = localStorage.getItem("agroAfric_user_name");
  var role = localStorage.getItem("role");
  if (typeof isLoggedIn === 'undefined' || isLoggedIn === null || !isLoggedIn || role !== 'customer'){
  window.location.href = "/";
  }
  else{
  var UserName = localStorage.getItem("agroAfric_user_name");
  $("#name").text(UserName)
  var user = localStorage.getItem("user_id");
  var UserName = localStorage.getItem("agroAfric_user_name");
  $("#name").text(UserName);
  $.ajax({
    url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/fetch/${user}`,
    dataType: "JSON",
    contentType: "application/json",
    method: "GET",
    error: (err) => {
      alert("error");
      window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/';
    },
    success: function(results){
      if (results.data.length>0){
        console.log(results.data);
        $("#user_name").val(results.data[0].name)
        $("#email").val(results.data[0].email)
        $("#telephone").val(results.data[0].phone)
        $("#street").val(results.data[0].street)
        $("#city").val(results.data[0].city)
        $("#zipcode").val(results.data[0].zipcode)
        $("#state").val(results.data[0].state)
        $("#country").val(results.data[0].country)
        $("#about").val(results.data[0].about_me)
      }
    }
  })

  $(custProf).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id'))
  
  $(custProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/update')

  $(custProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/products')

  $(custShips).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/shipments')

  $(custOrds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/orders')

  $(custPays).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/payments')

  $(custTrans).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/transactions')

  $(custTracks).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/tracking')

  $(custCart).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/cart')

var update = document.getElementById("updateProfile")
$(update).click(function(){
  window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role') +'/profile/'+localStorage.getItem('user_id') + '/' + 'update';
})

var logout = document.getElementById("logout")
//  window.location.href = 'kidney_beans.html?id='+localStorage.getItem("user_id");///http://localhost:5000//agroAfrica/v1/user/profile/" + //localStorage.getItem('user_id') + "complete_profile.html";

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
}
})

var cartItems = document.querySelector('.nav a span');
console.log(cartItems);
//var cartItems = document.getElementById('cartItems');
setInterval(function(){
  if (cartItems.text !== localStorage.getItem("cart")) {
    cartItems.text = localStorage.getItem("cart");
  }
}, 1000);

$(document).ready(function(){
  const BACKEND_URL = 'http://localhost:5000';
  let profile = "profile";
    $.ajax({
      url: `${BACKEND_URL}/agroAfrica/v1/user/${localStorage.getItem("role")}/${profile}/${localStorage.getItem("user_id")}/`,
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
       window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/';
      }
    })
  });
