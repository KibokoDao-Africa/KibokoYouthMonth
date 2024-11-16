$(document).ready(function(){
//e.preventDefault()
let AUTH_BACKEND_URL = 'http://localhost:5000'
let sellProf = document.getElementById("seller_profile")
let addProds = document.getElementById("addNewProducts")
let sellProds = document.getElementById("sellerProducts")
let sellSale = document.getElementById("seller_settings")
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
var UserName = localStorage.getItem("agroAfric_user_name");
$("#name").text(UserName)
let AUTH_BACKEND_URL = 'http://localhost:5000'
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

$(sellProf).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id'))

$(addProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/createProduct')

$(sellProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/products')

$(sellSale).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/updateSeller')

$(sellDisp).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/dispatch')

$(sellWare).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/warehouses')

$(sellTrans).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/transactions')


$.ajax({
      url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/tradedItem/${seller_id}`,
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
         let name = {};
          if (results.data.length>0){
          //console.log("here");
          $.each(results.data, function (i, item) {
               name = getProductName(item.product_id);
               trHTML += '<tr><td>'+item.updated_at+'</td><td>'+item.order_id+'</td><td>'+name.name+'</td><td>'+item.payment_mode+'</td><td>'+item.status+'</td></tr>';

      })
        //trHTML += '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td><input class="btn btn-yellow" type="button" id="addwarehouse" value="Add WareHouse" onclick=""></td></tr>';
        $('#table_sales').append(trHTML);

    }
  }

});

function getProductName(id){
  var product = {};
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
        product.name = results.data[0].name;
        product.picture = results.data[0].picture;
        console.log(product);
        }
      }
})

return product;
}


}
});

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
