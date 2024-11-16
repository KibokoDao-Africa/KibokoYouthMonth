$(document).ready(function(){
  let logout = document.getElementById("logout")
  let redUse = document.getElementById("redirectUsers")
  let redProd = document.getElementById("redirectProduct")
  let redWare = document.getElementById("redirectWarehouse")
  let redAdmOrd = document.getElementById("redirectAdminOrders")
  let redAdmShips = document.getElementById("redirectAdminShipments")
    var isLoggedIn = localStorage.getItem("agroAfric_user_name");
    console.log(isLoggedIn);
    var role = localStorage.getItem("role");
    if (typeof isLoggedIn === 'undefined' || isLoggedIn === null || !isLoggedIn || role !== 'admin'){
      window.location.href = "/admin.html";
    }
    else{
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
                window.location.href = "/admin.html";
            }
       })
      })

      $(redUse).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id'))

      $(redProd).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/addCategory')

      $(redWare).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/warehouses')

      $(redAdmOrd).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/orders')

      $(redAdmShips).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/shipments')

      $.ajax({
            url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/activeOrders`,
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
                     trHTML += '<tr><td>'+item.id+'</td><td>'+item.user_id+'</td><td>'+item.updated_at+'</td><td>'+item.quantity+'</td><td>'+item.sub_total+'</td><td>'+item.status+'</td><td><input class="btn btn-yellow" id="btnFinalize_'+item.id+'" type="submit" value="Finalize"></td></tr>';

            })
              //trHTML += '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td><input class="btn btn-yellow" type="button" id="addwarehouse" value="Add WareHouse" onclick=""></td></tr>';
              $('#table_admin_orders').append(trHTML);
              $('.btn.btn-yellow').click(function(e){
              e.preventDefault();
              var id = $(this).attr('id');
              var order_id = id.replace(/[^0-9]/g,'');
              console.log(order_id);
              $.ajax({
                url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/status/${order_id}`,
                dataType: "JSON",
                contentType: "application/json",
                method: "PUT",
                data: JSON.stringify({
                    'id': order_id,
                    'status' : 'delivered'
                  }),
                error: (err) => {
                alert("error");
                  //return false;
                  //window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/';
                },
                success: function(results){
                    $("#placement_error_log").html('order updated');
                    window.location.href="/admin_orders.html";
                  }
              })
              })
          }
        }

      });

      $.ajax({
            url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/completedOrders`,
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
                     trHTML += '<tr><td>'+item.id+'</td><td>'+item.user_id+'</td><td>'+item.updated_at+'</td><td>'+item.quantity+'</td><td>'+item.sub_total+'</td><td>'+item.status+'</td><td><input class="btn btn-red" id="btnDispute_'+item.id+'" type="submit" value="Dispute"></td></tr>';

            })
              //trHTML += '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td><input class="btn btn-yellow" type="button" id="addwarehouse" value="Add WareHouse" onclick=""></td></tr>';
              $('#table_admin_completed_orders').append(trHTML);
              $('.btn.btn-red').click(function(e){
              e.preventDefault();
              var id = $(this).attr('id');
              var order_id = id.replace(/[^0-9]/g,'');
              console.log(order_id);
              $.ajax({
                url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/status/${order_id}`,
                dataType: "JSON",
                contentType: "application/json",
                method: "PUT",
                data: JSON.stringify({
                    'id': order_id,
                    'status' : 'returned'
                  }),
                error: (err) => {
                alert("error");
                  //return false;
                  //window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/';
                },
                success: function(results){
                    $("#placement_error_log").html('order disputed');
                    window.location.href="/admin_orders.html";
                  }
              })
              })
            }
          }
            });
    }
  })


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
          window.location.href = "/admin.html";
        }
        },
        success: function(results){

        }
      });
    }, 1800000);
