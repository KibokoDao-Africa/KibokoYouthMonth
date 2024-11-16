$(document).ready(function(){
//$(window).on('load', function(){
//  e.preventDefault()
var logout = document.getElementById("logout")
let sellProf = document.getElementById("sellerProfile")
let addProds = document.getElementById("addNewProducts")
let sellProds = document.getElementById("sellerProducts")
let sellSale = document.getElementById("sellerSales")
let sellDisp = document.getElementById("sellerDispatch")
let sellWare = document.getElementById("sellerWarehouses")
let sellTrans = document.getElementById("sellerTransactions")
  var isLoggedIn = localStorage.getItem("agroAfric_user_name");
  var role = localStorage.getItem("role");
  console.log(isLoggedIn);
  if (typeof isLoggedIn === 'undefined' || isLoggedIn === null || !isLoggedIn || role !== 'seller'){
    window.location.href = "index.html";
  }
  else{
    var UserName = localStorage.getItem("agroAfric_user_name");
    $("#name").text(UserName)
    //window.location.href = 'complete_profile.html?id='+localStorage.getItem("user_id");///http://localhost:5000//agroAfrica/v1/user/profile/" + //localStorage.getItem('user_id') + "complete_profile.html";


var AUTH_BACKEND_URL = 'http://localhost:5000';
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
        $("#placement_error_reg").html('error encountered!');
    },
    success: function (results) {
        window.location.href = "/";
    }
})
})
var user = localStorage.getItem("user_id");
var product = localStorage.getItem("product");
$.ajax({
url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/fetch/${product}`,
dataType: "JSON",
contentType: "application/json",
method: "GET",
error: (err) => {
  alert("error");
  window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem("role")+'/profile/'+localStorage.getItem("user_id") + '/';

},
success: function(results){
  if (results.data.length>0){
    //console.log(results.data);
    //$("#user_name").val(results.data[0].name)
    $("#product_name").val(results.data[0].name)
    $("#picture").val(results.data[0].picture)
    $("#quantity").val(results.data[0].quantity)
    $("#price").val(results.data[0].price)
    $("#limit").val(results.data[0].one_time_limit)
    $("#currency").val(results.data[0].currency)
    //$("#available").val(results.data[0].quantity)
    $("#description").val(results.data[0].description)
    $("#warehouse_id").val(results.data[0].warehouse_id)
    //localStorage.setItem('seller_id',results.data[0].id)
  }
}
});
$.ajax({
  url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/warehouses`,
  dataType: "JSON",
  contentType: "application/json",
  method: "GET",
  async: false,
  error: (err) => {
  alert("error");
  },
  success: function(results){
    if (results.data.length>0){
         $.each(results.data, function (i, value) {
           $('#warehouse_id').append($('<option>').text(value.name).attr('value', value.id));
         })
      }
    }
})

$(sellProf).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id'))

$(addProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/createProduct')

$(sellProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/products')

$(sellSale).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/sales')

$(sellDisp).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/dispatch')

$(sellWare).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/warehouses')

$(sellTrans).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/transactions')

$.ajax({
url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/fetchCategories`,
dataType: "JSON",
contentType: "application/json",
method: "GET",
async: false,
error: (err) => {
alert("error");
},
success: function(results){
  if (results.data.length>0){
       $.each(results.data, function (i, value) {
         $('#category').append($('<option>').text(value.category).attr('value', value.id));
       })
    }
  }
})

const handleImageUpload = event => {
  const files = event.target.files
  const myImage = files[0]
  const imageType = /image.*/

  if (!myImage.type.match(imageType)) {
      alert('Sorry, only images are allowed')
      return
    }

  if (myImage.size > (1000*1024)) {
      alert('Sorry, the max allowed size for images is 1MB')
      return
    }

  const formData = new FormData()
  formData.append('myFile', files[0])
  //formData.append('filePath', nextProd)
  fetch('/agroAfrica/v1/upload/saveImage', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.path)
    $("#picture").val(data.path);
  })
  .catch(error => {
    console.error(error)
  })
}

document.querySelector('#fileUpload').addEventListener('change', event => {
handleImageUpload(event)
})

function refresh(){
$("#picture").val('')
$("#product_name").val('')
$("#quantity").val('')
$("#price").val('')
$("#limit").val('')
$("#currency").val('')
//$("#available").val('')
$("#description").val('')
$("#warehouse_id").val('')
}
      $("#updateProd").click(function(e){
          e.preventDefault()

            let picture = document.getElementById('picture').value
            let quantity = document.getElementById('quantity').value
            let price = document.getElementById('price').value
            let limit = document.getElementById('limit').value
            let currency = document.getElementById('currency').value
            //let available = document.getElementById('available').value
            let description = document.getElementById('description').value
            let product_name = document.getElementById('product_name').value
            let warehouse_id = document.getElementById('warehouse_id').value

            $.ajax({
                  url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/update/${product}`,
                  dataType: "JSON",
                  contentType: "application/json",
                  method: "PUT",
                  data: JSON.stringify({
                    'name': product_name,
                    'warehouse_id' : warehouse_id,
                    'picture' : picture,
                    'quantity': quantity,
                    'price': price,
                    'currency' : currency,
                    'one_time_limit' : limit,
                    'description' : description
                  }),
                  error: (err) => {
                    refresh();
                    if(err.status === 403) {
                        //alert(err.message);
                        $("#placement_error_log").html('Error updating product');
                    }
                    else{
                      $("#placement_error_log").html('Incorrect Details or Server Error');
                    }
                  },
                  success: function (results) {
                          alert("Product updating successfully");
                          refresh();
                          var user = localStorage.getItem("user_id");
                          window.open('', '_self').close();
                          //window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem("role")+'/profile/'+localStorage.getItem("user_id") + '/';
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
