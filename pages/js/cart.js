$(document).ready(function(){
var itemList = $(".quantity");
  itemList.each(function(index, element) {
      var currentItem = $(element);

      currentItem.find(".plus").on('click',function() {
          currentItem.find('.count').val(parseInt(currentItem.find('.count').val()) + 1);
          if (currentItem.find('.count').val() == 26) {
              currentItem.find('.count').val(25);
          }
      });

      currentItem.find(".minus").on('click',function() {
          currentItem.find('.count').val(parseInt(currentItem.find('.count').val()) - 1);
          if (currentItem.find('.count').val() == 0) {
              currentItem.find('.count').val(1);
          }
      });
  })

    var isLoggedIn = localStorage.getItem("agroAfric_user_name");
    console.log(isLoggedIn);
    if (typeof isLoggedIn === 'undefined' || isLoggedIn === null || !isLoggedIn){
      alert("Kindly login or register to add to cart");
    }
    else{
      window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem("role")+'/profile/'+localStorage.getItem("user_id") + '/';




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
          window.location.href = "/index.html";
      }
 })
})



}
});

setInterval(function(){
  const AUTH_BACKEND_URL = 'http://localhost:5000';
    $.ajax({
      url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/${localStorage.getItem("role")}/profile/${localStorage.getItem("user_id")}/`,
      dataType: "JSON",
      contentType: "application/json",
      method: "GET",
      error: (err) => {
        if (err.status === 401){
        alert("Session Expired! Kindly login again");
        localStorage.setItem('agroAfric_user_name', "");
        localStorage.setItem('role', "");
        window.location.href = "/index.html";
      }
      },
      success: function(results){

      }
    });
  }, 1800000);
//



/**
$(document).ready(function(){
$.ajax({
url: `${AUTH_BACKEND_URL}/api/populateTransactions`,
dataType: "JSON",
contentType: "application/json",
method: "GET",
error: (err) => {
alert("no data exists");
//window.open("http://localhost:4840/index.html");
window.location.href="transactions.html";

},
success: async(results) => {
if (results.data.length>0){
var trHTML = '';
$.each(results.data, function (i, item) {
    trHTML += '<tr><th scope="row">' + item.timestamp + '</th><td>' + item.transaction_id + '</td><td>' + item.amount + '</td><td>' + item.from + '</td><td>' + item.payment_mode + '</td><td>' + "success" +  '</td></tr>';
});
$('#transactions').append(trHTML);

}
}
})
}) **/
