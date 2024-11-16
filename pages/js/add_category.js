$(document).ready(function(){
/**  $(window).on('load', function(){
  //  e.preventDefault()
    var isLoggedIn = localStorage.getItem("agroAfric_user_name");
    console.log(isLoggedIn);
    if (typeof isLoggedIn === 'undefined' || isLoggedIn === null || !isLoggedIn){
      window.location.href = "/index.html";
    }
    else{
      var UserName = localStorage.getItem("agroAfric_user_name");
      $("#name").text(UserName)
      //window.location.href = 'complete_profile.html?id='+localStorage.getItem("user_id");///http://localhost:5000//agroAfrica/v1/user/profile/" + //localStorage.getItem('user_id') + "complete_profile.html";
    }
  })
}) **/
var logout = document.getElementById("logout");
let redUse = document.getElementById("redirectUsers")
let redProd = document.getElementById("redirectProduct")
let redWare = document.getElementById("redirectWarehouse")
let redAdmOrd = document.getElementById("redirectAdminOrders")
let redAdmShips = document.getElementById("redirectAdminShipments")
var isLoggedIn = localStorage.getItem("agroAfric_user_name");
var role = localStorage.getItem("role");
//console.log(isLoggedIn);
let cookie = "sid";
var isCookie = getCookie(cookie);
console.log(isCookie);
var existCook = getCook(cookie);
console.log(existCook)
if (typeof isLoggedIn === 'undefined' || isLoggedIn === null || !isLoggedIn || role !== 'admin'){
  window.location.href = "/admin.html";
}
else{
var AUTH_BACKEND_URL = 'http://localhost:5000'
var UserName = localStorage.getItem("agroAfric_user_name");
$("#name").text(UserName)
var UserName = localStorage.getItem("agroAfric_user_name");
$("#name").text(UserName);
$(logout).click(function(){
localStorage.setItem('agroAfric_user_name', "");
localStorage.setItem('user_id',"");
localStorage.setItem('auth_token_agroAfric',"");
localStorage.setItem('role', "");
$.ajax({
      url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/logout`,
      dataType: "JSON",
      contentType: "application/json",
      method: "POST",
      data : {},
      error: (err) => {
          $("#placement_error_reg").html(error.message);
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

/** var BACKEND_URL = 'http://localhost:5000';
 function getSession(){
   var expires = null;
   $.ajax({
         url: `${BACKEND_URL}/agroAfrica/v1/user/getSession`,
         dataType: "JSON",
         contentType: "application/json",
         method: "GET",
         async : false,
         error: (err) => {
             $("#placement_error_log").html("error getting Session");
             //window.location.href = "/index.html";
          },
         success: function (results) {
              //session = results;
               if(results.status === 200){
                console.log(results.data);
                //session.push(results);
                expires = results.data._expires;
              }

         }
    })
    return expires;
 } **/

$.ajax({
      url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/fetchCategories`,
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
               trHTML += '<tr><td>'+item.id+'</td><td>'+item.category+'</td><td>'+item.created_at+'</td></tr>';

      })

        $('#table_categories').append(trHTML);


    }
  }

});

function refresh(){
  $("#category").val('')
}

        $("#addProdCart").click(function(e){
            e.preventDefault()

              let category = document.getElementById('category').value

              if(category === '') {
                  $("#placement_error_reg").html('*Email is required')
                  return
              }
              $.ajax({
                    url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/category`,
                    dataType: "JSON",
                    contentType: "application/json",
                    method: "POST",
                    data: JSON.stringify({
                        'category': category
                    }),
                    error: (err) => {
                      refresh();
                        if(err.status === 403) {
                            //alert(err.message);
                            $("#placement_error_reg").html('User Not Registered or Wrong Email');
                        }
                        else{
                          $("#placement_error_reg").html('Incorrect Details or Server Error');
                        }
                    },
                    success: function (results) {
                        alert("Category successfully added");
                        refresh();
                        var user = localStorage.getItem("user_id");
                        window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem("role")+'/profile/'+localStorage.getItem("user_id") + '/';
                    }
            })
          })
        }
        function getCookie(ckname){
          let name = ckname + "=";
          let decoded_cookie = decodeURIComponent(document.cookie);
          let cook = decoded_cookie.split(';');
          for(var cnt = 0; cnt < cook.length; cnt++){
            let cok = cook[cnt];
            while (cok.charAt(0) === ' '){
              cok = cok.substr(1);
            }
            if (cok.indexOf(name) === 0){
              return cok.substr(name.length, cok.length);
            }
          }
        }
        // or undefined if not found
      function getCook(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }

        })


        $(document).ready(function(){
          const AUTH_BACKEND_URL = 'http://localhost:5000';
          let profile = "profile";
            $.ajax({
              url: `${BACKEND_URL}/agroAfrica/v1/user/${localStorage.getItem("role")}/${profile}/${localStorage.getItem("user_id")}/`,
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
               window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/';
              }
            })
          });
