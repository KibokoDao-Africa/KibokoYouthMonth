$(document).ready(function(){
let AUTH_BACKEND_URL = 'http://localhost:5000';
let logout = document.getElementById("logout")
//  e.preventDefault()
var role = localStorage.getItem("role");
var isLoggedIn = localStorage.getItem("agroAfric_user_name");
if (typeof isLoggedIn === 'undefined' || isLoggedIn === null || !isLoggedIn || role !== 'customer'){
window.location.href = "/index.html";
}
else
{
var UserName = localStorage.getItem("agroAfric_user_name");
$("#name").text(UserName)
//value = newValue * ;
//alert(value);

let user_id = localStorage.getItem("user_id");
//  window.location.href = 'kidney_beans.html?id='+localStorage.getItem("user_id");///http://localhost:5000//agroAfrica/v1/user/profile/" + //localStorage.getItem('user_id') + "complete_profile.html";
//
var product = localStorage.getItem("product");
var seller_id;
var maximum = 0;
var limit = 0;
var prod_id = 0;
var imgUrl = "";
let cartegory = "";
$.ajax({
url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/fetch/${product}`,
dataType: "JSON",
contentType: "application/json",
method: "GET",
error: (err) => {
alert("no data exists");
//window.open("http://localhost:4840/index.html")
console.log(err.message)
//window.location.href="/products.html";

},
success: function(results) {
if (results.data.length>0){
//var trHTML = '';
    imgUrl = results.data[0].picture;
    ///imgUrl = imgUrl.replace(""",'');
    prod_id = results.data[0].id;
    category = getProductCategory(results.data[0].id);
    $("#imgSRC").attr('src', results.data[0].picture);
    seller_id = results.data[0].seller_id;
    maximum = results.data[0].quantity;
    $("#product").text(results.data[0].name);
    $("#prodName").text(results.data[0].name);
    $("#description").text(results.data[0].description);
    $("#fetchPrice").text(results.data[0].price);
    $("#category").text(category);
    $("#minOrder").text(50);
    $("#fetchCost").text(results.data[0].price);
    $("#prod").text(results.data[0].name);
    $("#fetch_max").text(results.data[0].one_time_limit);
    $("#qty").val(50);
    $("#qty").attr({
      "min" : 50,
      "max" : results.data[0].one_time_limit
    });
    maximum = results.data[0].quantity;
    limit = results.data[0].one_time_limit;
    $("#sup_ab").text(results.data[0].quantity / 1000);
    $("#prodCost").text(results.data[0].price);
    var init_total = results.data[0].price * 50;
    $("#prodTotalCost").text(init_total);

    /** var order_get =  fetchActiveCartByUser(user_id);
    if(order_get){
    if (!order_get.error){
      localStorage.setItem('order', order_get);
      localStorage.setItem('order_id', order_get);

    }
  } **/

    //'<div class="card" id="' + item.name +'" value="' + item.id + '"><div class="thumbnail"><img src="/images/products/' + prod_id + '.jpg" alt="product"><div class="content"><a href="">' + item.name + '</a><a href="" aria-hidden="true"><svg class="arrow-right" aria-hidden="true"><use xlink:href="#arrow-right"/></svg></a></div></div>'
    //</div>' + item.timestamp + '</th><td>' + item.transaction_id + '</td><td>' + item.amount + '</td><td>' + item.from + '</td><td>' + item.payment_mode + '</td><td>' + "success" +  '</td></tr>';

    //$('#product_cards').append(trHTML);
}
}
});

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
          window.location.href = "/index.html";
      }
 })
})


var value = $("#qty").val();
var cost = document.getElementById('prodCost').innerText;
var quantity = document.getElementById("qty");
var minus = document.getElementById("minus");
var plus = document.getElementById("plus");
  $(quantity).on('change keyup mouseup', function(e){
      e.preventDefault()
      //alert(document.getElementById('prodCost').innerText);
      var newValue = parseInt($("#qty").val());
      if(this.value !== value){
        value = newValue * parseInt(document.getElementById('prodCost').innerText);
        //alert(value);
        $("#prodTotalCost").text(value);
      }
    });

    $(minus).click(function(e){
    e.preventDefault();
    var newValue = parseInt($("#qty").val());
     newValue = newValue;
    if (newValue !== value){
      value = newValue * parseInt(document.getElementById('prodCost').innerText);
      //alert(value);
      $("#prodTotalCost").text(value);
    }
    })

    $(plus).click(function(e){
    e.preventDefault();
    //(parseInt(document.getElementById('prodCost').innerText));
    var newValue = parseInt($("#qty").val());
    newValue = newValue;
    if(newValue !== value){
      value = newValue * parseInt(document.getElementById('prodCost').innerText);
      //alert(value);
      $("#prodTotalCost").text(value);
    }
    })

    $("#addCart").click(function(e){
        e.preventDefault()

          let product_id = localStorage.getItem("product");
          let quantity = parseInt(document.getElementById('qty').value)
          //let order = localStorage.getItem("order");
          //console.log(order);
          let sub_total = parseInt(document.getElementById('prodTotalCost').innerText);
          //alert(sub_total);
          if (quantity > maximum){
            $("#placement_error").html('Quantity greater than available');
            return
          }
          if (quantity > limit){
            $("#placement_error").html('Quantity greater than one time limit');
            return
          }
          /** if (typeof order === 'undefined'  || order === null || !order){
          alert("create");
          $.ajax({
                url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/create`,
                dataType: "JSON",
                contentType: "application/json",
                method: "POST",
                cache : false,
                data: JSON.stringify({
                    'product_id': product_id,
                    'user_id' : user_id,
                    'quantity': quantity,
                    'sub_total' : sub_total,
                    'new' : 1
                }),
                error: (err) => {
                    //unLoadingAnimation()
                    if(err.status === 401) {
                      alert("kindly login again");
                      window.location.href = "/index.html";
                    }
                    else if (err.status === 403){
                      $("#placement_error").html('order exists');
                    }
                    else {
                      $("#placement_error").html(err.message);
                    }
                },
                success: function (results) {
                  $("#placement_error").html('order created successfully');
                  //console.log(results.message);
                  if (results.success || results.data.length > 0){
                    console.log(results.data)
                    let fetchOrder = fetchActiveCartByUser(user_id);
                    if (fetchOrder && fetchOrder.length){
                    //if (!fetchOrder.error)
                    var data = {};
                    data.product_id = product_id;
                    data.user_id =  user_id;
                    data.quantity = quantity;
                    data.sub_total = sub_total;
                    data.order_id = fetchOrder[0].order_id;
                    data.stage = "cart";
                    localStorage.setItem('order',fetchOrder[0].order_id);
                    localStorage.setItem('order_id', fetchOrder[0].order_id);
                    console.log(data);
                    var addProdToCart =  addToCart(data);
                    if(addProdToCart){
                    console.log(addProdToCart);
                    if(addProdToCart.success){
                    $("#placement_error").html('item added to cart successfully');
                    //localStorage.setItem('order',);
                    localStorage.setItem('product', '');
                    maximum = maximum - quantity;
                    window.location.href = "/user_cart.html";
                    }
                  }
              //  }
                }
              else  if (!fetchOrder || !fetchOrder.length {
                 var data = {};
                  data.product_id = product_id;
                  data.user_id =  user_id;
                  data.quantity = quantity;
                  data.sub_total = sub_total;
                  data.order_id = results.data[0].id;
                  data.stage = "cart";
                  localStorage.setItem('order',results.data[0].id);
                  localStorage.setItem('order_id',results.data[0].id);
                  console.log(data);
                  var addProdToCart =  addToCart(data);
                  if(addProdToCart){
                  console.log(addProdToCart);
                  if(addProdToCart.success){
                  $("#placement_error").html('item added to cart successfully');
                  localStorage.setItem('product', '');
                  maximum = maximum - quantity;
                  window.location.href = "/user_cart.html";
                  }
                }
                }
              }
                  else if (results.status === 403){
                    $("#placement_error").html('order exists');
                  }
                  else{
                    $("#placement_error").html(results.message);
                    //window.location.href = "/";
                  }
                }

        })
      }
      else { **/
        var data = {};
        data.product_id = product_id;
        data.user_id = user_id;
        data.quantity = quantity;
        data.sub_total = sub_total;
        //data.order_id = order;
        data.stage = 'cart';
        console.log(data);
        $.ajax({
              url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/addToCart`,
              dataType: "JSON",
              contentType: "application/json",
              method: "POST",
              cache : false,
              data: JSON.stringify({
                'product_id' : data.product_id,
                'user_id' : data.user_id,
                'quantity' : data.quantity,
                'sub_total' : data.sub_total,
                'stage' : data.stage
              }),
              error: (err) => {
                  if(err.status === 401) {
                    alert("kindly login again");
                    window.location.href = "/";
                  }
                  else{
                    $("#placement_error_log").html(err.message);
                  }
              },
              success: function  (results) {
                if (results.status === 201 || results.status === 204 || results.status === 200){
                  var cart = localStorage.getItem("cart");
                  localStorage.setItem('cart', cart + 1);
                  //localStorage.setItem('cart_id', results.data[0].id);
                  window.location.href = "/user_cart.html";
                }
        }
      })
    //  }
      })

      $("#orderNow").click(function(e){
          e.preventDefault()
            //let user_id = localStorage.getItem("user_id");
            let product_id = localStorage.getItem("product");
            let quantity = document.getElementById('qty').value
            let order = localStorage.getItem("order_id");
            if (quantity > maximum){
              $("#placement_error").html('Quantity greater than available');
              return
            }
            if (quantity > limit){
              $("#placement_error").html('Quantity greater than one time limit');
              return
            }
            if (typeof order === 'undefined' || order === null || !order){
            $.ajax({
                  url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/create`,
                  dataType: "JSON",
                  contentType: "application/json",
                  method: "POST",
                  cache : false,
                  data: JSON.stringify({
                      'product_id': product_id,
                      'user_id' : user_id,
                      'quantity': quantity,
                      'sub_total' : sub_total,
                      'new' : 1
                  }),
                  error: (err) => {
                      //unLoadingAnimation()
                      if(err.status === 401) {
                        alert("kindly login again");
                        window.location.href = "/";
                      }
                      else if (err.status === 403){
                        $("#placement_error").html('order exists');
                      }
                      else {
                        $("#placement_error").html(err.message);
                      }
                  },
                  success: function (results) {
                    $("#placement_error").html('order created successfully');
                    console.log(results.message);
                    if (results.data.length > 0){
                      localStorage.setItem('order', results.data[0].id);
                      localStorage.setItem('order_id', results.data[0].id);
                      maximum = maximum - quantity;
                    }
                  }
                })
              }
              else {
                $.ajax({
                      url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/quantity/${order}`,
                      dataType: "JSON",
                      contentType: "application/json",
                      method: "PUT",
                      cache : false,
                      data: JSON.stringify({
                          'quantity': quantity
                          //'sub_total' : parseInt(document.getElementById('prodTotalCost').innerText);
                      }),
                      error: (err) => {
                          //unLoadingAnimation()
                          if(err.status === 401) {
                              alert("kindly login again");
                              window.location.href = "/";

                          }
                          else if (err.status === 403){
                            $("#placement_error").html('order does not exist');
                          }
                          else {
                            $("#placement_error").html(error.message);
                          }
                      },
                      success: function (results) {
                        if (results.status === 204 || results.message === 'updated' ){
                          $("#placement_error").html('order updated Successfully');
                           console.log(results);
                           maximum = maximum - quantity;

                        }
                      }
                    })
              }
              })

       function updateOrder(quantity, orderNO){
         $.ajax({
               url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/quantity/${orderNO}`,
               dataType: "JSON",
               contentType: "application/json",
               method: "PUT",
               cache : false,
               data: JSON.stringify({
                   'quantity': quantity
                   //'sub_total' : parseInt(document.getElementById('prodTotalCost').innerText);
               }),
               error: (err) => {
                   //unLoadingAnimation()
                   if(err.status === 401) {
                     alert("kindly login again");
                     window.location.href = "/";
                   }
                   else if (err.status === 403){
                     $("#placement_error").html('order not exists');
                   }
                   else {
                     $("#placement_error").html(error.message);
                   }
               },
               success: function (results) {
                 $("#placement_error").html('order quantity updated successfully');
                  console.log(results.message);
                 if (results.status === 204 ){
                   $("#placement_error").html('order updated Successfully');
                    console.log(results);
                    maximum = maximum - quantity;

                 }
               }
             })
       }

       function getProductCategory(id){
         var productCart = null;
         $.ajax({
           url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/name/${id}`,
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
               productCart = results.data[0].category;
               console.log(productCart);
               }
             }
       })
       return productCart;
       }
       /** function updateQuantity(product_id, quantity){
         $.ajax({
               url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/updateQuantity/${product_id}`,
               dataType: "JSON",
               contentType: "application/json",
               method: "PUT",
               cache : false,
               data: JSON.stringify({
                   'id' : product_id,
                   'quantity': quantity
                   //'sub_total' : parseInt(document.getElementById('prodTotalCost').innerText);
               }),
               error: (err) => {
                   //unLoadingAnimation()
                   if(err.status === 401) {
                     alert("kindly login again");
                     window.location.href = "/";
                   }
                   else if (err.status === 403){
                     $("#placement_error").html('order exists');
                   }
                   else {
                     $("#placement_error").html(err.message);
                   }
               },
               success: function (results) {
                 if (results.status === 204){
                   $("#placement_error").html('product quantity updated successfully');
                   console.log(results.message);
                 }
               }
             })
       } **/

      function addToCart(data){
        $.ajax({
              url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/addToCart`,
              dataType: "JSON",
              contentType: "application/json",
              method: "POST",
              cache : false,
              data: JSON.stringify({
                'product_id' : data.product_id,
                'user_id' : data.user_id,
                'quantity' : data.quantity,
                'sub_total' : data.sub_total,
                'stage' : data.stage
                //'order_id' : data.order_id
              }),
              error: (err) => {
                  if(err.status === 401) {
                    alert("kindly login again");
                    window.location.href = "/";

                  }
                  else{
                    $("#placement_error_log").html(err.message);
                  }
              },
              success: function  (results) {
                if (results.status === 201 || results.status === 204 || results.status === 200){
                  var cart = localStorage.getItem("cart");
                  localStorage.setItem('cart', cart + 1);
                  if(result.data.length > 0){
                  console.log(results.data)
                  localStorage.setItem('cart_id', results.data[0].id);
                }
                  localStorage.setItem('product', "");
        }
      }
      })
      }


    function fetchActiveCartByUser(user_id){
      let cartActive = "";
      $.ajax({
            url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/activeCart/${user_id}`,
            dataType: "JSON",
            contentType: "application/json",
            method: "GET",
            aynsc :false,
            error: (err) => {
                if(err.status === 401) {
                  alert("kindly login again");
                  window.location.href = "/";
                }
                else{
                  $("#placement_error_log").html(err.message);
                }
            },
            success: function  (results) {
              if (results.data.length  > 0){
                cartActive = results.data[0].order_id;
                console.log(cartActive);
                }
              /**if (results.status === 200 || results.message === 'success'){
                var cart = localStorage.getItem("cart");
                localStorage.setItem('order_id', results.data[0].order_id);
                localStorage.setItem('order', results.data[0].order_id);
                localStorage.setItem('cart_id', results.data[0].id);
                //window.location.href = "/products.html";
              }**/
      }
    })
    return cartActive;
    }


    /** function fetchActiveCartByUser(user_id){
      let cartActive = [];
      $.ajax({
            url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/activeCart/${user_id}`,
            dataType: "JSON",
            contentType: "application/json",
            method: "GET",
            aynsc :false,
            error: (err) => {
                if(err.status === 401) {
                  alert("kindly login again");
                  window.location.href = "/";
                }
                else{
                  $("#placement_error_log").html(err.message);
                }
            },
            success: function  (results) {
              if (results.data.length  > 0){
                cartActive = results.data[0];
                console.log(cartActive);
                }
              /**if (results.status === 200 || results.message === 'success'){
                var cart = localStorage.getItem("cart");
                localStorage.setItem('order_id', results.data[0].order_id);
                localStorage.setItem('order', results.data[0].order_id);
                localStorage.setItem('cart_id', results.data[0].id);
                //window.location.href = "/products.html";
              }
      }
    })
    return cartActive;
  } **/


  }

    //var init_spend = parseInt($("#qty").val());
    //var init_value = parseInt(document.getElementById('prodCost').innerText);

})


var cartItems = document.querySelector('.nav a span');
console.log(cartItems);
//var cartItems = document.getElementById('cartItems');
setInterval(function(){
  if (cartItems.text !== localStorage.getItem("cart")) {
    cartItems.text = localStorage.getItem("cart");
  }
}, 1000);


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
        window.location.href = "/index.html";
      }
      },
      success: function(results){

      }
    });
  }, 1800000);

//console.log(trHTML);
//$('#product_cards').append(trHTML);
//document.body.appendChild(trHTML);
