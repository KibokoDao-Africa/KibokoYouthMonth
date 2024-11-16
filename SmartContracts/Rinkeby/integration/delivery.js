var express = require('express');
var bodyParser = require('body-parser');
var Web3 = require('web3');
var path = require('path');
var BetaTickerERC20 = require('./../build/contracts/BetaTickerERC20');
var TetherToken = require('./../build/contracts/TetherToken');
const provider = require('./provider');
const contractAddress = require('./contractAddress');
const cors = require('cors')
var BigNumber = require('big-number');
//const TransferTokens = require('./libs/TransferTokens')
require('dotenv').config()
const Tx = require('ethereumjs-tx').Transaction
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//Initialize the web3 provider using localhost RPC and an Infura RPC Fallback
var web3 = new Web3(new Web3.providers.HttpProvider(provider.provider));
const privateKey =  Buffer.from(process.env.PRIVATE_KEY, 'hex');
var BetaTickerERC20ABI = BetaTickerERC20.abi;
//var TicketCrowdsaleABI = TicketCrowdsale.abi;
var TetherTokenABI = TetherToken.abi;
const BetaTickerContract = new  web3.eth.Contract(BetaTickerERC20ABI,contractAddress.TokenContract);
const TicketCrowdsaleContract = new web3.eth.Contract(TicketCrowdsale,contractAddress.contractAddress);
const TetherTokenContract = new web3.eth.Contract(TetherTokenABI,contractAddress.tether);


function tokenBalancePromise(address){
  return new Promise((resolve, reject) => {
  BetaTickerContract.methods.balanceOf(address).call().then(function (result) {
    console.log("User's Token balance is" + " "  + result)
    return resolve(result);
  })
});
}

function TokenRemaining(address) {
  return new Promise((resolve, reject) => {
web3.eth.getBalance(address, function(err, result) {
if (err) {
console.log(err)
} else {
console.log(web3.utils.fromWei(result, "ether") + " ETH");
var ethBalance = web3.utils.fromWei(result, "ether");
console.log("User's Ether balance is" + " "  + ethBalance)
return resolve(ethBalance);
};
})
})
}

/**
Function/Module Name : checkUserBalances
Purpose : A POST  API endpoint for checking the User's BTMG PRE-ICO or any ERC20 token balance
Input: the user's Ethereum address
Output : the user's Crowdsale or ERC20 token Balance
**/

app.post('/Crowdsale/api/checkUserBalances', async function(req, res){
  try
  {
    var address = req.body.address;
    /**
    TicketCrowdsalePromise is an assynchornous function that accepts user address and BTMG Contract address
    It returns the numeric value of the  user's  BetaTicker Token and Ether Balance
    **/

      var ethBal = await TokenRemaining(address);
      var tokenBal = await tokenBalancePromise(address);
      var output =
      {
        ethBalance : ethBal,
        tokenBalance : tokenBal
      }


      res.send(output);

  }
  catch(err){
    console.log(err.message);
    res.send(err.message);
  }
  finally{
    var time = new Date(Date.now()).toUTCString();
    console.log("main.js [checkUserBalances] is executed at UTC Time :" + time);
  }
});

/**
Function/Module Name : TetherBalances
Purpose : A POST  API endpoint for checking the User's USDT crowdsale or any ERC20 token balance
Input: the user's Ethereum address
Output : Tether token Balance
**/
function tetherBalancePromise(address){
  return new Promise((resolve, reject) => {
  TetherTokenContract.methods.balanceOf(address).call().then(function (result) {
    console.log("User's Token balance is" + " "  + result)
    return resolve(result);
  })
});
}


