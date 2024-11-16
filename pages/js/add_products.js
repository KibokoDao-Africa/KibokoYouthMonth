$(document).ready(function(){
  let logout = document.getElementById("logout")
  let sellProf = document.getElementById("seller_profile")
  let addProds = document.getElementById("seller_settings")
  let sellProds = document.getElementById("sellerProducts")
  let sellSale = document.getElementById("sellerSales")
  let sellDisp = document.getElementById("sellerDispatch")
  let sellWare = document.getElementById("sellerWarehouses")
  let sellTrans = document.getElementById("sellerTransactions")

    var isLoggedIn = localStorage.getItem("agroAfric_user_name");
    //let cookie = "sid";
    var role = localStorage.getItem("role");
    var isCookie = getCookie("sid");
    console.log(isCookie);
    console.log(isLoggedIn);
    if (typeof isLoggedIn === 'undefined' || isLoggedIn === null || !isLoggedIn || role !== 'seller'){
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
      $(sellProf).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/profile/'+localStorage.getItem('user_id'))

      $(addProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/updateSeller')

      $(sellProds).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/products')

      $(sellSale).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/sales')

      $(sellDisp).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/dispatch')

      $(sellWare).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/warehouses')

      $(sellTrans).attr("href", '/agroAfrica/v1/user/'+localStorage.getItem('role')+'/'+localStorage.getItem('user_id') + '/transactions')

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

      function refresh(){
        $("#product_name").val('')
        $("#category").val('')
        $("#warehouse_id").val('')
        $("#picture").val('')
        $("#limit").val('')
        $("#currency").val('')
        $("#available").val('')
        $("#description").val('')
        $("#quantity").val('')
        $("#price").val('')
      }
      function dec2Hex(dec){
        return ('0' + dec.toString(16)).substr(-2)

      }
      function generateSKU(len){
        var arr = new Uint8Array((len || 48) / 2)
        window.crypto.getRandomValues(arr)
          return Array.from(arr, dec2Hex).join('')
        }

        function getNextProduct(){
          var count = null;
          $.ajax({
            url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/fetchAll`,
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
                count = results.data.length;
                console.log(count);
                }
              }
        })

        return count;
        }
        let nextProd = getNextProduct();
        nextProd = nextProd + 1;
        let prodUrl = '/images/products/' + nextProd;
        $("#picture").val(prodUrl);

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
      $("#addProd").click(function(e){
          e.preventDefault()

            let email = localStorage.getItem("agroAfric_user_name");
            //console.log(id)
            let seller_id = localStorage.getItem("seller_id")
            //let id = '<%= Session[] %>';
            console.log(seller_id)
            let sku = generateSKU(24);
            console.log(sku);

            let warehouse_id = document.getElementById('warehouse_id').value
            let name = document.getElementById('product_name').value
            let category = document.getElementById('category').value
            let quantity = document.getElementById('quantity').value;
            let picture = document.getElementById('picture').value;
            let one_time_limit = document.getElementById('limit').value
            let currency = document.getElementById('currency').value
            let available = document.getElementById('available').value
            let description = document.getElementById('description').value
            let price = document.getElementById('price').value
            $.ajax({
                  url: `${AUTH_BACKEND_URL}/agroAfrica/v1/product/add`,
                  dataType: "JSON",
                  contentType: "application/json",
                  method: "POST",
                  data: JSON.stringify({
                      'name': name,
                      'sku' :sku,
                      'seller_id' : seller_id,
                      'warehouse_id' : warehouse_id,
                      'picture' : picture,
                      'quantity': quantity,
                      'price': price,
                      'currency' : currency,
                      'one_time_limit' : one_time_limit,
                      'description' : description,
                      'category_id' : category
                  }),
                  error: (err) => {
                    refresh();
                      if(err.status === 403) {
                          //alert(err.message);
                          $("#placement_error_log").html('Error adding product');
                      }
                      else{
                        $("#placement_error_log").html('Incorrect Details or Server Error');
                      }
                  },
                  success: function (results) {
                      alert("Product added successfully");
                      refresh();
                      var user = localStorage.getItem("user_id");
                      window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem("role")+'/'+localStorage.getItem("user_id") + '/products';
                  }
          })
        })
      //window.location.href = 'complete_profile.html?id='+localStorage.getItem("user_id");///http://localhost:5000//agroAfrica/v1/user/profile/" + //localStorage.getItem('user_id') + "complete_profile.html";
    }
    /** function getCookie(ckname){
      var name = ckname + "=";
      console.log(name);
      //var b = document.cookie.match('(^|:)\\s*' + a + '\\s*=\\s*([^;]+)');//decodeURIComponent(document.cookie);
      //console.log(b);
      //return b ? b.pop() : '';
      var decoded_cookie = decodeURIComponent(document.cookie);
      var cook = decoded_cookie.split(';'); //document.cookie.indexOf('none=');
      console.log(cook);
      for(var cnt = 0; cnt < cook.length; cnt++){
        var cok = cook[cnt];
        //cookName[cnt] = cook[cnt].split('=').trim();
        //console.log(cookName);

      //console.log(document.cookie.indexOf("; " + name));

        while (cok.charAt(0) == ' '){
          cok = cok.substring(1);
        }
        if (cok.indexOf(name) == 0){
          return cok.substring(cok.length);
        }
      }
      return "";

    } **/
     function getCookie(name){
       //import Cookies from './js.cookie.mjs'
       var validCookie = Cookies.get(name, { domain: 'localhost' });
       console.log(validCookie);
       return validCookie;
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
          window.location.href = "/";
        }
        },
        success: function(results){

        }
      });
    }, 1800000);
