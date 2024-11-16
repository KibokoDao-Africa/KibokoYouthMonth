var express = require('express');
var bodyParser = require('body-parser');
var Web3 = require('web3');
var path = require('path');
var Products = require('./../build/contracts/products');
const provider = require('./provider');
const contractAddress = require('./contractAddress');
const cors = require('cors')
var BigNumber = require('big-number');

require('dotenv').config()
const Tx = require('ethereumjs-tx').Transaction
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//Initialize the web3 provider using localhost RPC and an Infura RPC Fallback
var web3 = new Web3(new Web3.providers.HttpProvider(provider.provider));
const privateKey =  Buffer.from(process.env.PRIVATE_KEY, 'hex');


var ProductsABI = Products.abi;
const ProductsContract = new  web3.eth.Contract(ProductsABI,contractAddresses.TokenContract);


function addNewProduct(name,location,price,farmer,grade,quantity) {
  return new Promise((resolve, reject) => {
    const addr = contractAddresses.admin;
    web3.eth.getTransactionCount(addr, function(error, txCount) {
    console.log(txCount);
    //amount = amount*Math.pow(10,6);
    const encoded = ProductsContract.methods.addNewProduct(name,location,price,farmer,grade,quantity).encodeABI();
    var rawTransaction = {
      "nonce": web3.utils.toHex(txCount),
      "gasPrice": "0x04e3b29200",
      "gasLimit": "0xF458F",
      "to": contractAddresses.productContractAddress,
      "value": "0x0",
      "data": encoded
    };

    var privKey = privateKey
    var tx = new Tx(rawTransaction,  {'chain':'rinkeby'});

    tx.sign(privKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (err, hash) => {
      if(err) {
        console.log(err)
        reject(new Error(err.message))
      }
      console.log(hash);
      resolve(hash)
    })
  })
})
}

app.post('/products/api/addNewProduct', async (req, res) => {
  try
  {
    console.log('Request in')
    const farmer = web3.eth.accounts[0];
     const execSetRate = await addNewProduct(req.body.name,req.body.location,req.body.price,farmer,req.body.grade,req.body.quantity);
    res.send({
      error: 0,
      txid: execSetRate
    });
  } catch(err) {
    console.log('err' + err.message);
    res.status(500).send({
      error: 1,
      error_message: err.message
    });
  }
  finally{
    var addNewProductTime = new Date(Date.now()).toUTCString();
    console.log("products.js [addNewProduct] Executed at UTC Time :" + addNewProductTime);
  }
});

function sellProduct(product_name,buyer,quantity,destination,eth_price) {
  return new Promise((resolve, reject) => {
    const addr = contractAddresses.admin;
    web3.eth.getTransactionCount(addr, function(error, txCount) {
    console.log(txCount);
    //amount = amount*Math.pow(10,6);
    const encoded = ProductsContract.methods.sellProduct(product_name,buyer,quantity,destination,eth_price).encodeABI();
    var rawTransaction = {
      "nonce": web3.utils.toHex(txCount),
      "gasPrice": "0x04e3b29200",
      "gasLimit": "0xF458F",
      "to": contractAddresses.productContractAddress,
      "value": "0x0",
      "data": encoded
    };

    var privKey = privateKey
    var tx = new Tx(rawTransaction,  {'chain':'rinkeby'});

    tx.sign(privKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (err, hash) => {
      if(err) {
        console.log(err)
        reject(new Error(err.message))
      }
      console.log(hash);
      resolve(hash)
    })
  })
})
}

app.post('/products/api/sellProduct', async (req, res) => {
  try
  {
    console.log('Request in')
    const buyer = web3.eth.accounts[0];
     const execSetRate = await sellProduct(req.body.product_name,buyer,req.body.quantity,req.body.destination,req.body.eth_price);
    res.send({
      error: 0,
      txid: execSetRate
    });
  } catch(err) {
    console.log('err' + err.message);
    res.status(500).send({
      error: 1,
      error_message: err.message
    });
  }
  finally{
    var SellProductTime = new Date(Date.now()).toUTCString();
    console.log("products.js [sellProduct] Executed at UTC Time :" + SellProductTime);
  }
});

function updateProductPrice(eth_price,product_name) {
  return new Promise((resolve, reject) => {
    const addr = contractAddresses.admin;
    web3.eth.getTransactionCount(addr, function(error, txCount) {
    console.log(txCount);
    //amount = amount*Math.pow(10,6);
    const encoded = ProductsContract.methods.updateProductPrice(eth_price,product_name).encodeABI();
    var rawTransaction = {
      "nonce": web3.utils.toHex(txCount),
      "gasPrice": "0x04e3b29200",
      "gasLimit": "0xF458F",
      "to": contractAddresses.productContractAddress,
      "value": "0x0",
      "data": encoded
    };

    var privKey = privateKey
    var tx = new Tx(rawTransaction,  {'chain':'rinkeby'});

    tx.sign(privKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (err, hash) => {
      if(err) {
        console.log(err)
        reject(new Error(err.message))
      }
      console.log(hash);
      resolve(hash)
    })
  })
})
}

