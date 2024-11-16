$(document).ready(function(){
//e.preventDefault()
let AUTH_BACKEND_URL = 'http://localhost:5000'
let custProf = document.getElementById("user_profile")
let custProds = document.getElementById("user_settings")
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
//  window.location.href = 'kidney_beans.html?id='+localStorage.getItem("user_id");///http://localhost:5000//agroAfrica/v1/user/profile/" + //localStorage.getItem('user_id') + "complete_profile.html";
//window.location.href = '/profile/'+localStorage.getItem('user_id') +'/' + 'kidney_beans.html';
$.ajax({
url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/fetchAll`,
dataType: "JSON",
contentType: "application/json",
method: "GET",
error: (err) => {
alert("no data exists");
$("#placement_error_log").html('no data exists');
//window.open("http://localhost:4840/")
console.log(err.message)

//window.location.href="/products.html";

},
success: function(results) {
if (results.data.length>0){
var trHTML = '';
$.each(results.data, function (i, item) {
   console.log(item.name);
/**   if (i === results.data.length - 1)
   {
      prod_id = item.product_id;
   }
   else if (i === 0)
   {
     prod_id = item.product_id;
}
  else {
    prod_id = item.product_id;

  } **/

    trHTML = '<div class="card" id="card_' + item.id + '" value="' + item.id + '"><div class="thumbnail"><img src="' + item.picture + '" alt="product"></div><div class="content" ><a id="click_' + item.id + '"href="#">' + item.name + '</a><a id="navTag_' + item.id +'" href="#" aria-hidden="true"><svg class="arrow-right" id="arrow" aria-hidden="true"><use xlink:href="#arrow-right"/></svg></a></div></div>'
    //</div>' + item.timestamp + '</th><td>' + item.transaction_id + '</td><td>' + item.amount + '</td><td>' + item.from + '</td><td>' + item.payment_mode + '</td><td>' + "success" +  '</td></tr>';

    //$('#user_product_cards').append(trHTML);
    let currCart = getCategory(item.id);
    if (currCart === 1){
      $('#user_product_cards').append(trHTML);
    }
  else if (currCart === 4){
    $('#user_product_cards_coffee').append(trHTML);
  }
  else if (currCart === 3){
    $('#user_product_cards_flour').append(trHTML);
  }
  else {
    $('#user_product_cards_grains').append(trHTML);
  }

});

$('.card a').click(function(e){
e.preventDefault();
var id = $(this).attr('id');
var product_id = id.replace(/[^0-9]/g,'')
//alert(product_id);
localStorage.setItem('product', product_id);
window.location.href = "/kidney_beans.html"
})
//console.log(trHTML);
//$('#product_cards').append(trHTML);
//document.body.appendChild(trHTML);
}
}
})

$(custProf).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id'))

$(custProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/update')

$(custShips).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/shipments')

$(custOrds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/orders')

$(custPays).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/payments')

$(custTrans).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/transactions')

$(custTracks).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/tracking')

$(custCart).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/cart')

function getCategory(product_id){
  var prodCart = null;
  $.ajax({
    url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/category/${product_id}`,
    dataType: "JSON",
    contentType: "application/json",
    method: "GET",
    async: false,
    error: (err) => {
    alert("error");
    },
    success: function(results){
      if (results.data.length > 0){
        prodCart = results.data[0].category_id;
        console.log(prodCart);

        }
      }
})

return prodCart;
}

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
})

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