app.post('/Crowdsale/api/checkTetherBalance', async function(req, res){
  try
  {
    var address = req.body.address;
    /**
    TicketCrowdsalePromise is an assynchornous function that accepts user address and Tether Contract address
    It returns the numeric value of the  user's  BetaTicker Token and Ether Balance
    **/

      var tokenBal = await tetherBalancePromise(address);
      var output =
      {
        tokenBalance : tokenBal
      }


      res.send(output);

  }
  catch(err){
    console.log(err.message);
    res.send(err.message);
  }
  finally{
    var time = new Date(Date.now()).toUTCString();
    console.log("main.js [checkTetherBalance] is executed at UTC Time :" + time);
  }
});



function deListingPromiseRaw(buyerAddress) {
  return new Promise((resolve, reject) => {
    const addr = contractAddress.admin;
    web3.eth.getTransactionCount(addr, function(error, txCount) {
    console.log(txCount);
    const encoded = TicketCrowdsaleContract.methods.removeFromWhitelist(buyerAddress).encodeABI();
    var rawTransaction = {
      "nonce": web3.utils.toHex(txCount),
      "gasPrice": "0x04e3b29200",
      "gasLimit": "0xF458F",
      "to": contractAddress.contractAddress,
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



app.post('/Crowdsale/api/removeFromWhitelist', async function(req, res){
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
    console.log("main.js [removeFromWhitelist] Executed at UTC Time :" + DelistingTime);
  }
})

function adjustDatePromiseRaw(newDate) {
  return new Promise((resolve, reject) => {
    const addr = contractAddress.admin;
    web3.eth.getTransactionCount(addr, function(error, txCount) {
    console.log(txCount);
    const encoded = TicketCrowdsaleContract.methods.adjustEndDate(newDate).encodeABI();
    var rawTransaction = {
      "nonce": web3.utils.toHex(txCount),
      "gasPrice": "0x04e3b29200",
      "gasLimit": "0xF458F",
      "to": contractAddress.contractAddress,
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


app.post('/Crowdsale/api/adjustEndDate', async function(req, res){
  try
  {
    const newDate = req.body.newDate;
    const execAdjustDate = await adjustDatePromiseRaw(newDate);
    res.send({
      error: 0,
      txid: execAdjustDate
    });
  } catch(err) {
    console.log('err' + err.message);
    res.status(500).send({
      error: 1,
      error_message: err.message
    });
  }
  finally{
    var adjustTime = new Date(Date.now()).toUTCString();
    console.log("main.js [adjustEndDate] Executed at UTC Time :" + adjustTime);
  }
})


function adjustStartDatePromiseRaw(newDate) {
  return new Promise((resolve, reject) => {
    const addr = contractAddress.admin;
    web3.eth.getTransactionCount(addr, function(error, txCount) {
    console.log(txCount);
    const encoded = TicketCrowdsaleContract.methods.adjustStartDate(newDate).encodeABI();
    var rawTransaction = {
      "nonce": web3.utils.toHex(txCount),
      "gasPrice": "0x04e3b29200",
      "gasLimit": "0xF458F",
      "to": contractAddress.contractAddress,
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


app.post('/Crowdsale/api/adjustStartDate', async function(req, res){
  try{
  const newDate = req.body.newDate;
  const execAdjustStartDate = await adjustStartDatePromiseRaw(newDate);
  res.send({
    error: 0,
    txid: execAdjustStartDate
  });
} catch(err) {
  console.log('err' + err.message);
  res.status(500).send({
    error: 1,
    error_message: err.message
  });
}
  finally{
    var AdjustingStartTime = new Date(Date.now()).toUTCString();
    console.log("main.js [adjustStartDate] Executed at UTC Time :" + AdjustingStartTime);
  }
})



function purchaseTokensPromiseRaw(buyerAddress) {
  return new Promise((resolve, reject) => {
    const addr = contractAddress.admin;
    web3.eth.getTransactionCount(addr, function(error, txCount) {
    console.log(txCount);
    const encoded = TicketCrowdsaleContract.methods.buyTokens(buyerAddress).encodeABI();
    var rawTransaction = {
      "nonce": web3.utils.toHex(txCount),
      "gasPrice": "0x04e3b29200",
      "gasLimit": "0xF458F",
      "to": contractAddress.contractAddress,
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


app.post('/Crowdsale/api/BuyTokens', async (req, res) => {
  try
  {
    console.log('Request in')
    const {address} = req.body
    //const sender = web3.eth.accounts[0];

    const execSetRate = await purchaseTokensPromiseRaw(address);
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
    var WithdrawalTime = new Date(Date.now()).toUTCString();
    console.log("main.js [BuyTokens] Executed at UTC Time :" + WithdrawalTime);
  }
});

function setRatePromiseRaw(newRate) {
  return new Promise((resolve, reject) => {
    const addr = contractAddress.admin;
    web3.eth.getTransactionCount(addr, function(error, txCount) {
    console.log(txCount);
    const encoded = TicketCrowdsaleContract.methods.setRate(newRate).encodeABI();
    var rawTransaction = {
      "nonce": web3.utils.toHex(txCount),
      "gasPrice": "0x04e3b29200",
      "gasLimit": "0xF458F",
      "to": contractAddress.contractAddress,
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


app.post('/Crowdsale/api/setRate', async (req, res) => {
  try
  {
    console.log('Request in')
    const {newRate} = req.body
    const execSetRate = await setRatePromiseRaw(newRate);
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
    var setRateTime = new Date(Date.now()).toUTCString();
    console.log("main.js [setRate] Executed at UTC Time :" + setRateTime);
  }
});

function fundsRecievedMetaMask(buyer,amount) {
  return new Promise((resolve, reject) => {
    const addr = contractAddress.admin;
    web3.eth.getTransactionCount(addr, function(error, txCount) {
    console.log(txCount);
    amount = amount*Math.pow(10,6);
    const encoded = TicketCrowdsaleContract.methods.fundsRecieved(buyer,amount).encodeABI();
    var rawTransaction = {
      "nonce": web3.utils.toHex(txCount),
      "gasPrice": "0x04e3b29200",
      "gasLimit": "0xF458F",
      "to": contractAddress.contractAddress,
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

app.post('/Crowdsale/api/fundsRecieved', async (req, res) => {
  try
  {
    console.log('Request in')
    //const investor = web3.eth.accounts[0];
     const execSetRate = await fundsRecievedMetaMask(req.body.address,req.body.amount);
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
    var WithdrawalTime = new Date(Date.now()).toUTCString();
    console.log("main.js [FundsRecieved] Executed at UTC Time :" + WithdrawalTime);
  }
});



function addToWhitelistMetaMask(investor) {
  return new Promise((resolve, reject) => {
    const addr = contractAddress.admin;
    web3.eth.getTransactionCount(addr, function(error, txCount) {
    console.log(txCount);
    const encoded = TicketCrowdsaleContract.methods.addToWhitelist(investor).encodeABI();
    var rawTransaction = {
      "nonce": web3.utils.toHex(txCount),
      "gasPrice": "0x04e3b29200",
      "gasLimit": "0xF458F",
      "to": contractAddress.contractAddress,
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
app.post('/Crowdsale/api/addToWhitelist', async (req, res) => {
  try
  {
    console.log('Request in')
    const {sender} = req.body
    const execSetRate = await addToWhitelistMetaMask(sender);
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
    console.log("main.js [addToWhitelist] Executed at UTC Time :" + ListingTime);
  }
});



function getStartDatePromise() {
  return new Promise((resolve, reject) => {
    TicketCrowdsaleContract.methods.startDate().call().then(function (start) {
          console.log("Start Date is" + " "  + start)
          return resolve(start);
        })
      })
}


app.get('/Crowdsale/api/getStartDate', async (req, res) => {
  try
  {
    const execStartDate = await getStartDatePromise();
    res.send({
      error: 0,
      startDate: execStartDate
    });
  } catch(err) {
    console.log('err' + err.message);
    res.status(500).send({
      error: 1,
      error_message: err.message
    });
  }
  finally{
    var getStart = new Date(Date.now()).toUTCString();
    console.log("main.js [getStartDate] Executed at UTC Time :" + getStart);
  }
});

function getEndDatePromise() {
  return new Promise((resolve, reject) => {
TicketCrowdsaleContract.methods.endDate().call().then(function (end) {
      console.log("End Date is" + " "  + end)
      return resolve(end);
    })
  })
  /*TicketCrowdsaleContract.endDate(function(err, dt){
     if (err) {
       console.log(err);
       resolve(err);
       return reject(err);
     }
     console.log("sent");
     return resolve(dt);
   });
 }); */

}


app.get('/Crowdsale/api/getEndDate', async (req, res) => {
  try
  {
    const execEndDate = await getEndDatePromise();
    res.send({
      error: 0,
      endDate: execEndDate
    });
  } catch(err) {
    console.log('err' + err.message);
    res.status(500).send({
      error: 1,
      error_message: err.message
    });
  }
  finally{
    var getEnd = new Date(Date.now()).toUTCString();
    console.log("main.js [getEndDate] Executed at UTC Time :" + getEnd);
  }
});

function getTotalSupply(){
  return new Promise((resolve, reject) => {
  BetaTickerContract.methods.totalSupply().call().then(function (result) {
    console.log(" Total Supply is" + " "  + result)
    return resolve(result);
  })
});
}

app.get('/Crowdsale/api/getTokenSold', async (req, res) => {
  try
  {
    const remainingTokens = await tokenBalancePromise(contractAddress.admin);
    const total = await getTotalSupply();
    var tokenSold = total - remainingTokens;
    res.send({
      error: 0,
      tokenSold: tokenSold
    });
  } catch(err) {
    console.log('err' + err.message);
    res.status(500).send({
      error: 1,
      error_message: err.message
    });
  }
  finally{
    var getTokens = new Date(Date.now()).toUTCString();
    console.log("main.js [getTokenSold] Executed at UTC Time :" + getTokens);
  }
});

function getInvestedAmountPromise(address) {
  return new Promise((resolve, reject) => {
    TicketCrowdsaleContract.methods.investedAmount(address).call().then(function (invest) {
      invest = invest * Math.pow(10, -6);
      console.log( address +" Invested is" + " "  + invest)
      return resolve(invest);
    })
  })
}

app.post('/Crowdsale/api/getInvestedAmount', async (req, res) => {
  try
  {
    const address =req.body.address;
    const execInvestment = await getInvestedAmountPromise(address);
    res.send({
      error: 0,
      investment: execInvestment
    });
  } catch(err) {
    console.log('err' + err.message);
    res.status(500).send({
      error: 1,
      error_message: err.message
    });
  }
  finally{
    var getInvestment = new Date(Date.now()).toUTCString();
    console.log("main.js [getInvestedAmount] Executed at UTC Time :" + getInvestment);
  }
});

function getTokenPromise() {
  return new Promise((resolve, reject) => {
  TicketCrowdsaleContract.methods._token().call().then(function (tether) {
    //tokens = tokens * Math.pow(10, 0);
    console.log("Tether Token is" + " "  + tether)
    return resolve(tether);
  })
})
}


app.get('/Crowdsale/api/token', async (req, res) => {
  try
  {
    const execToken = await getTokenPromise();
    res.send({
      error: 0,
      token: execToken
    });
  } catch(err) {
    console.log('err' + err.message);
    res.status(500).send({
      error: 1,
      error_message: err.message
    });
  }
  finally{
    var getToken = new Date(Date.now()).toUTCString();
    console.log("main.js [token] Executed at UTC Time :" + getToken);
  }
});

function getAcceptedTokenPromise() {
  return new Promise((resolve, reject) => {
    TicketCrowdsaleContract.methods.tokentoDistribute().call().then(function (tokenAccepted) {
          console.log("Accepted Token is" + " "  + tokenAccepted)
          return resolve(tokenAccepted);
        })
      })
}


app.get('/Crowdsale/api/tokenToDistribute', async (req, res) => {
  try
  {
    const execDistribute = await getAcceptedTokenPromise();
    res.send({
      error: 0,
      distributedToken: execDistribute
    });
  } catch(err) {
    console.log('err' + err.message);
    res.status(500).send({
      error: 1,
      error_message: err.message
    });
  }
  finally{
    var getAcceptedToken = new Date(Date.now()).toUTCString();
    console.log("main.js [tokenToDistribute] Executed at UTC Time :" + getAcceptedToken);
  }
});

function pausePromise() {
  return new Promise((resolve, reject) => {
    const addr = contractAddress.admin;
    web3.eth.getTransactionCount(addr, function(error, txCount) {
    console.log(txCount);
    const encoded = TicketCrowdsaleContract.methods.pause().encodeABI();//ticketAbi.burn(address,amount);
    var rawTransaction = {
      "nonce": web3.utils.toHex(txCount),
      "gasPrice": "0x04e3b29200",
      "gasLimit": "0xF458F",
      "from" : addr,
      "to": contractAddress.TokenContract,
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


app.get('/Crowdsale/api/pause', async (req, res) => {
  try
  {
    const execPause = await pausePromise();
    res.send({
      error: 0,
      paused: execPause
    });
  } catch(err) {
    console.log('err' + err.message);
    res.status(500).send({
      error: 1,
      error_message: err.message
    });
  }
  finally{
    var pauseTime = new Date(Date.now()).toUTCString();
    console.log("main.js [pause] Executed at UTC Time :" + pauseTime);
  }
});

function unPausePromise() {
  return new Promise((resolve, reject) => {
    const addr = contractAddress.admin;
    web3.eth.getTransactionCount(addr, function(error, txCount) {
    console.log(txCount);
    const encoded = TicketCrowdsaleContract.methods.unpause().encodeABI();//ticketAbi.burn(address,amount);
    var rawTransaction = {
      "nonce": web3.utils.toHex(txCount),
      "gasPrice": "0x04e3b29200",
      "gasLimit": "0xF458F",
      "from" : addr,
      "to": contractAddress.TokenContract,
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


app.get('/Crowdsale/api/unpause', async (req, res) => {
  try
  {
    const execUnpause = await unPausePromise();
    res.send({
      error: 0,
      unPaused: execUnpause
    });
  } catch(err) {
    console.log('err' + err.message);
    res.status(500).send({
      error: 1,
      error_message: err.message
    });
  }
  finally{
    var unPauseTime = new Date(Date.now()).toUTCString();
    console.log("main.js [unpause] Executed at UTC Time :" + unPauseTime);
  }
});

function isPausedPromise() {
  return new Promise((resolve, reject) => {
    TicketCrowdsaleContract.methods.paused().call().then(function (paused) {
          console.log("End Date is" + " "  + paused)
          return resolve(paused);
        })
      })
}


app.get('/Crowdsale/api/isPaused', async (req, res) => {
  try
  {
    const execisPaused = await isPausedPromise();
    res.send({
      error: 0,
      isPaused: execisPaused
    });
  } catch(err) {
    console.log('err' + err.message);
    res.status(500).send({
      error: 1,
      error_message: err.message
    });
  }
  finally{
    var isPausedTime = new Date(Date.now()).toUTCString();
    console.log("main.js [isPaused] Executed at UTC Time :" + isPausedTime);
  }
});

function isWhiteListedPromise(address) {
  return new Promise((resolve, reject) => {
    TicketCrowdsaleContract.methods.whitelist(address).call().then(function (white) {
          console.log("End Date is" + " "  + white)
          return resolve(white);
        })
      })
}


app.post('/Crowdsale/api/isWhitelisted', async (req, res) => {
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
    console.log("main.js [isWhitelisted] Executed at UTC Time :" + isListed);
  }
});

function burnTickets(address,amount) {
  return new Promise((resolve, reject) => {
    const addr = contractAddress.admin;
    web3.eth.getTransactionCount(addr, function(error, txCount) {
    console.log(txCount);
    const encoded = BetaTickerContract.methods.burn(address,amount).encodeABI();//ticketAbi.burn(address,amount);
    var rawTransaction = {
      "nonce": web3.utils.toHex(txCount),
      "gasPrice": "0x04e3b29200",
      "gasLimit": "0xF458F",
      "from" : addr,
      "to": contractAddress.TokenContract,
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


app.post('/Crowdsale/api/burnTickets', async (req, res) => {
  try
  {
    console.log('Request in')
    const execSetRate = await burnTickets(req.body.address,req.body.amount);
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
    var burnTime = new Date(Date.now()).toUTCString();
    console.log("main.js [burnTickets] Executed at UTC Time :" + burnTime);
  }
});

function mintTickets(address,amount) {
  return new Promise((resolve, reject) => {
    const addr = contractAddress.admin;
    web3.eth.getTransactionCount(addr, function(error, txCount) {
    console.log(txCount);
    const encoded = BetaTickerContract.methods.mint(address,amount).encodeABI();//ticketAbi.mint(address,amount);
    var rawTransaction = {
      "nonce": web3.utils.toHex(txCount),
      "gasPrice": "0x04e3b29200",
      "gasLimit": "0xF458F",
      "from" : addr,
      "to": contractAddress.TokenContract,
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

app.post('/Crowdsale/api/mintTickets', async (req, res) => {
  try
  {
    console.log('Request in')
    const execSetRate = await mintTickets(req.body.address,req.body.amount);
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
    var mintTime = new Date(Date.now()).toUTCString();
    console.log("main.js [mintTickets] Executed at UTC Time :" + mintTime);
  }
});


function adjustMinPurchase(minPurchase) {
  return new Promise((resolve, reject) => {
    const addr = contractAddress.admin;
    web3.eth.getTransactionCount(addr, function(error, txCount) {
    console.log(txCount);
    const encoded = TicketCrowdsaleContract.methods.adjustMinPurchase(minPurchase).encodeABI();//ticketAbi.burn(address,amount);
    var rawTransaction = {
      "nonce": web3.utils.toHex(txCount),
      "gasPrice": "0x04e3b29200",
      "gasLimit": "0xF458F",
      "from" : addr,
      "to": contractAddress.TokenContract,
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


app.post('/Crowdsale/api/adjustMinPurchase', async (req, res) => {
  try
  {
    console.log('Request in')
    const execMinimP = await adjustMinPurchase(req.body.minPurchase);
    res.send({
      error: 0,
      txid: execMinimP
    });
  } catch(err) {
    console.log('err' + err.message);
    res.status(500).send({
      error: 1,
      error_message: err.message
    });
  }
  finally{
    var minimPTime = new Date(Date.now()).toUTCString();
    console.log("main.js [adjustMinPurchase] Executed at UTC Time :" + minimPTime);
  }
});

function minPurchase() {
  return new Promise((resolve, reject) => {
    TicketCrowdsaleContract.methods.minPurchase().call().then(function (minim) {
          console.log("End Date is" + " "  + minim)
          return resolve(minim);
        })
      })
}

app.get('/Crowdsale/api/minPurchase', async (req, res) => {
  try
  {
    console.log('Request in')
    const execMin = await minPurchase();
    res.send({
      error: 0,
      minimumPurchase: execMin
    });
  } catch(err) {
    console.log('err' + err.message);
    res.status(500).send({
      error: 1,
      error_message: err.message
    });
  }
  finally{
    var minP = new Date(Date.now()).toUTCString();
    console.log("main.js [minPurchase] Executed at UTC Time :" + minP);
  }
});

app.listen(7878, function(err){
  if (!err) {
    console.log("Server is Running on port 7878");
  }
});
