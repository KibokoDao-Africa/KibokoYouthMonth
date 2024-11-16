$(document).ready(function(){
    var isLoggedIn = localStorage.getItem("agroAfric_user_name");
    let custProf = document.getElementById("user_profile")
    let custProds = document.getElementById("customerProducts")
    let custShips = document.getElementById("customerShipments")
    let custOrds = document.getElementById("customerOrders")
    let custPays = document.getElementById("user_settings")
    let custTrans = document.getElementById("customerTransactions")
    let custTracks = document.getElementById("customerTracking")
    let custCart = document.getElementById("customerCart")
    console.log(isLoggedIn);
    var role = localStorage.getItem("role");
    if (typeof isLoggedIn === 'undefined' || isLoggedIn === null || !isLoggedIn || role !== 'customer'){
      window.location.href = "/";
    }
    else{
      if (typeof web3 !== 'undefined') {
         // Use Mist/MetaMask's provider
        web3 = new Web3(web3.currentProvider);
         /** web3.eth.accounts(0, function(err, data) {
           if (err !== null) {
             console.log(err);
             //return reject(err);
             $("#placement_error_log").html("Failed to get account");
           }
           else{
           console.log(data)
           document.getElementById("ethAddress").innerHTML = data[0];
         }
       }); **/
       /** web3.eth.getAccounts((err, res) => {
                        console.log(res[0]);
                        document.getElementById("ethAddress").innerHTML = res[0];
      }); **/

      web3.eth.getAccounts((err, res) => {
                       console.log(res[0]);
                       document.getElementById("ethAddress").innerHTML = res[0];
                       web3.eth.defaultAccount = res[0];

                       /** web3.utils.toChecksumAddress(res[0], (err, res) => {
                        console.log(typeof(walletAddress));
                        console.log(walletAddress);
                        walletAddress = res;
                      }); **/
                      //walletAddress = web3.utils.toChecksumAddress(walletAddress);

                      //console.log(walletAddress);
                     web3.eth.getBalance(res[0], (err, res) => {
                                       console.log(res);
                                       document.getElementById("ethAmount").innerHTML = web3.utils.fromWei(res, "ether");
                                       //document.getElementById("ethAmount").value = web3.utils.fromWei(res, "ether");
                                       localStorage.setItem("eth", web3.utils.fromWei(res, "ether"));
                      });
                       //let ethBalance = web3.utils.fromWei(balance, "ether")
                       //let bal =   web3.utils.fromWei(web3.eth.getBalance(res[0]), "ether");
                       //document.getElementById("ethAmount").innerHTML = balance;
                       //walletAddress = res[0];
      });


       //web3.eth.accounts[0];
      }
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
            success: function(results) {
               var trHTML = '';
               var total_value = 0;
               var total_items = 0;
               var total_quantity = 0;
               var endHTML = '';
               var orderID = 0;
               var prod_id = 0;
               var prod_name = '';
               let order = 0;
                if (results.data.length>0){
                //console.log("here");
                $.each(results.data, function (i, item) {
                     prod_id = item.product_id;
                     total_value += item.sub_total;
                     total_quantity += item.quantity;
                     prod_name = getProductName(item.product_id);
                     trHTML += '<tr><td>'+prod_name+'</td><td>'+item.sub_total/item.quantity+'</td><td>'+item.quantity+'</td><td class="bg-green">$ :'+ item.sub_total+'</td></tr>';
                     //endHTML +=

                    order = item.order_id;
                   //'<tr><td><a href="#" aria-label="remove item"><svg class="remove"><use xlink:href="#remove"/></svg></a></td><td><img src="/images/products/' + prod_id + '.jpg" alt="product"></td><td><a href="/products.html">' + item.name +'</a></td><td id="price_' + item.id + '"></td>'+ item.sub_total/item.quantity +'<td><div class="quantity"> <input type="number" class="count" name="qty" value="' + item.quantity +'" aria-label="quantity"></div></td><td id="subtotal_'+ item.id +'">'+ item.sub_total +'</td></tr>';
                 })
                 //<span class="minus">-</span> <span class="plus">+</span> min="1" max="25" v
                  //console.log(total_value);
                 trHTML += '<tr><td colspan="3"><strong>Order Total:</strong></td><td class="bg-green"><strong>$ :'+total_value+'</strong></td></tr>';
                 var price = getETHUSD();
                 price = price[0];
                 console.log(price);
                 price = price.replace("USD: ",'');
                 console.log(price);
                 $("#amount").val('$'+total_value);
                 $("#eth_amount").val(total_value/price);
                 $("#aga_amount").val('$'+ total_value);
                //console.log(total_value);
               //trHTML += '<tr><td class="total" right-align" colspan="4">Total</td><td colspan="3" id="totalValue"><strong> $ :</strong>'+ total_value +'</td></tr><tr> <td class="right-align" colspan="6"><a class="btn btn-red" href="/payments.html">Proceed to Checkout</a></td></tr>';
              //$('#cartItems').text(total_items);
            }
            localStorage.setItem('order_id', order);
              orderID = localStorage.getItem('order_id');
              $('#table_user_payments').append(trHTML);
              $('#orderNumber').text(orderID);
              var dt = new Date();
              var month = dt.getMonth() + 1;
              var day = dt.getDate();
              var dtNow = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + dt.getFullYear();
              $('#orderDate').text(dtNow);
              $('#orderTotal').text(total_value);
          }
            //localStorage.setItem('cart', total_items);

});

$(custProf).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id'))

$(custProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/products')

$(custShips).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/shipments')

$(custOrds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/orders')

$(custPays).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id') + '/update')

$(custTrans).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/transactions')

$(custTracks).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/tracking')

$(custCart).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/cart')

function getProductName(id){
  var productName = null;
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
        productName = results.data[0].name;
        console.log(productName);
        }
      }
})

