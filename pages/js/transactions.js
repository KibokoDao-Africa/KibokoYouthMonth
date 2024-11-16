$(document).ready(function(){
//e.preventDefault()
let AUTH_BACKEND_URL = 'http://localhost:5000'
let sellProf = document.getElementById("seller_profile")
let addProds = document.getElementById("addNewProducts")
let sellProds = document.getElementById("sellerProducts")
let sellSale = document.getElementById("sellerSales")
let sellDisp = document.getElementById("sellerDispatch")
let sellWare = document.getElementById("sellerWarehouses")
let sellTrans = document.getElementById("seller_settings")
var isLoggedIn = localStorage.getItem("agroAfric_user_name");
var role = localStorage.getItem("role");
if (typeof isLoggedIn === 'undefined' || isLoggedIn === null || !isLoggedIn || role !== 'seller'){
window.location.href = "/";
}
else{
var UserName = localStorage.getItem("agroAfric_user_name");
$("#name").text(UserName)
//  window.location.href = 'kidney_beans.html?id='+localStorage.getItem("user_id");///http://localhost:5000//agroAfrica/v1/user/profile/" + //localStorage.getItem('user_id') + "complete_profile.html";
//window.location.href = '/profile/'+localStorage.getItem('user_id') +'/' + 'kidney_beans.html'; fetchTxByUser/${user_id}
let user_id = localStorage.getItem("user_id");
let seller_id = localStorage.getItem("seller_id");
  $.ajax({
  		url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/tradedItem/${seller_id}`,
  		dataType: "JSON",
  		contentType: "application/json",
  		method: "GET",
  		error: (err) => {
  			alert("no data exists");
  		 //window.open("http://localhost:4840/");
  		 //window.location.href="/.html";

  		},
  		success: function(results) {
  			if (results.data.length>0){
       for (var order_count = 0; order_count < results.data.length; order_count++){
  			var trHTML = '';
        /** let countSellerShips;
        if (order_count > 0){
        if (results.data[order_count - 1 ].order_id !== results.data[order_count].order_id){
           countSellerShips = getSellerTransactions(seller_id, results.data[order_count].order_id)
         }
       } **/
         //if (order_count === 0) {
          let  countSellerShips = getSellerTransactions(seller_id, results.data[order_count].order_id, results.data[order_count].product_id);
         //}
        if (countSellerShips && countSellerShips.length > 0){
          console.log(countSellerShips.length)
         //$.each(countSellerShips.data, function (i, item) {
         for (var count = 0; count < countSellerShips.length; count++){
           if(countSellerShips[count].mode === 'ether'){
           trHTML += '<tr><td>' + countSellerShips[count].id + '</td><td> <a href="http://rinkeby.etherscan.io/tx/' + countSellerShips[count].reference_no + '">'+countSellerShips[count].reference_no+'</a></td><td>' + countSellerShips[count].date + '</td><td>$' + countSellerShips[count].amount + '</td><td>' + countSellerShips[count].mode + '</td><td>' + countSellerShips[count].explanation  +  '</td><td>' + countSellerShips[count].status  +  '</td></tr>';
         }
         else
         {
           trHTML += '<tr><td>' + countSellerShips[count].id + '</td><td>' + countSellerShips[count].reference_no + '</td><td>' + countSellerShips[count].date + '</td><td>$' + countSellerShips[count].amount + '</td><td>' + countSellerShips[count].mode + '</td><td>' + countSellerShips[count].explanation  +  '</td><td>' + countSellerShips[count].status  +  '</td></tr>';
         }
      // });
        }
      }
      //trHTML += '<tr><td>'+countSellerShips[count].order_id+'</td><td>'+countSellerShips[count].id+'</td><td>'+countSellerShips[count].updated_at+'</td><td>'+countSellerShips[count].carier_company+'</td><td>'+countSellerShips[count].tracking_id+'</td><td class="bg-green">'+countSellerShips[count].status+'</td><td><input class="btn btn-yellow" id="btnDispatch_'+countSellerShips[count].id+'" type="submit" onClick="" value="Dispatch"></td></tr>';
  				/** $.each(results.data, function (i, countSellerShips[count]) {
            if(item.mode === 'ether'){
            trHTML += '<tr><td>' + item.id + '</td><td> <a href="http://rinkeby.etherscan.io/tx/' + item.reference_no + '">'+item.reference_no+'</a></td><td>' + item.date + '</td><td>$' + item.amount + '</td><td>' + item.mode + '</td><td>' + item.explanation  +  '</td><td>' + item.status  +  '</td></tr>';
          }
          else
          {
            trHTML += '<tr><td>' + item.id + '</td><td>' + item.reference_no + '</td><td>' + item.date + '</td><td>$' + item.amount + '</td><td>' + item.mode + '</td><td>' + item.explanation  +  '</td><td>' + item.status  +  '</td></tr>';
          }
        }); **/


  }
  $('#table_transactions').append(trHTML);
  }
}
})

  function getSellerTransactions(id, order, product){
    var sellerShips = [];
    $.ajax({
      url: `${AUTH_BACKEND_URL}/agroAfrica/v1/transactions/fetchTxBySeller/${id}/${order}/${product}`,
      dataType: "JSON",
      contentType: "application/json",
      method: "GET",
      async: false,
      error: (err) => {
      alert("error");
      },
      success: function(results){
        if (results.data.length>0){
          sellerShips = results.data;
          console.log(sellerShips);
          }
        }
  })

  return sellerShips;
  }

  $(sellProf).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id'))

  $(addProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/createProduct')

  $(sellProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/products')

  $(sellSale).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/sales')

  $(sellDisp).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/dispatch')

  $(sellWare).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/warehouses')

  $(sellTrans).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/updateSeller')

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
