$(document).ready(function(){
    var isLoggedIn = localStorage.getItem("agroAfric_user_name");
    let sellProf = document.getElementById("seller_profile")
    let addProds = document.getElementById("addNewProducts")
    let sellProds = document.getElementById("sellerProducts")
    let sellSale = document.getElementById("sellerSales")
    let sellDisp = document.getElementById("seller_settings")
    let sellWare = document.getElementById("sellerWarehouses")
    let sellTrans = document.getElementById("sellerTransactions")
    var role = localStorage.getItem("role");
    console.log(isLoggedIn);
    if (typeof isLoggedIn === 'undefined' || isLoggedIn === null || !isLoggedIn || role !== 'seller'){
      window.location.href = "/";
    }
    else{
      var cart_items = localStorage.getItem("cart");
      //$('#cartItems').text(cart_items);
      var UserName = localStorage.getItem("agroAfric_user_name");
     $("#name").text(UserName)
      let AUTH_BACKEND_URL =  'http://localhost:5000';
      let user_id = localStorage.getItem('user_id');
      var seller_id = localStorage.getItem("seller_id");
      $.ajax({
            url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/fetchProductBySellerID/${seller_id}`,
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
                /** for (var counter = 0; counter < results.data.length; counter++){
                    let countShips = getProductShipMent(results.data[counter].id);
                    if (countShips && countShips.length > 0){
                     //$.each(countShips.data, function (i, item) {
                     for (var count = 0; count < countShips.length; count++){
                     trHTML += '<tr><td>'+countShips[count].order_id+'</td><td>'+countShips[count].id+'</td><td>'+countShips[count].updated_at+'</td><td>'+countShips[count].carier_company+'</td><td>'+countShips[count].tracking_id+'</td><td class="bg-green">'+countShips[count].status+'</td><td><input class="btn btn-yellow" id="btnDispatch_'+countShips[count].id+'" type="submit" value="Dispatch"></td></tr>';
                  // });

                    }
                   }
                 } **/
            //})
            let countShips = getProductShipMent(seller_id);
            if (countShips && countShips.length > 0){
              console.log(countShips.length)
             //$.each(countShips.data, function (i, item) {
             for (var count = 0; count < countShips.length; count++){
             trHTML += '<tr><td>'+countShips[count].order_id+'</td><td>'+countShips[count].id+'</td><td>'+countShips[count].updated_at+'</td><td>'+countShips[count].carier_company+'</td><td>'+countShips[count].tracking_id+'</td><td class="bg-green">'+countShips[count].status+'</td><td><input class="btn btn-yellow" id="btnDispatch_'+countShips[count].id+'" type="submit" onClick="" value="Dispatch"></td></tr>';
          // });
            }
          }

              $('#table_dispatch_shipments').append(trHTML);
              $('.btn.btn-yellow').click(function(e){
              e.preventDefault();
              var id = $(this).attr('id');
              var shipment_id = id.replace(/[^0-9]/g,'');
              console.log(shipment_id);
              $.ajax({
                url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/ship/${shipment_id}`,
                dataType: "JSON",
                contentType: "application/json",
                method: "PUT",
                data: JSON.stringify({
                    'id': shipment_id,
                    'status' : 'shipped'
                  }),
                error: (err) => {
                alert("error");
                  //return false;
                  //window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/';
                },
                success: function(results){
                    $("#placement_error_log").html('shipment shipped');
                    window.location.href="/dispatch_shipment.html";
                  }
              })
            })
          }
        }

});

$(sellProf).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id'))

$(addProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/createProduct')

$(sellProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/products')

$(sellSale).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/sales')

$(sellDisp).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/updateSeller')

$(sellWare).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/warehouses')

$(sellTrans).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/transactions')

function getProductShipMent(id){
  var productShips = [];
  $.ajax({
    url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/shipmentSeller/${id}`,
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
        productShips = results.data;
        console.log(productShips);
        }
      }
})

return productShips;
}

 /** function getProductCategory(id){
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
        window.location.href = "/";
      }
      },
      success: function(results){

      }
    });
  }, 1800000);