return productName;
}

function getOrderID(user_id){
  var orderId = 0;
  $.ajax({
    url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/getOrderByUserId/${user_id}`,
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
        orderId = results.data[0].id;

        console.log(orderId);
        }
      }
})

return orderId;
}

function getActiveCarts(order_id){
  var activeCart = [];
  $.ajax({
    url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/cart/${order_id}`,
    dataType: "JSON",
    contentType: "application/json",
    method: "GET",
    async: false,
    error: (err) => {
    alert("error");
    },
    success: function(results){
      if (results.data.length>0){
        activeCart = results.data;
        console.log(activeCart);
        }
      }
})
return activeCart;
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

function genTrackingNumber(len){
   var range = new Array(len),
   pointer = len;
   return function getRandom(){
     pointer = (pointer-1+len) % len;
     var random = Math.floor(Math.random() * pointer);
     var num = (random in range) ? range[random] : random;
     range[random] = (pointer in range) ? range[pointer] : pointer;
     return range[pointer] = num;
   }
  }
let genRandom = genTrackingNumber(20);
let genTrack = genTrackingNumber(20);

function delOrder(id){
  //let user_id = localStorage.getItem("user_id");
  $.ajax({
        url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/closeOrder/${id}`,
        dataType: "JSON",
        contentType: "application/json",
        method: "PUT",
        cache : false,
        data : JSON.stringify({
          'id' : id,
          'new' : 0
        }),
        error: (err) => {
            //unLoadingAnimation()
            if(err.status === 401) {
              alert("kindly login again");
              window.location.href = "/";
            }
            else if (err.status === 403){
              $("#placement_error_log").html('order error code 403');
            }
            else {
              $("#placement_error_log").html("uknown error");
            }
        },
        success: function (results) {
          //if (results.status === 204){
             console.log("success");
           $("#placement_error_log").html('order updated successfully');
          //}
        }
      })
}

function getSellerID(id){
 var seller = null;
 $.ajax({
   url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/fetch/${id}`,
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
       seller = results.data[0].seller_id;
       console.log(seller);
       }
     }
})

