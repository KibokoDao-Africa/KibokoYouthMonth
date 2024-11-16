$(document).ready(function(){
  let custProf = document.getElementById("user_profile")
  let custProds = document.getElementById("customerProducts")
  let custShips = document.getElementById("customerShipments")
  let custOrds = document.getElementById("customerOrders")
  let custPays = document.getElementById("customerPayments")
  let custTrans = document.getElementById("customerTransactions")
  let custTracks = document.getElementById("customerTracking")
  let custCart = document.getElementById("user_settings")

var itemList = $(".quantity");
  itemList.each(function(index, element) {
      var currentItem = $(element);

      currentItem.find(".plus").on('click',function() {
          currentItem.find('.count').val(parseInt(currentItem.find('.count').val()) + 1);
          if (currentItem.find('.count').val() == 26) {
              currentItem.find('.count').val(25);
          }
      });

      currentItem.find(".minus").on('click',function() {
          currentItem.find('.count').val(parseInt(currentItem.find('.count').val()) - 1);
          if (currentItem.find('.count').val() == 0) {
              currentItem.find('.count').val(1);
          }
      });
  })


    var isLoggedIn = localStorage.getItem("agroAfric_user_name");
    console.log(isLoggedIn);
    var role = localStorage.getItem("role");
    if (typeof isLoggedIn === 'undefined' || isLoggedIn === null || !isLoggedIn || role !== 'customer'){
      window.location.href = "/";
    }
    else{
      var cart_items = localStorage.getItem("cart");
      $('#cartItems').text(cart_items);
      var UserName = localStorage.getItem("agroAfric_user_name");
     $("#name").text(UserName)
      let AUTH_BACKEND_URL = 'http://localhost:5000';
      let user_id = localStorage.getItem("user_id");
      $.ajax({
            url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/activeCart/${user_id}`,
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
            success: function(results){
                if (results.data.length>0){
                //console.log("here");
                var prod = {};
                var trHTML = '';
                var prod_id = 0;
                var total_value = 0;
                var total_items = 0;
                var total_quantity = 0;
                var order = 0;
                $.each(results.data, function (i, item) {
                     total_items = results.data.length;
                     prod_id = item.product_id;
                     total_value += item.sub_total;
                     total_quantity += item.quantity;
                     prod = getProductName(item.product_id);
                     trHTML += '<tr><td class="carts" id="cart_'+item.id+'"><a id="remove_'+item.id+'" href="#" aria-label="remove item"><svg class="remove"><use xlink:href="#remove"/></svg></a></td><td><img src="'+ prod.picture +'" alt="product"></td><td><a href="/products.html"></a>'+prod.name+'</td><td id="price_'+item.product_id+'">'+item.sub_total/item.quantity +'</td><td><div class="quantity"><input type="number"  id="qty_'+item.product_id+'" min="'+item.quantity+'" max="'+item.quantity+'" value="'+item.quantity+'" aria-label="quantity"></div></td><td id="subtotal_'+item.product_id+'">'+item.sub_total+'</td></tr>';
                     //console.log(trHTML)
                    order = item.order_id;
                  });
                   //'<tr><td><a href="#" aria-label="remove item"><svg class="remove"><use xlink:href="#remove"/></svg></a></td><td><img src="/images/products/' + prod_id + '.jpg" alt="product"></td><td><a href="/products.html">' + item.name +'</a></td><td id="price_' + item.id + '"></td>'+ item.sub_total/item.quantity +'<td><div class="quantity"> <input type="number" class="count" name="qty" value="' + item.quantity +'" aria-label="quantity"></div></td><td id="subtotal_'+ item.id +'">'+ item.sub_total +'</td></tr>';

                 //<span class="minus">-</span> <span class="plus">+</span> min="1" max="25" v
                  //console.log(total_value);

                //console.log(total_value);
               trHTML += '<tr><td class="total" right-align" colspan="4">Total</td><td colspan="3" id="totalValue"><strong> $ :</strong>'+ total_value +'</td></tr><tr> <td class="right-align" colspan="6"><a class="btn btn-red" href="/user_payments.html">Proceed to Checkout</a></td></tr>';
              $('#cartItems').text(total_items);
              $('#table_user_cart').append(trHTML);
              localStorage.setItem('order_id', order);
              localStorage.setItem('cart', total_items);
              $('.carts a').click(function(e){
              e.preventDefault();
              var id = $(this).attr('id');
              var cart_id = id.replace(/[^0-9]/g,'');
              console.log(cart_id);
              $.ajax({
                url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/deleteCart/${cart_id}`,
                dataType: "JSON",
                contentType: "application/json",
                method: "DELETE",
                data: JSON.stringify({
                    'id': cart_id
                }),
                error: (err) => {
                alert("error");
                  //return false;
                  //window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/';
                },
                success: function(results){
                    alert("item removed from cart");

                    $("#placement_error_log").html('item removed from cart');
                    window.location.href="/user_cart.html";
                  }
              })
              })
      }
      else {
        $("#placement_error_log").html('no item in the cart');
        localStorage.setItem('cart', 0);
      }
    }


});

$(custProf).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id'))

$(custProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/products')

$(custShips).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/shipments')

$(custOrds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/orders')

$(custPays).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/payments')

$(custTrans).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/transactions')

$(custTracks).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/tracking')

$(custCart).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/update')


function getProductName(id){
  var product = {};
  $.ajax({
    url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/fetchProd/${id}`,
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
        product.name = results.data[0].name;
        product.picture = results.data[0].picture;
        console.log(product);
        }
      }
})

return product;
}



let logout = document.getElementById("logout")
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



}
});

var cartItems = document.querySelector('.nav a span');
console.log(cartItems);
//var cartItems = document.getElementById('cartItems');
setInterval(function(){
  if (cartItems.text !== localStorage.getItem("cart")) {
    cartItems.text = localStorage.getItem("cart");
  }
}, 1000);
//

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

/**
$(document).ready(function(){
$.ajax({
url: `${AUTH_BACKEND_URL}/api/populateTransactions`,
dataType: "JSON",
contentType: "application/json",
method: "GET",
error: (err) => {
alert("no data exists");
//window.open("http://localhost:4840/");
window.location.href="transactions.html";

},
success: async(results) => {
if (results.data.length>0){
var trHTML = '';
$.each(results.data, function (i, item) {
    trHTML += '<tr><th scope="row">' + item.timestamp + '</th><td>' + item.transaction_id + '</td><td>' + item.amount + '</td><td>' + item.from + '</td><td>' + item.payment_mode + '</td><td>' + "success" +  '</td></tr>';
});
$('#transactions').append(trHTML);

}
}
})
}) **/
