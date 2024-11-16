const transactionsModel = require('../models/transactions');
const ordersModel = require('../models/orders');
const {successResponse, errorResponse} = require('../lib/response');
const { validateTransaction} = require('../validators/transactions');
const { validateId, validateUserId, validateSellerId } = require('../validators/common');

const logStruct = (func, error) => {
  return {'func': func, 'file': 'transactionsController', error}
}

const createTransaction = async (reqData) => {
  try {
    const validInput = validateTransaction(reqData);
    const response = await transactionsModel.createTransaction(validInput);
    return successResponse(201, response, null, 'created')
  } catch (error) {
    console.error('error -> ', logStruct('createTransaction', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchTransactionByUser = async (reqData) => {
  try {
    const validInput = validateUserId(reqData);
    const response = await transactionsModel.getTransactionByUserId(validInput.user_id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchTransactionByUser', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchTransactionBySeller = async (reqData) => {
  try {
    const validInput = validateSellerId(reqData);
    console.log(validInput);
    console.log(reqData);
    //const fetchSellerSold = await ordersModel.getSoldItemsBySeller(validInput.seller_id);
    const response = await transactionsModel.getTransactionBySellerId(validInput.seller_id, validInput.order_id, validInput.product_id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchTransactionBySeller', error))
    return errorResponse(error.status, error.message);
  }
};


const fetchTransactionByID = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await transactionsModel.getTransactionByUserId(validInput.id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchTransactionByID', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchAllTransactions = async () => {
  try {
    //const validInput = validateId(reqData);
    const response = await transactionsModel.getAllTransactions();
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchAllTransactions', error))
    return errorResponse(error.status, error.message);
  }
};

const updateTransactionByID = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await transactionsModel.updateTransaction(validInput);
    return successResponse(204, null, null, 'updated')
  } catch (error) {
    console.error('error -> ', logStruct('updateTransactionByID', error))
    return errorResponse(error.status, error.message);
  }
};

const updateTransactionByRef = async (reqData) => {
  try {
    const response = await transactionsModel.updateTransactionRef(validInput);
    return successResponse(204, null, null, 'updated')
  } catch (error) {
    console.error('error -> ', logStruct('updateTransactionByRef', error))
    return errorResponse(error.status, error.message);
  }
};

const checkEthPriceUSD = async () => {
const ethPrice = require('eth-price');
/**  var promise = new Promise(function (resolve, reject) {
var ethUSDprice = ethPrice('usd');
resolve(ethUSDprice);
})
promise.then(function(ethUSDprice) {
  res.json({
    status:true,
    data:ethUSDprice,
    message:'success'
  })
}) **/
try {
  const response = await ethPrice('usd');//transactionsModel.updateTransactionRef(validInput);
  //const response = {};
  //response.data = price;
  console.log(response);
  return successResponse(200,response)
} catch (error) {
  console.error('error -> ', logStruct('checkEthPriceUSD', error))
  return errorResponse(error.status, error.message);
}

}

module.exports = {
  createTransaction,
  fetchTransactionByUser,
  fetchTransactionByID,
  fetchAllTransactions,
  updateTransactionByID,
  updateTransactionByRef,
  checkEthPriceUSD,
  fetchTransactionBySeller
}
