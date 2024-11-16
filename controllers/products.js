const prodModel = require('../models/products');
const {successResponse, errorResponse} = require('../lib/response');
const { validateProductRegister, validateProductCategory } = require('../validators/products');
const { validateId, validateSellerId } = require('../validators/common');

const logStruct = (func, error) => {
  return {'func': func, 'file': 'prodController', error}
}


const createProduct = async (reqData) => {
  try {
    const validInput = validateProductRegister(reqData);
    const response = await prodModel.createProduct(validInput);
    await prodModel.productCategorize({product_id: response[0], category_id: reqData.category_id});
    return successResponse(201, response, { category : ['beans'], product : validInput.name}, 'created')
  } catch (error) {
    console.error('error -> ', logStruct('createProduct', error))
    return errorResponse(error.status, error.message);
  }
};

const updateProduct = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await prodModel.updateProduct(validInput);
    return successResponse(204)
  } catch (error) {
    console.error('error -> ', logStruct('updateProduct', error))
    return errorResponse(error.status, error.message);
  }
};



const reAddProduct = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    await prodModel.reAddProduct(validInput.id);
    return successResponse(204, null, null, 'readded')
  } catch (error) {
    console.error('error -> ', logStruct('reAddProduct', error))
    return errorResponse(error.status, error.message);
  }
};


const removeProduct = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await prodModel.removeProduct(validInput.id);
    return successResponse(204, null, null, 'removed')
  } catch (error) {
    console.error('error -> ', logStruct('removeProduct', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchProd = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await prodModel.getDetailsById(validInput.id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchProd', error))
    return errorResponse(error.status, error.message);
  }
};


const createProductCategory = async (reqData) => {
  try {
    const validInput = validateProductCategory(reqData);
    const response = await prodModel.createProductCategory(validInput);
    return successResponse(201, response, 'created')
  } catch (error) {
    console.error('error -> ', logStruct('createProductCategory', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchProdByWarehouse = async (reqData) => {
  try {
    const validInput = validateWarehouseId(reqData);
    const response = await prodModel.getAllProductsByWarehouseID(validInput.warehouse_id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchProdByWarehouse', error))
    return errorResponse(error.status, error.message);
  }
};



const fetchProdBySellerID = async (reqData) => {
  try {
    const validInput = validateSellerId(reqData);
    const response = await prodModel.getAllProductsBySellerID(validInput.seller_id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchProdBySellerID', error))
    return errorResponse(error.status, error.message);
  }
};



const fetchAllProducts = async () => {
  try {
    //var productDetails = {};
    const response = await prodModel.getAllProducts();
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchAllProducts', error))
    return errorResponse(error.status, error.message);
  }
};



const fetchProdName = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await prodModel.getNameById(validInput.id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchProdName', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchProdCategory = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await prodModel.getCategoryNameById(validInput.id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchProdCategory', error))
    return errorResponse(error.status, error.message);
  }
};


const fetchProdCategories = async () => {
  try {
    const response = await prodModel.getProdCategories();
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchProdCategories', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchProductCategory = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await prodModel.getCategoryById(validInput.id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchProductCategory', error))
    return errorResponse(error.status, error.message);
  }
};

const updateQuantity = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const input = await prodModel.getDetailsById(validInput.id);
    validInput.quantity = input[0].quantity - reqData.quantity;
    const response = await prodModel.updateProduct(validInput);
    return successResponse(204)
  } catch (error) {
    console.error('error -> ', logStruct('updateQuantity', error))
    return errorResponse(error.status, error.message);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  reAddProduct,
  removeProduct,
  fetchProd,
  createProductCategory,
  fetchProdByWarehouse,
  fetchProdBySellerID,
  fetchAllProducts,
  fetchProdCategory,
  fetchProdName,
  fetchProdCategories,
  fetchProductCategory,
  updateQuantity
}