return seller;
}

function delUserCart(data){
  //let user_id = localStorage.getItem("user_id");
  $.ajax({
        url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/removeFromCart`,
        dataType: "JSON",
        contentType: "application/json",
        method: "DELETE",
        cache : false,
        data : JSON.stringify({
        "product_id": data.product_id,
        "user_id": data.user_id,
        "quantity": data.quantity,
        "sub_total": data.sub_total
      }),
        error: (err) => {
            //unLoadingAnimation()
            if(err.status === 401) {
              alert("kindly login again");
              window.location.href = "/";
            }
            else if (err.status === 403){
              $("#placement_error_log").html('cart remove error code 403');
            }
            else {
              $("#placement_error_log").html("unknown error");
            }
        },
        success: function (results) {
            console.log("Remove From Cart Success");
            $("#placement_error_log").html('items succesfully removed from cart');

        }
      })
}

function recordSoldItems(data){
  //let user_id = localStorage.getItem("user_id");
  $.ajax({
        url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/tradedItems`,
        dataType: "JSON",
        contentType: "application/json",
        method: "POST",
        cache : false,
        data : JSON.stringify({
        "order_id": data.order_id,
        "seller_id": data.seller_id,
        "product_id": data.product_id,
        "payment_mode": data.payment_mode,
        "status"      : "escrowed"
      }),
        error: (err) => {
            //unLoadingAnimation()
            if(err.status === 401) {
              alert("kindly login again");
              window.location.href = "/";
            }
            else if (err.status === 403){
              $("#placement_error_log").html('record traded items error code 403');
            }
            else {
              $("#placement_error_log").html("unknown error record traded items");
            }
        },
        success: function (results) {
            console.log("Traded Item Record Success");
            $("#placement_error_log").html('items succesfully recorded as traded items');

        }
      })
}

function checkBalances(address , contractAddress) {
	 return new Promise((resolve, reject) => {
			 $.ajax({
					 url: `${AUTH_BACKEND_URL}/api/checkBalances`,
					 dataType: "JSON",
					 contentType: "application/json",
					 method: "POST",
					 data: JSON.stringify({
							 'address': address
					 }),
					 error: (err) => {
							 //reject(alert("Failed to get eth and token balances"))
               $("#placement_error_log").html("Failed to get eth and token balances");
					 },
					 success: (results) => {
							 resolve(results)
					 }
			 })
	 })
}

function getContractAddress(address) {
	 return new Promise((resolve, reject) => {
			 $.ajax({
					 url: `${AUTH_BACKEND_URL}/api/getContractAddress`,
					 dataType: "JSON",
					 contentType: "application/json",
					 method: "POST",
					 data: JSON.stringify({
							 'address': address
					 }),
					 error: (err) => {
							 //reject(alert("Failed to get contract address"))
               $("#placement_error_log").html("Failed to get contract address");
					 },
					 success: (results) => {
							 resolve(results)
					 }
			 })
	 })
}

function checkTokenBalances(address , contractAddress) {
	 return new Promise((resolve, reject) => {
			 $.ajax({
					 url: `${AUTH_BACKEND_URL}/api/TokenBalances`,
					 dataType: "JSON",
					 contentType: "application/json",
					 method: "POST",
					 data: JSON.stringify({
							 'address': address,
							 'contractAddress' : contractAddress
					 }),
					 error: (err) => {
							 //reject(alert("Failed to get token balances"))
               $("#placement_error_log").html("Failed to get token balances");
					 },
					 success: (results) => {
							 resolve(results)
					 }
			 })
	 })
}

