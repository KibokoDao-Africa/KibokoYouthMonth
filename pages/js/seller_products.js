$(document).ready(function(){
//e.preventDefault()
let AUTH_BACKEND_URL = 'http://localhost:5000'
let sellProf = document.getElementById("seller_profile")
let addProds = document.getElementById("addNewProducts")
let sellProds = document.getElementById("seller_settings")
let sellSale = document.getElementById("sellerSales")
let sellDisp = document.getElementById("sellerDispatch")
let sellWare = document.getElementById("sellerWarehouses")
let sellTrans = document.getElementById("sellerTransactions")
var isLoggedIn = localStorage.getItem("agroAfric_user_name");
var role = localStorage.getItem("role");
if (typeof isLoggedIn === 'undefined' || isLoggedIn === null || !isLoggedIn || role !== 'seller'){
window.location.href = "/";
}
else{
var UserName = localStorage.getItem("agroAfric_user_name");
$("#name").text(UserName);
var seller_id = localStorage.getItem("seller_id");
//  window.location.href = 'kidney_beans.html?id='+localStorage.getItem("user_id");///http://localhost:5000//agroAfrica/v1/user/profile/" + //localStorage.getItem('user_id') + "complete_profile.html";
//window.location.href = '/profile/'+localStorage.getItem('user_id') +'/' + 'kidney_beans.html';
$.ajax({
url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/fetchProductBySellerID/${seller_id}`,
dataType: "JSON",
contentType: "application/json",
method: "GET",
error: (err) => {
alert("no data exists");
//window.open("http://localhost:4840/")
console.log(err.message)
//window.location.href="/products.html";

},
success: function(results) {
if (results.data.length>0){
var trHTML = '';
$.each(results.data, function (i, item) {
   console.log(item.name);

    trHTML = '<div class="card" id="card_' + item.id + '" value="' + item.id + '"><div class="thumbnail"><img src="' + item.picture + '" alt="product"></div><div class="content" ><a id="click_' + item.id + '"href="#">' + item.name + '</a><a id="navTag_' + item.id +'" href="#" aria-hidden="true"><svg class="arrow-right" id="arrow" aria-hidden="true"><use xlink:href="#arrow-right"/></svg></a></div></div>'
    //</div>' + item.timestamp + '</th><td>' + item.transaction_id + '</td><td>' + item.amount + '</td><td>' + item.from + '</td><td>' + item.payment_mode + '</td><td>' + "success" +  '</td></tr>';
    let currCart = getCategory(item.id);

   //trHTML = '<div class="card" id="card_' + item.id + '" value="' + item.id + '"><div class="thumbnail"><img src="' + item.picture + '" alt="product"></div><div class="content" ><a id="click_' + item.id + '"href="#">' + item.name + '</a><a id="navTag_' + item.id +'" href="#" aria-hidden="true"><svg class="arrow-right" id="arrow" aria-hidden="true"><use xlink:href="#arrow-right"/></svg></a></div></div>'
   //</div>' + item.timestamp + '</th><td>' + item.transaction_id + '</td><td>' + item.amount + '</td><td>' + item.from + '</td><td>' + item.payment_mode + '</td><td>' + "success" +  '</td></tr>';
   if (currCart === 1){
     $('#seller_product_cards').append(trHTML);
   }
   else if (currCart === 4){
     $('#seller_product_cards_coffee').append(trHTML);
   }
   else if (currCart === 3){
     $('#seller_product_cards_flour').append(trHTML);
   }
   else {
     $('#seller_product_cards_grains').append(trHTML);
   }
  //  $('#seller_product_cards').append(trHTML);


});



$('.card a').click(function(e){
e.preventDefault();
var id = $(this).attr('id');
var product_id = id.replace(/[^0-9]/g,'')
//alert(product_id);
localStorage.setItem('product', product_id);

function popupwindow(url, title, w, h) {
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}

var url = '/agroAfrica/v1/user/seller/'+localStorage.getItem('user_id') + '/' + 'updateProduct';
popupwindow(url, "AgroAfrica Update Product", 650, 600);

})
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

$(sellProf).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id'))

$(addProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/createProduct')

$(sellProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/updateSeller')

$(sellSale).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/sales')

$(sellDisp).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/dispatch')

$(sellWare).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/warehouses')

$(sellTrans).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/transactions')

let logout = document.getElementById("logout")
$(logout).click(function(){
  localStorage.setItem('agroAfric_user_name', "");
  localStorage.setItem('user_id',"");
  localStorage.setItem('auth_token_agroAfric',"");
  localStorage.setItem('seller_id', "");
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
