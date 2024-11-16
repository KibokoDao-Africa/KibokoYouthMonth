$(document).ready(function(){
//e.preventDefault()
let AUTH_BACKEND_URL = 'http://localhost:5000'
let custProf = document.getElementById("user_profile")
let custProds = document.getElementById("customerProducts")
let custShips = document.getElementById("customerShipments")
let custOrds = document.getElementById("customerOrders")
let custPays = document.getElementById("customerPayments")
let custTrans = document.getElementById("user_settings")
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
//window.location.href = '/profile/'+localStorage.getItem('user_id') +'/' + 'kidney_beans.html'; fetchTxByUser/${user_id}
let user_id = localStorage.getItem("user_id");
  $.ajax({
  		url: `${AUTH_BACKEND_URL}/agroAfrica/v1/transactions/fetchTxByUser/${user_id}`,
  		dataType: "JSON",
  		contentType: "application/json",
  		method: "GET",
  		error: (err) => {
  			alert("no data exists");
  		 //window.open("http://localhost:4840/");
  		 window.location.href="/";

  		},
  		success: function(results) {
  			if (results.data.length>0){
  			var trHTML = '';
  				$.each(results.data, function (i, item) {
            if(item.mode === 'ether'){
            trHTML += '<tr><td>' + item.id + '</td><td> <a href="http://rinkeby.etherscan.io/tx/' + item.reference_no + '">'+item.reference_no+'</a></td><td>' + item.date + '</td><td>$' + item.amount + '</td><td>' + item.mode + '</td><td>' + item.explanation  +  '</td><td>' + item.status  +  '</td></tr>';
          }
          else
          {
            trHTML += '<tr><td>' + item.id + '</td><td>' + item.reference_no + '</td><td>' + item.date + '</td><td>$' + item.amount + '</td><td>' + item.mode + '</td><td>' + item.explanation  +  '</td><td>' + item.status  +  '</td></tr>';
          }
  				});
  				$('#table_transactions').append(trHTML);

  }
  }
  })

  $(custProf).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id'))

  $(custProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/products')

  $(custShips).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/shipments')

  $(custOrds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/orders')

  $(custPays).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/payments')

  $(custTrans).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/update')

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
