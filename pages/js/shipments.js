$(document).ready(function(){
    var isLoggedIn = localStorage.getItem("agroAfric_user_name");
    let custProf = document.getElementById("user_profile")
    let custProds = document.getElementById("customerProducts")
    let custShips = document.getElementById("user_settings")
    let custOrds = document.getElementById("customerOrders")
    let custPays = document.getElementById("customerPayments")
    let custTrans = document.getElementById("customerTransactions")
    let custTracks = document.getElementById("customerTracking")
    let custCart = document.getElementById("customerCart")
    var role = localStorage.getItem("role");
    console.log(isLoggedIn);
    if (typeof isLoggedIn === 'undefined' || isLoggedIn === null || !isLoggedIn || role !== 'customer'){
      window.location.href = "/";
    }
    else{
      var cart_items = localStorage.getItem("cart");
      //$('#cartItems').text(cart_items);
      var UserName = localStorage.getItem("agroAfric_user_name");
     $("#name").text(UserName)
      let AUTH_BACKEND_URL = 'http://localhost:5000';
      let user_id = localStorage.getItem("user_id");
      $.ajax({
            url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/shipment/${user_id}`,
            dataType: "JSON",
            contentType: "application/json",
            method: "GET",
            error: (err) => {
                if(err.status === 401) {
                  alert("kindly login again");
                  window.location.href = "/";
                }
                else{
                  $("#placement_error_log").html(err.message);
                }
            },
            success: function(results) {
               var trHTML = '';
                if (results.data.length>0){
                //console.log("here");
                $.each(results.data, function (i, item) {
                     trHTML += '<tr><td>'+item.order_id+'</td><td>'+item.id+'</td><td>'+item.updated_at+'</td><td>'+item.carier_company+'</td><td>'+item.carier_id+'</td><td>'+item.tracking_id+'</td><td class="bg-green">'+item.status+'</td></tr>';

            })

              $('#table_shipments').append(trHTML);

          }
        }

});

/** function getProductName(id){
  var productName = null;
  $.ajax({
    url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/fetchProd/${id}`,
    dataType: "JSON",
    contentType: "application/json",
    method: "GET",
    async: false,
    error: (err) => {
    alert("error");
      //return false;
      //window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/';
    },
    success: function(results){
      if (results.data.length>0){
        productName = results.data[0].name;
        console.log(productName);
        }
      }
})

return productName;
}

 function getProductCategory(id){
  var productName = null;
  $.ajax({
    url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/fetchCategory/${id}`,
    dataType: "JSON",
    contentType: "application/json",
    method: "GET",
    async: false,
    error: (err) => {
    alert("error");
      //return false;
      //window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/';
    },
    success: function(results){
      if (results.data.length>0){
        productName = results.data[0].name;
        console.log(productName);
        }
      }
})

return productName;
} **/

$(custProf).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id'))

$(custProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/products')

$(custShips).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/update')

$(custOrds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/orders')

$(custPays).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/payments')

$(custTrans).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/transactions')

$(custTracks).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/tracking')

$(custCart).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/cart')


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
