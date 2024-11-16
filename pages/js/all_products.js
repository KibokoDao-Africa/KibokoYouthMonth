$(document).ready(function(){
//e.preventDefault(
let AUTH_BACKEND_URL = 'http://localhost:5000'
//  window.location.href = 'kidney_beans.html?id='+localStorage.getItem('user_id');///http://localhost:5000/agroAfrica/v1/user/profile/" + //localStorage.getItem('user_id') + "complete_profile.html";
//window.location.href = '/profile/'+localStorage.getItem('user_id') +'/' + 'kidney_beans.html';
$.ajax({
url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/fetchAll`,
dataType: "JSON",
contentType: "application/json",
method: "GET",
error: (err) => {
alert("no data exists");
//window.open("http://localhost:4840/index.html")
console.log(err.message)
//window.location.href="/products.html";

},
success: function(results) {
if (results.data.length>0){
var trHTML = '';
$.each(results.data, function (i, item) {
     let currCart = getCategory(item.id);

    trHTML = '<div class="card" id="card_' + item.id + '" value="' + item.id + '"><div class="thumbnail"><img src="' + item.picture + '" alt="product"></div><div class="content" ><a id="click_' + item.id + '"href="#">' + item.name + '</a><a id="navTag_' + item.id +'" href="#" aria-hidden="true"><svg class="arrow-right" id="arrow" aria-hidden="true"><use xlink:href="#arrow-right"/></svg></a></div></div>'
    //</div>' + item.timestamp + '</th><td>' + item.transaction_id + '</td><td>' + item.amount + '</td><td>' + item.from + '</td><td>' + item.payment_mode + '</td><td>' + "success" +  '</td></tr>';
    if (currCart === 3 || currCart === 1){
      $('#product_cards').append(trHTML);
    }
    else if (currCart === 2){
      $('#product_cards_coffee').append(trHTML);
    }
    else if (currCart === 4){
      $('#product_cards_flour').append(trHTML);
    }
    else {
      $('#product_cards_grains').append(trHTML);
    }

});

$('.card a').click(function(e){
e.preventDefault();
var id = $(this).attr('id');
var id = id.replace(/[^0-9]/g,'')
//alert(id);
localStorage.setItem('product', id);
alert("Please Register as a Buyer and Shop");
//$("#placement_error_log").html('Please Register as a Buyer and Shop')
})
//console.log(trHTML);
//$('#product_cards').append(trHTML);
//document.body.appendChild(trHTML);
}
}
})

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



 //unction updateElementID(){

 //}