app.post('/products/api/updateProductPrice', async (req, res) => {
  try
  {
    console.log('Request in')
    const farmer = web3.eth.accounts[0];
    const execSetRate = await updateProductPrice(req.body.eth_price,req.body.name);
    res.send({
      error: 0,
      txid: execSetRate
    });
  } catch(err) {
    console.log('err' + err.message);
    res.status(500).send({
      error: 1,
      error_message: err.message
    });
  }
  finally{
    var UpdateProductTime = new Date(Date.now()).toUTCString();
    console.log("products.js [sellProduct] Executed at UTC Time :" + UpdateProductTime);
  }
});

function buyProduct(product_name,location,quantity,farmer,eth_price) {
  return new Promise((resolve, reject) => {
    const addr = contractAddresses.admin;
    web3.eth.getTransactionCount(addr, function(error, txCount) {
    console.log(txCount);
    //amount = amount*Math.pow(10,6);
    const encoded = ProductsContract.methods.sellProduct(product_name,location,quantity,farmer,eth_price).encodeABI();
    var rawTransaction = {
      "nonce": web3.utils.toHex(txCount),
      "gasPrice": "0x04e3b29200",
      "gasLimit": "0xF458F",
      "to": contractAddresses.productContractAddress,
      "value": "0x0",
      "data": encoded
    };

    var privKey = privateKey
    var tx = new Tx(rawTransaction,  {'chain':'rinkeby'});

    tx.sign(privKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (err, hash) => {
      if(err) {
        console.log(err)
        reject(new Error(err.message))
      }
      console.log(hash);
      resolve(hash)
    })
  })
})
}

app.post('/products/api/buyProduct', async (req, res) => {
  try
  {
    console.log('Request in')
    const buyer = web3.eth.accounts[0];
     const execSetRate = await buyProduct(req.body.product_name,req.body.location,req.body.quantity,req.body.farmer,req.body.eth_price);
    res.send({
      error: 0,
      txid: execSetRate
    });
  } catch(err) {
    console.log('err' + err.message);
    res.status(500).send({
      error: 1,
      error_message: err.message
    });
  }
  finally{
    var BuyProductTime = new Date(Date.now()).toUTCString();
    console.log("products.js [sellProduct] Executed at UTC Time :" + BuyProductTime);
  }
});


function addUpdateToCart(product_name,location,quantity,orderId,eth_price) {
  return new Promise((resolve, reject) => {
    const addr = contractAddresses.admin;
    web3.eth.getTransactionCount(addr, function(error, txCount) {
    console.log(txCount);
    //amount = amount*Math.pow(10,6);
    const encoded = ProductsContract.methods.sellProduct(product_name,location,quantity,orderId,eth_price).encodeABI();
    var rawTransaction = {
      "nonce": web3.utils.toHex(txCount),
      "gasPrice": "0x04e3b29200",
      "gasLimit": "0xF458F",
      "to": contractAddresses.productContractAddress,
      "value": "0x0",
      "data": encoded
    };

    var privKey = privateKey
    var tx = new Tx(rawTransaction,  {'chain':'rinkeby'});

    tx.sign(privKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (err, hash) => {
      if(err) {
        console.log(err)
        reject(new Error(err.message))
      }
      console.log(hash);
      resolve(hash)
    })
  })
})
}

app.post('/products/api/addUpdateToCart', async (req, res) => {
  try
  {
    console.log('Request in')
    const buyer = web3.eth.accounts[0];
     const execSetRate = await addUpdateToCart(req.body.product_name,req.body.location,req.body.quantity,req.body.orderId,req.body.eth_price);
    res.send({
      error: 0,
      txid: execSetRate
    });
  } catch(err) {
    console.log('err' + err.message);
    res.status(500).send({
      error: 1,
      error_message: err.message
    });
  }
  finally{
    var AddToCartTime = new Date(Date.now()).toUTCString();
    console.log("products.js [sellProduct] Executed at UTC Time :" + AddToCartTime);
  }
});



function setProductPictureLink(farmer,product_name,pictureLink) {
  return new Promise((resolve, reject) => {
    const addr = contractAddresses.admin;
    web3.eth.getTransactionCount(addr, function(error, txCount) {
    console.log(txCount);
    //amount = amount*Math.pow(10,6);
    const encoded = ProductsContract.methods.setProductPictureLink(farmer,product_name,pictureLink).encodeABI();
    var rawTransaction = {
      "nonce": web3.utils.toHex(txCount),
      "gasPrice": "0x04e3b29200",
      "gasLimit": "0xF458F",
      "to": contractAddresses.productContractAddress,
      "value": "0x0",
      "data": encoded
    };

    var privKey = privateKey
    var tx = new Tx(rawTransaction,  {'chain':'rinkeby'});

    tx.sign(privKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (err, hash) => {
      if(err) {
        console.log(err)
        reject(new Error(err.message))
      }
      console.log(hash);
      resolve(hash)
    })
  })
})
}

app.post('/products/api/setProductPictureLink', async (req, res) => {
  try
  {
    console.log('Request in')
    const buyer = web3.eth.accounts[0];
     const execSetRate = await setProductPictureLink(req.body.farmer, req.body.product_name,req.body.pictureLink);
    res.send({
      error: 0,
      txid: execSetRate
    });
  } catch(err) {
    console.log('err' + err.message);
    res.status(500).send({
      error: 1,
      error_message: err.message
    });
  }
  finally{
    var SetPictureTime = new Date(Date.now()).toUTCString();
    console.log("products.js [SetPictureTime] Executed at UTC Time :" + SetPictureTime);
  }
});

app.listen(5656, function(err){
  if (!err) {
    console.log("Server is Running on port 5656");
  }
});
