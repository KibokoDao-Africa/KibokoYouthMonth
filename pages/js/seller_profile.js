$(document).ready(function(){
  let AUTH_BACKEND_URL = 'http://localhost:5000'
  let sellProf = document.getElementById("seller_profile")
  let sellSet = document.getElementById("seller_settings")
  let addProds = document.getElementById("addNewProducts")
  let sellProds = document.getElementById("sellerProducts")
  let sellSale = document.getElementById("sellerSales")
  let sellDisp = document.getElementById("sellerDispatch")
  let sellWare = document.getElementById("sellerWarehouses")
  let sellTrans = document.getElementById("sellerTransactions")
  var isLoggedIn = localStorage.getItem("agroAfric_user_name");
  var role = localStorage.getItem("role");
  if (typeof isLoggedIn === 'undefined' || isLoggedIn === null || !isLoggedIn || role !== 'seller'){
  window.location.href = "/index.html";
  }
  else{
  var UserName = localStorage.getItem("agroAfric_user_name");
  $("#name").text(UserName)
  //  window.location.href = 'kidney_beans.html?id='+localStorage.getItem("user_id");///http://localhost:5000//agroAfrica/v1/user/profile/" + //localStorage.getItem('user_id') + "complete_profile.html";
  // window.location.href = '/profile/'+localStorage.getItem('user_id') +'/' + 'kidney_beans.html';
  var user = localStorage.getItem("user_id");
  var UserName = localStorage.getItem("agroAfric_user_name");
  $("#name").text(UserName);
  //console.log(document.cookie.sid.value);
  $.ajax({
    url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/fetchSeller/${user}`,
    dataType: "JSON",
    contentType: "application/json",
    method: "GET",
    error: (err) => {
      alert("error");
      window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/';

    },
    success: function(results){
      if (results.data.length>0){
        //console.log(results.data);
        $("#user_name").val(results.data[0].name)
        $("#email").val(results.data[0].email)
        $("#telephone").val(results.data[0].phone)
        $("#street").val(results.data[0].street)
        $("#city").val(results.data[0].city)
        $("#zipcode").val(results.data[0].zipcode)
        $("#state").val(results.data[0].state)
        $("#country").val(results.data[0].country)
        $("#about").val(results.data[0].about_us)
        localStorage.setItem('seller_id',results.data[0].id)
      }
      else{
        $.ajax({
          url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/fetch/${user}`,
          dataType: "JSON",
          contentType: "application/json",
          method: "GET",
          error: (err) => {
            alert("error");
            window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/';
          },
          success: function(results){
            if (results.data.length>0){
              var reqData = {};
              //reqData.name = results.data[0].name;
              reqData.email = results.data[0].email;
              reqData.user_id = results.data[0].id;
              reqData.name = results.data[0].name;
              reqData.logo = results.data[0].picture;
              reqData.phone = results.data[0].phone;
              reqData.state = results.data[0].state;
              reqData.street = results.data[0].street;
              reqData.city = results.data[0].city;
              reqData.zipcode = results.data[0].zipcode;
              reqData.country = results.data[0].country;
              reqData.verified_email = results.data[0].verified_email;
              reqData.verified_phone = results.data[0].verified_phone;
              reqData.about = results.data[0].about_me;
              reqData.latitude = results.data[0].latitude;
              reqData.longitude = results.data[0].longitude;
              reqData.gender = results.data[0].gender;
              var regFarmer = registerSeller(reqData);
              if (regFarmer){
              if(!regFarmer.error){
              $("#placement_error").html('farmer registered');
              console.log('farmer registered');
              }
            }
      }
    }
    })
      }
    }
  })

  $(sellProf).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id'))
  
  $(sellSet).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/updateSeller')

  $(addProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/createProduct')

  $(sellProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/products')

  $(sellSale).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/sales')

  $(sellDisp).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/dispatch')

  $(sellWare).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/warehouses')

  $(sellTrans).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/transactions')


  function registerSeller(data){
      $.ajax({
        url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/seller`,
        dataType: "JSON",
        contentType: "application/json",
        method: "POST",
        cache : false,
        data: JSON.stringify({
          'email': data.email,
          "user_id": data.user_id,
          'name': data.name,
          'phone' : data.phone,
          "street" : data.street,
          "city"  : data.city,
          "zipcode" : data.zipcode,
          "state" : data.state,
          "country" : data.country,
          "logo"  : data.logo,
          "verified_email": data.verified_email,
          "verified": 1,
          "verified_phone": data.verified_phone,
          'about_us' : data.about,
          'latitude' : data.latitude,
          'longitude' : data.longitude
        }),
        error: (err) => {
          //unLoadingAnimation()

          if(err.status === 401) {
            //alert(err.message);
            $("#placement_error").html('Error encountered, Kindly Try Again');
          }
          else if (err.status === 400){

            $("#placement_error").html('error adding sellor');
          }
          else {
            $("#placement_error").html('seller exists');
          }
        },
        success: function (results) {
          $("#placement_error").html('');
          console.log(results.message);
          if (results.status === 201 && results.message === 'created'){
            $("#placement_error").html('seller successfully registered');


          }
          else if (results.status === 400 && results.message === 'existingSeller'){
            $("#placement_error").html('seller exists');


          }
          else{
            $("#placement_error").html(results.message);
          }
        }
      })
    }

  var update = document.getElementById("updateProfile")
  $(update).click(function(){
    window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') +'/'+'updateSeller';
  })

  var logout = document.getElementById("logout")
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
            $("#placement_error_log").html(error.mesage);
         },
        success: function (results) {
            window.location.href = "/index.html";
        }
   })
  })
}
})


$(document).ready(function(){
  const BACKEND_URL = 'http://localhost:5000';
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
        window.location.href = "/index.html";
      }
      },
      success: function(results){
       window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/';
      }
    })
  });
