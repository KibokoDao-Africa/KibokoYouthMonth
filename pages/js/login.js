$(document).ready(function(){
  let AUTH_BACKEND_URL = 'http://localhost:5000';
  function refresh(){
    $("#fname").val('')
    $("#lname").val('')
    $("#new-email").val('')
    $("#new-password").val('')
    $("#confirm-password").val('')

  }
  $(window).on('load', function(e){
   e.preventDefault()
  var isLoggedIn = localStorage.getItem("agroAfric_user_name");
  if (isLoggedIn){
  var UserName = localStorage.getItem("agroAfric_user_name");
  $("#name").text(UserName)
  //  window.location.href = 'kidney_beans.html?id='+localStorage.getItem('user_id');///http://localhost:5000//agroAfrica/v1/user/profile/" + //localStorage.getItem('user_id') + "complete_profile.html";
      window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/';
  }
  })

  $("#btnReg").click(function(e){
    e.preventDefault()
    let email = document.getElementById('new-email').value
    let firstName = document.getElementById('fname').value
    let lastName = document.getElementById('lname').value
    let password = document.getElementById('new-password').value
    let role = document.getElementById('role').value
    let role_id = 0;
    if (role === 'buyer'){
      role_id = 2;
    }
    else{
      role_id = 3;
    }
    let name = firstName + " " + lastName;
    console.log(name);
    if(email === '') {
      $("#placement_error").html('*Email is required')
      return
    }
    $.ajax({
      url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/register`,
      dataType: "JSON",
      contentType: "application/json",
      method: "POST",
      cache : false,
      data: JSON.stringify({
        'email': email,
        'name': name,
        'password' : password,
        'phone' : "+254712345678",
        "street" : "xxxx",
        "city"  : "yyyy",
        "zipcode" : "tttttt",
        "state" : "zzzzz",
        "country" : "zzzzz",
        "gender"  : "zzzz",
        "age" : 0,
        "about" : "www,xxx,yyy",
        'latitude': 37.580078,
        'longitude': -35.486104,
        "role_id": role_id
      }),
      error: (err) => {
        //unLoadingAnimation()
        refresh();
        if(err.status === 401) {
          //alert("Error encountered, Kindly Try Again");
          $("#placement_error").html('Error encountered, Kindly Try Again');
        }
        else if (err.status === 403){
          refresh();
          $("#placement_error").html('user exists');
        }
        else {
          $("#placement_error").html(err.message);
        }
      },
      success: function (results){
        if (results.data.length>0){
        $("#placement_error").html('');
        console.log(results.message);
        if (results.status === 201 && results.message === 'userRegistered'){
          $("#placement_error").html('user successfully registered');
          if (role === 'farmer'){
            var reqData = {};
            //reqData.name = results.data[0].name;
            reqData.email = email;
            reqData.user_id = results.data[0].id;
            reqData.name = name;
            reqData.logo = results.data[0].picture;
            reqData.phone = "+254712345678";
            reqData.state = "zzzzzz";
            reqData.street = "xxxx";
            reqData.city = "yyyy";
            reqData.zipcode = "tttttt";
            reqData.country = "zzzzz";
            reqData.verified_email = results.data[0].verified_email;
            reqData.verified_phone = results.data[0].verified_phone;
            reqData.about = "www,xxx,yyy";
            reqData.latitude = results.data[0].latitude;
            reqData.longitude = results.data[0].longitude;
            reqData.gender = results.data[0].gender;

            var regFarmer =  registerSeller(reqData);

            if(regFarmer){
            if(!regFarmer.error){
            $("#placement_error").html('farmer registered');
            console.log('farmer registered');
            }
          }
        }
          refresh();
          window.location.href = "/";
        }
        else if (results.status === 403 && results.message === 'userExists'){
          $("#placement_error").html('user exists');
          refresh();
          window.location.href = "/";
        }
        else{
          $("#placement_error").html(results.message);
          refresh();
          window.location.href = "/";
        }
      }
    }
    })
  })

function registerSeller(data){
    $.ajax({
      url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/seller`,
      dataType: "JSON",
      contentType: "application/json",
      method: "POST",
      cache : false,
      data: JSON.stringify({
        "email": data.email,
        "user_id": data.user_id,
        "name": data.name,
        "phone" : data.phone,
        "street" : data.street,
        "city"  : data.city,
        "zipcode" : data.zipcode,
        "state" : data.state,
        "country" : data.country,
        "logo"  : data.logo || null,
        "verified_email": data.verified_email,
        "verified": 0,
        "verified_phone": data.verified_phone,
        "about_us" : data.about || null,
        "latitude" : data.latitude,
        "longitude" : data.longitude
      }),
      error: (err) => {
        //unLoadingAnimation()
        refresh();
        if(err.status === 401) {
          //alert(err.message);
          $("#placement_error").html('Error encountered, Kindly Try Again');
        }
        else if (err.status === 400){
          refresh();
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
          refresh();
          window.location.href = "/";
        }
        else if (results.status === 400 && results.message === 'existingSeller'){
          $("#placement_error").html('seller exists');
          refresh();
          window.location.href = "/";
        }
        else{
          $("#placement_error").html(results.message);
          refresh();
          window.location.href = "/";
        }
      }
    })
  }

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
               //window.location.href = "/";
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

  function refreshLogin(){
    $("#email").val('')
    $("#password").val('')
  }

  $("#btnLog").click(function(e){
    e.preventDefault()

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    if(email === '') {
      $("#placement_error_log").html('*Email is required')
      return
    }
    if(password === '') {
      $("#placement_error_log").html('*Password is required')
      return
    }
    $.ajax({
      url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/login`,
      dataType: "JSON",
      contentType: "application/json",
      method: "POST",
      data: JSON.stringify({
        'user_name': email,
        'password' : password
      }),
      error: (err) => {
        refresh();
        if(err.status === 401) {
          //alert(err.message);
          $("#placement_error_log").html('Wrong Password');
        }
        else if (err.status === 403){
          $("#placement_error_log").html('user flagged and blacklisted contact admin for asistance');
        }
        else{
          $("#placement_error_log").html('Authorization error');
        }
      },
      success: function (results) {
        if (results.success = true && results.data.length > 0  || results.status === 201 && results.data.length > 0 || results.status === 200 && results.data.length > 0){
          localStorage.setItem('agroAfric_user_name' , email);
          localStorage.setItem('user_id', results.data[0].id)
          
          /** var sess = getSession();
          if(sess){
          console.log(sess);
          alert(sess);
          localStorage.setItem('expires', sess);
        } **/

          var request = {};
          var token = localStorage.getItem('auth_token_agroAfric');
          var user_name = localStorage.getItem('agroAfric_user_name');
          //alert(results.meta.user_roles);
          console.log(results.meta.user_roles);
          var user_roles = results.meta.user_roles;
          //alert(user_roles);
          localStorage.setItem('role', user_roles)
          if(typeof user_name === 'undefined' || user_name === null || !user_name){
            localStorage.setItem('agroAfric_user_name',email)

            //user_name = email;
            localStorage.setItem('user_id',results.data[0].id)

            //localStorage.setItem('token',results.data[0].token)

          }
          /** if (typeof token === 'undefined' || token === null || !token){
            request.email = email;
            console.log(request);
            const refreshJWT =   updateJWT(request);
            console.log(refreshJWT);
          } */

          //alert(refreshJWT);
          refreshLogin();
          //var usertype =
          //window.location.href = "complete_profile.html" //"http://localhost:5000/agroAfrica/v1/user/profile/:id/complete_profile.html";
          window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/';
          //window.location.href = '/profile/id?'+localStorage.getItem('user_id') + '/';
        }
        else if (results.status === 401 || results.message === 'wrongPassword'){
          //alert("here");
          $("#placement_error_log").html('Wrong Password');
          refreshLogin();
          window.location.href = "/";
        }
        else{
          $("#placement_error_log").html(results.status);
          refreshLogin();
          window.location.href = "/";
        }
      }
    })
  })
  var logout = document.getElementById("logout")
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

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    //alert("success");
    localStorage.setItem('latitude', position.coords.latitude);
    localStorage.setItem('longitude', position.coords.longitude);
    console.log("Latitude: " + localStorage.getItem("latitude") +
    "Longitude: " + localStorage.getItem("longitude") );
  }
  getLocation()


})

var cartItems = document.querySelector('.nav a span');
console.log(cartItems);
//var cartItems = document.getElementById('cartItems');
setInterval(function(){
  if (cartItems.text !== localStorage.getItem('cart')) {
    cartItems.text = localStorage.getItem('cart');
  }
}, 100);

$(document).ready(function(){
  const AUTH_BACKEND_URL = 'http://localhost:5000';
  let profile = "profile";
    $.ajax({
      url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/${localStorage.getItem("role")}/${profile}/${localStorage.getItem("user_id")}/`,
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
       window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/';
      }
    })
  });

/** function genJWT(em, pass){
  $.ajax({
    url: `${AUTH_AUTH_BACKEND_URL}/agroAfrica/v1/user/createToken`,
    dataType: "JSON",
    contentType: "application/json",
    method: "POST",
    cache : false,
    data: JSON.stringify({
      'user_name': em,
      'password' : pass
    }),
    error: (err) => {
      if(err.status === 401) {
        alert(err.responseJSON.error_message);
        $("#placement_error_log").html('error Generating JWT');
      }
      else{
        $("#placement_error_log").html(err.message);
      }
    },
    success: function  (results) {
      if (results.status === 201){
        var token = results.data.token;
        localStorage.setItem('auth_token_agroAfric',token);
      }
    }
  })
} **/




/** function updateJWT(data){
  $.ajax({
    url: `${AUTH_AUTH_BACKEND_URL}/agroAfrica/v1/user/updateToken`,
    dataType: "JSON",
    contentType: "application/json",
    method: "POST",
    cache : false,
    data: JSON.stringify({
      'email': data.email
    }),
    error: (err) => {
      if(err.status === 401) {
        alert(err.responseJSON.error_message);
        $("#placement_error_log").html('error Updating JWT');
      }
      else{
        $("#placement_error_log").html(err.message);
      }
    },
    success: function (results) {
      if (results.status === 201 || results.status === 202){
        console.log(results.data.token);
        alert(results.data.token);
        var token = results.data.token;
        localStorage.setItem('auth_token_agroAfric',token);
      }
    }
  })
} **/



//  $(window).bind("load", function(){
/*$(document).ready(function(){
var isLoggedIn = localStorage.getItem("agroAfric_user_name");
var user = localStorage.getItem('user_id');
if (typeof isLoggedIn === 'undefined' || isLoggedIn === null || !isLoggedIn){
//window.location = document.URL;
//location.reload();
window.location.href = "/";
}
else{
var UserName = localStorage.getItem("agroAfric_user_name");
$("#name").text(UserName)
//window.location.href = 'complete_profile.html?id='+user;///http://localhost:5000//agroAfrica/v1/user/profile/" + //localStorage.getItem('user_id') + "complete_profile.html";
//  window.location.href = 'http://localhost:5000/agroAfrica/v1/user/profile/'+localStorage.getItem('user_id') +'/' + 'complete_profile.html';
window.location.href = '/profile/'+localStorage.getItem('user_id') +'/' + 'complete_profile.html';
}
}) */