function updateQuantity(product_id, quantity){
  $.ajax({
        url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/updateQuantity/${product_id}`,
        dataType: "JSON",
        contentType: "application/json",
        method: "PUT",
        cache : false,
        data: JSON.stringify({
            'id' : product_id,
            'quantity': quantity
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

            $("#placement_error").html('product quantity updated successfully');
            console.log("product quantity updated");

        }
      })
}




//document.getElementById("ethAddress").innerHTML = web3.eth.accounts[0];

function sendTransactionPromise(amount,user,totalAmount,order,carierCompany,carierId,trackingId,Status) { // eslint-disable-line no-inner-declarations
      //return new Promise((resolve, reject) => {
      var txHash = '';
      if (typeof web3 !== 'undefined') {
         // Use Mist/MetaMask's provider
      web3 = new Web3(web3.currentProvider);
      web3.eth.getAccounts((err, res) => {
                         console.log(res[0]);
                        let toAddress = '0x6B71a3AB4a34bf4B4b3f81119398336E43C58659';
                        let gasLimit = 30000;
                        var gasPrice = 0;
                        web3.eth.getGasPrice().then((result) => {
                        console.log(web3.utils.toWei(result, 'ether'));
                         gasPrice = web3.utils.toWei(result, 'ether');
                         gasPrice = gasPrice * 10 ** -18;
                        console.log(gasPrice);
                        var sendAmount = web3.utils.toWei(amount, "ether");
                        var sendParams = { from: res[0], to: toAddress, value: sendAmount};

                          web3.eth.sendTransaction(sendParams).then(function(receipt){
                            console.log(receipt.transactionHash)
                            txHash = receipt.transactionHash;
                            var recTransact =  sendTransaction(txHash, user, totalAmount, "ether", order, toAddress, "paid");
                            if (recTransact && recTransact.length){
                            if(recTransact.success){
                              $("#placement_error_log").html("Transaction recorded");
                          }
                        }
                        var finalize = finalizeTransaction(order,user,carierCompany,carierId,trackingId,Status);
                        if (finalize && finalize.length){
                        if(finalize.success){
                        $("#placement_error_log").html("Shipment recorded");
                      }
                    }
                    });
                  })                        //});
              })
              //return txHash;
            }
          return txHash;
        }


function sendTransaction(reference_no,from,amount,paymentMode,destination,explanation,status) {
	//return new Promise((resolve, reject) => {
			$.ajax({
					url: `${AUTH_BACKEND_URL}/agroAfrica/v1/transactions/transaction`,
					dataType: "JSON",
					contentType: "application/json",
					method: "POST",
					data: JSON.stringify({
							'reference_no': reference_no,
              'user_id' : from,
							'amount': amount,
              'mode': paymentMode,
							'destination': destination,
              'explanation' : explanation,
              'status' : status
					}),
					error: (err) => {
							//reject(alert("Failed to record the transaction"))
              $("#placement_error_log").html("Failed to record the transaction");

					},
					success: (results) => {
							$("#placement_error_log").html('transaction recorded');
					}
			})
	//})
}

/** function getETHUSD() {
	 return new Promise((resolve, reject) => {
			 $.ajax({
					 url: `${AUTH_BACKEND_URL}agroAfrica/v1/transactions/fetchEthPrice`,
					 dataType: "JSON",
					 contentType: "application/json",
					 method: "GET",
					 error: (err) => {
							 //reject(alert("Failed to get USD ETH Price"))
               $("#placement_error_log").html("Failed to get USD ETH Price");
					 },
					 success: (results) => {
							 resolve(results)
					 }
			 })
	 })
} **/

function getETHUSD(){
  var ethUSD = null;
  $.ajax({
    url: `${AUTH_BACKEND_URL}/agroAfrica/v1/transactions/fetchEthPrice`,
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
      if (results.data){
        ethUSD = results.data;
        console.log(ethUSD);

        }
      }
})

return ethUSD;
}

function getlength(number) {
    return number.toString().length;
}

document.getElementById("ethPrice").innerHTML = getETHUSD();
var num = getETHUSD();
//console.log(num[0].usd);
num = num[0];
console.log(num);
num = num.replace("USD: ",'');
console.log(num);

document.getElementById("ethPrice").innerHTML = num;
var worth = localStorage.getItem("eth");//$("#ethAmount").value;
console.log(worth);
worth = parseFloat(worth);
console.log(worth);
document.getElementById("ethWorth").innerHTML = worth*num;
document.getElementById("totalPrice").innerHTML = worth*num;
function tokenUSDPrice(tokenName) {
	 return new Promise((resolve, reject) => {
			 $.ajax({
					 url: `${AUTH_BACKEND_URL}/api/populateUSDtoken`,
					 dataType: "JSON",
					 contentType: "application/json",
					 method: "POST",
					 data: JSON.stringify({
 							'tokenName': tokenName
						}),
					 error: (err) => {
							 //reject(alert("Failed to get USD Token Price"))
               $("#placement_error_log").html("Failed to get USD Token Price");
					 },
					 success: (results) => {
							 resolve(results)
					 }
			 })
	 })
}

 $("#btnPayEth").click( function(e) {
    e.preventDefault()
      let user_id = localStorage.getItem("user_id");
      let order_id = localStorage.getItem('order_id');
      let carier_company = "Wells Fargo";
      //var digits = Math.floor(Math.random() * 9000000000) + 1000000000;
      let carier_id = Math.floor(Math.random() * 90000000) + 10000000;
      console.log(carier_id)
      let tracking_id = Math.floor(Math.random() * 90000000) + 10000000;
      console.log(tracking_id)
      let status = 'preparing';
      //let fromAddress = web3.eth.accounts[0];
      var ethNum = getETHUSD();
      ethNum = ethNum[0];
      console.log(ethNum);
      ethNum = ethNum.replace("USD: ",'');
      console.log(ethNum);
      let amount = document.getElementById('eth_amount').value
      let total = amount * ethNum;
      console.log(amount);
      console.log(total);
      var sendEth = sendTransactionPromise(amount, user_id, total,order_id,carier_company, carier_id, tracking_id,status);
      if (sendEth && sendEth.length){
      if(sendEth.status !== 400){
      console.log(sendEth);
    }
   }

  })

  function refresh(){
  $("#amount").val('');
  $("#eth_amount").val('');
  $("#aga_amount").val('');
  $('#orderTotal').text("");
}

  function finalizeTransaction(order_id,user_id,carier_company,carier_id,tracking_id,status){
    $.ajax({
          url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/ship`,
          dataType: "JSON",
          contentType: "application/json",
          method: "POST",
          cache : false,
          data: JSON.stringify({
              'order_id': order_id,
              'user_id' : user_id,
              'carier_company': carier_company,
              'carier_id' : carier_id,
              'tracking_id': tracking_id,
              'status' : status
          }),
          error: (err) => {
              //unLoadingAnimation()
              if(err.status === 401) {
                alert("kindly login again");
                window.location.href = "/";
              }
              else if (err.status === 403){
                $("#placement_error_log").html('shipment exists');
              }
              else {
                $("#placement_error_log").html(err.message);
              }
          },
          success: function (results) {
             console.log(results.message);
             $("#placement_error_log").html('shipment created successfully');
             var getCart = getActiveCarts(order_id);
             if(!getCart || !getCart.length || getCart.error)
             {
               $("#placement_error_log").html('cart empty');
               return;
             }
            if (getCart){
                console.log(getCart);
                if(getCart.length > 0){
                  if(getCart.length === 1){
                    updateQuantity(getCart[0].product_id, getCart[0].quantity);
                    let currentSeller = getSellerID(getCart[counter].product_id);
                    const recordItems = {
                      "order_id" : getCart[counter].order_id,
                       "seller_id" : currentSeller,
                       "product_id" : getCart[counter].product_id,
                       "payment_mode" : "ether"
                    }
                    recordSoldItems(recordItems);
                    delUserCart(getCart[0]);

                  }
                  else{
                  for (var counter = 0; counter < getCart.length; counter++){
                    updateQuantity(getCart[counter].product_id, getCart[counter].quantity);
                    let currentSeller = getSellerID(getCart[counter].product_id);
                    const recordItems = {
                      "order_id" : getCart[counter].order_id,
                       "seller_id" : currentSeller,
                       "product_id" : getCart[counter].product_id,
                       "payment_mode" : "ether"
                    }
                    recordSoldItems(recordItems);
                    delUserCart(getCart[counter]);
                  }
                }

              }
            }
              var closeOrd = delOrder(order_id);
              if(closeOrd){
                console.log("closeOrd");
                if(closeOrd.success){
                  console.log("close order success");
                  $("#placement_error_log").html('order closed successfully');
                }
              }

             localStorage.setItem('product', "");
             localStorage.setItem('cart', "");
             localStorage.setItem('product', "");
             localStorage.setItem('cart_id', "");
             localStorage.setItem('order', "");
             localStorage.setItem('order_id', "");
             refresh();
             window.location.href = "/shipments.html";
           }

        })
  }

  /** $("#btnPayAGA").click( function(e) {
     e.preventDefault()
       let user_id = localStorage.getItem("user_id");
       let order_id = localStorage.getItem('order_id');
       let carier_company = "Wells Fargo";
       let carier_id = genRandom(20);
       console.log(carier_id)
       let tracking_id = genTrack(20);
       console.log(tracking_id)
       let status = 'preparing';
       let fromAddress = web3.eth.accounts[0];
       let toAddress = '0x6B71a3AB4a34bf4B4b3f81119398336E43C58659';
       let amount = getETHUSD();
       let total = document.getElementById('orderTotal').value
       amount = total/amount;
       var gasLimit = 200000;
       const gasPrice = web3.eth.gasPrice * 3;
       var sendAmount = web3.toWei(amount, "ether");
       var sendParams = {from: fromAddress, to: toAddress, value: sendAmount,gasPrice, gas: gasLimit};
       var sendEth =  sendTransactionPromise(sendParams);
       if (sendEth && sendEth.length){
       //if(sendEth.success){
       var recTransact =  sendTransaction(sendEth.transactionHash, user_id, total, "aga", null, toAddress, "paid");
       if (recTransact && recTransact.length){
       if(recTransact.success){
       $.ajax({
             url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/ship`,
             dataType: "JSON",
             contentType: "application/json",
             method: "POST",
             cache : false,
             data: JSON.stringify({
                 'order_id': order_id,
                 'user_id' : user_id,
                 'carier_company': carier_company,
                 'carier_id' : carier_id,
                 'tracking_id': tracking_id,
                 'status' : status
             }),
             error: (err) => {
                 //unLoadingAnimation()
                 if(err.status === 401) {
                   alert("kindly login again");
                   window.location.href = "/";
                 }
                 else if (err.status === 403){
                   $("#placement_error_log").html('shipment exists');
                 }
                 else {
                   $("#placement_error_log").html(err.message);
                 }
             },
             success: function (results) {
                console.log(results.message);
                $("#placement_error_log").html('shipment created successfully');
                 var closeOrd = delOrder(order_id);
                 if(closeOrd){
                   console.log("closeOrd");
                   if(closeOrd.success){
                     console.log("close order success");
                     $("#placement_error_log").html('order closed successfully');
                   }
                 }
                 var getCart = getActiveCarts(order_id);
                 console.log(getCart);

                if (getCart){
                    if(getCart.length === 0)
                    {
                      $("#placement_error_log").html('cart empty');
                      return;
                    }
                    if(getCart.data.length > 0){
                      if(getCart.data.length === 1){
                        delUserCart(getCart.data[0])
                      }
                      else{
                      for (var counter = 0; counter < getCart.data.length; counter++){
                        delUserCart(getCart.data[counter]);
                      }
                    }

                  }
                }
              }var closeOrd = delOrder(order_id);
              if(closeOrd){
                console.log("closeOrd");
                if(closeOrd.success){
                  console.log("close order success");
                  $("#placement_error_log").html('order closed successfully');
                }
              }
           })
        }
       }
     }
   }) **/

    }
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
  const BACKEND_URL = 'http://localhost:5000';
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
