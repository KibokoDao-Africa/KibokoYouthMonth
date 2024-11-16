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
            url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/customers`,
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
                    if (item.flag === 1 ){
                    trHTML += '<tr><td>'+item.id+'</td><td>'+item.name+'</td><td>'+item.email+'</td><td>'+item.street+'</td><td>'+item.city+'</td><td>'+item.country+'</td><td class="bg-green">'+item.created_at+'</td><td><input class="btn btn-red" id="btnFlag_'+item.id+'" type="submit" value="Flag"></td></tr>';
                  }
                  else {
                    trHTML += '<tr><td>'+item.id+'</td><td>'+item.name+'</td><td>'+item.email+'</td><td>'+item.street+'</td><td>'+item.city+'</td><td>'+item.country+'</td><td class="bg-green">'+item.created_at+'</td><td><input class="btn btn-grey" id="btnActivate_'+item.id+'" type="submit" value="Activate"></td></tr>';
                   }
           })

             $('#table_admin_users').append(trHTML);
             $('.btn.btn-red').click(function(e){
             e.preventDefault();
             var id = $(this).attr('id');
             var user_id = id.replace(/[^0-9]/g,'');
             console.log(user_id);
             $.ajax({
               url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/deActivate/${user_id}`,
               dataType: "JSON",
               contentType: "application/json",
               method: "PUT",
               data: JSON.stringify({
                   'id': user_id
                 }),
               error: (err) => {
               alert("error");
                 //return false;
                 //window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/';
               },
               success: function(results){
                   $("#placement_error_log").html('user deactivated');
                   window.location.href="/admin_users.html";
                 }
             })
             })

             $('.btn.btn-grey').click(function(e){
             e.preventDefault();
             var id = $(this).attr('id');
             var user_id = id.replace(/[^0-9]/g,'');
             console.log(user_id);
             $.ajax({
               url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/activate/${user_id}`,
               dataType: "JSON",
               contentType: "application/json",
               method: "PUT",
               data: JSON.stringify({
                   'id': user_id
                 }),
               error: (err) => {
               alert("error");
                 //return false;
                 //window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/';
               },
               success: function(results){
                   $("#placement_error_log").html('user activated');
                   window.location.href="/admin_users.html";
                 }
             })
             })

        }
      }

      });

      $.ajax({
            url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/fetchSellers`,
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
                    if (item.flag === 1 && item.verified_account === 1){
                    trHTML += '<tr><td>'+item.id+'</td><td>'+item.name+'</td><td>'+item.email+'</td><td>'+item.street+'</td><td>'+item.city+'</td><td>'+item.country+'</td><td class="bg-green">'+item.created_at+'</td><td><input class="btn btn-red" id="btnFlagSeller_'+item.id+'" type="submit" value="Flag"></td></tr>';
                  }
                  else if (item.flag === 1 && item.verified_account !== 1){
                  trHTML += '<tr><td>'+item.id+'</td><td>'+item.name+'</td><td>'+item.email+'</td><td>'+item.street+'</td><td>'+item.city+'</td><td>'+item.country+'</td><td class="bg-green">'+item.created_at+'</td><td><input class="btn btn-yellow" id="btnVerify_'+item.id+'" type="submit" value="Verify"></td></tr>';
                }
                  else {
                    trHTML += '<tr><td>'+item.id+'</td><td>'+item.name+'</td><td>'+item.email+'</td><td>'+item.street+'</td><td>'+item.city+'</td><td>'+item.country+'</td><td class="bg-green">'+item.created_at+'</td><td><input class="btn btn-grey" id="btnActivateSeller_'+item.id+'" type="submit" value="Activate"></td><td><input class="btn btn-yellow" id="btnVerFlagged_'+item.id+'" type="submit" value="Verify"></td></tr>';
                   }
           })

             $('#table_admin_sellers').append(trHTML);

             $('.btn.btn-red').click(function(e){
             e.preventDefault();
             var id = $(this).attr('id');
             var user_id = id.replace(/[^0-9]/g,'');
             console.log(user_id);
             $.ajax({
               url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/deActivateSeller/${user_id}`,
               dataType: "JSON",
               contentType: "application/json",
               method: "PUT",
               data: JSON.stringify({
                   'id': user_id
                 }),
               error: (err) => {
               alert("error");
                 //return false;
                 //window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/';
               },
               success: function(results){
                   $("#placement_error_log").html('seller deactivated');
                   window.location.href="/admin_users.html";
                 }
             })
             })

             $('.btn.btn-yellow').click(function(e){
             e.preventDefault();
             var id = $(this).attr('id');
             var user_id = id.replace(/[^0-9]/g,'');
             console.log(user_id);
             $.ajax({
               url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/verifySeller/${user_id}`,
               dataType: "JSON",
               contentType: "application/json",
               method: "PUT",
               data: JSON.stringify({
                   'id': user_id
                 }),
               error: (err) => {
               alert("error");
                 //return false;
                 //window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/';
               },
               success: function(results){
                   $("#placement_error_log").html('seller verified');
                   window.location.href="/admin_users.html";
                 }
             })
             })

             $('.btn.btn-grey').click(function(e){
             e.preventDefault();
             var id = $(this).attr('id');
             var user_id = id.replace(/[^0-9]/g,'');
             console.log(user_id);
             $.ajax({
               url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/activateSeller/${user_id}`,
               dataType: "JSON",
               contentType: "application/json",
               method: "PUT",
               data: JSON.stringify({
                   'id': user_id
                 }),
               error: (err) => {
               alert("error");
                 //return false;
                 //window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/';
               },
               success: function(results){
                   $("#placement_error_log").html('seller activated');
                   window.location.href="/admin_users.html";
                 }
             })
             })

        }
      }

      });
    }
  })

  setInterval(function(){
    const AUTH_BACKEND_URL = 'http://localhost:3000';
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
