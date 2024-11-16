var express = require('express');
var bodyParser = require('body-parser');
var Web3 = require('web3');
var path = require('path');
var Users = require('./../build/contracts/users');
const provider = require('./provider');
const contractAddresses = require('./contractAddresses');
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


var UsersABI = Users.abi;
const UsersContract = new  web3.eth.Contract(UsersABI,contractAddresses.users_contract);

function deListingPromiseRaw(buyerAddress) {
  return new Promise((resolve, reject) => {
    const addr = contractAddresses.admin;
    web3.eth.getTransactionCount(addr, function(error, txCount) {
    console.log(txCount);
    const encoded = ProductsContract.methods.blacklistUser(buyerAddress).encodeABI();
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



app.post('/products/api/removeFromWhitelist', async function(req, res){
  try
  {
    //web3.setProvider(new Web3.providers.HttpProvider(provider));
    const address = req.body.address;
    const execDelete = await deListingPromiseRaw(address);
    res.send({
      error: 0,
      txid: execDelete
    });
  } catch(err) {
    console.log('err' + err.message);
    res.status(500).send({
      error: 1,
      error_message: err.message
    });
  }
  finally{
    var DelistingTime = new Date(Date.now()).toUTCString();
    console.log("products.js [removeFromWhitelist] Executed at UTC Time :" + DelistingTime);
  }
})

function addToWhitelistMetaMask(user, user_name, user_role) {
  return new Promise((resolve, reject) => {
    const addr = contractAddresses.admin;
    web3.eth.getTransactionCount(addr, function(error, txCount) {
    console.log(txCount);
    const encoded = ProductsContract.methods.addUser(user, user_name, user_role).encodeABI();
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

/**
Function/Module Name : addToWhitelist
Purpose : A POST  API endpoint for adding a new user to AgroAfrica
Input: the user's Ethereum address
Output : the user's address, name, and role
**/

app.post('/products/api/addToWhitelist', async (req, res) => {
  try
  {
    console.log('Request in')
    const {user, user_name, user_role} = req.body
    const execSetRate = await addToWhitelistMetaMask(user, user_name, user_role);
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
    var ListingTime = new Date(Date.now()).toUTCString();
    console.log("products.js [addToWhitelist] Executed at UTC Time :" + ListingTime);
  }
});


function isWhiteListedPromise(address) {
  return new Promise((resolve, reject) => {
    ProductsContract.methods.isUser(address).call().then(function (white) {
          console.log("End Date is" + " "  + white)
          return resolve(white);
        })
      })
}


app.post('/products/api/isWhitelisted', async (req, res) => {
  try
  {
    const execWhitelisted = await isWhiteListedPromise(req.body.address);
    res.send({
      error: 0,
      isWhitelisted: execWhitelisted
    });
  } catch(err) {
    console.log('err' + err.message);
    res.status(500).send({
      error: 1,
      error_message: err.message
    });
  }
  finally{
    var isListed = new Date(Date.now()).toUTCString();
    console.log("products.js [isWhitelisted] Executed at UTC Time :" + isListed);
  }
});
