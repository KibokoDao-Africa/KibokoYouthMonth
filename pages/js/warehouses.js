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
      window.location.href = "/";
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
                window.location.href = "/";
            }
       })
      })

      $(redUse).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id'))

      $(redProd).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/addCategory')

      $(redWare).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/warehouses')

      $(redAdmOrd).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/orders')

      $(redAdmShips).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/shipments')

      $.ajax({
            url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/warehouses`,
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
                     trHTML += '<tr><td>'+item.id+'</td><td>'+item.name+'</td><td>'+item.phone+'</td><td>'+item.email+'</td><td>'+item.street+'</td><td>'+item.city+'</td><td>'+item.state+'</td><td>'+item.country+'</td><td><input class="btn btn-yellow" id="btnUpdate_'+item.id+'" type="submit" value="Update"></td></tr>';

            })
              //trHTML += '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td><input class="btn btn-yellow" type="button" id="addwarehouse" value="Add WareHouse" onclick=""></td></tr>';
              $('#table_warehouses').append(trHTML);
              $('.btn.btn-yellow').click(function(e){
              e.preventDefault();
              var id = $(this).attr('id');
              var warehouse = id.replace(/[^0-9]/g,'');
              console.log(warehouse);
              localStorage.setItem('warehouse', warehouse);
              var url = '/agroAfrica/v1/user/user/'+localStorage.getItem('user_id') + '/' + 'updateWarehouse';
              popupwindow(url, "AgroAfrica Update Warehouse", 650, 600);

              /**$.ajax({
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
              }) **/
              })

              function popupwindow(url, title, w, h) {
                var left = (screen.width/2)-(w/2);
                var top = (screen.height/2)-(h/2);
                return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
              }
          }
        }

      });

      function createPopupWin(pageURL, pageTitle, popupWinWidth, popupWinHeight) {
          var left = (screen.width - popupWinWidth) / 2;
          var top = (screen.height - popupWinHeight) / 4;

          var myWindow = window.open(pageURL, pageTitle,
                  'resizable=yes, width=' + popupWinWidth
                  + ', height=' + popupWinHeight + ', top='
                  + top + ', left=' + left);
      }

      function popupwindow(url, title, w, h) {
        var left = (screen.width/2)-(w/2);
        var top = (screen.height/2)-(h/2);
        return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
      }

      var add = document.getElementById("addwarehouse")
      $(add).click(function(){

        var url = '/agroAfrica/v1/user/user/'+localStorage.getItem('user_id') + '/' + 'addWarehouse';
        //createPopupWin(url, "AgroAfrica Add Warehouse", 1200, 650)
        //'location=yes,height=570,width=520,scrollbars=yes,status=yes'
        //window.open(url,'_blank','resizable=yes,height=650,width=650,left=scrollbars=yes,status=yes');

        popupwindow(url, "AgroAfrica Add Warehouse", 650, 600);
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
          window.location.href = "/admin.html";
        }
        },
        success: function(results){

        }
      });
    }, 1800000);
