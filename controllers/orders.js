const orderModel = require('../models/orders');
const {successResponse, errorResponse} = require('../lib/response');
const { validateOrderRegister, validateShipRegister, validateWarehouse, validateSoldItemRegister } = require('../validators/orders');
const { validateId, validateUserId, validateSellerId, validateWarehouseId } = require('../validators/common');

const logStruct = (func, error) => {
  return {'func': func, 'file': 'orderController', error}
}

const createOrder = async (reqData) => {
  try {
    const validInput = validateOrderRegister(reqData);
    //await orderModel.createOrder(validInput);
    const response = await orderModel.createOrder(validInput);
    return successResponse(201, response, null, 'created')
  } catch (error) {
    console.error('error -> ', logStruct('createOrder', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchOrder = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await orderModel.fetchOrderById(validInput.id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchOrder', error))
    return errorResponse(error.status, error.message);
  }
};
/** const fetchProductNameByID = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await orderModel.fetchOrderById(validInput.id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchOrder', error))
    return errorResponse(error.status, error.message);
  }
}; **/




const updateOrder = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await orderModel.updateOrder(validInput);
    return successResponse(204, null, null, 'updated')
  } catch (error) {
    console.error('error -> ', logStruct('updateOrder', error))
    return errorResponse(error.status, error.message);
  }
};



const updateStatus = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await orderModel.updateStatus(validInput);
    return successResponse(204, null, null, 'updated')
  } catch (error) {
    console.error('error -> ', logStruct('updateStatus', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchOrderByUserId = async (reqData) => {
  try {
    const validInput = validateUserId(reqData);
    const response = await orderModel.getOrderByUserId(validInput.user_id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchOrderByUserId', error))
    return errorResponse(error.status, error.message);
  }
};

const updateOrderQuantity = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const currOrder = orderModel.fetchOrderById(validInput.id);
    validInput.quantity = currOrder[0].quantity - validInput.quantity;
    const response = await orderModel.updateOrder(validInput);
    return successResponse(204, null, null, 'updated')
  } catch (error) {
    console.error('error -> ', logStruct('updateOrderQuantity', error))
    return errorResponse(error.status, error.message);
  }
};

const closeOrder = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await orderModel.closeOrder(validInput);
    return successResponse(204, null, null, 'closed')
  } catch (error) {
    console.error('error -> ', logStruct('closeOrder', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchAllOrders = async () => {
  try {
    //var productDetails = {};
    const response = await orderModel.getAllOrders();
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchAllOrders', error))
    return errorResponse(error.status, error.message);
  }
};
const fetchShippedOrders = async () => {
  try {
    //var productDetails = {};
    const response = await orderModel.getShippedOrders();
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchShippedOrders', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchCompletedOrders = async () => {
  try {
    //var productDetails = {};
    const response = await orderModel.getCompletedOrders();
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchShippedOrders', error))
    return errorResponse(error.status, error.message);
  }
};

const addToCart = async (reqData) => {
  try {
    const validInput = validateOrderRegister(reqData);
    let newOrder = await orderModel.fetchNewOrder(validInput.user_id);

    if (!newOrder || !newOrder.length) {
      await orderModel.createOrder(validInput);
      newOrder = await orderModel.fetchNewOrder(validInput.user_id);
    }

    validInput.order_id = newOrder[0].id;
    let response;
    const existing = await orderModel.fetchExistingProductFromCart(validInput);
    if (existing && existing.length) {
      response = await orderModel.updateCart({
        id: existing[0].id,
        quantity: validInput.quantity + existing[0].quantity,
        sub_total: validInput.sub_total + existing[0].sub_total
      });
    } else {
      validInput.stage = 'cart';
      response = await orderModel.addToCart(validInput);
    }

    // update order async
    await orderModel.updateOrder({
      id: validInput.order_id,
      quantity: newOrder[0].quantity + validInput.quantity,
      sub_total: newOrder[0].sub_total + validInput.sub_total
    });

    return successResponse(200, null)
  } catch (error) {
    console.error('error -> ', logStruct('addToCart', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchActiveCartByUser = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await orderModel.getAllFromUsersCurrentCart(validInput.id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchActiveCartByUser', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchUserCart = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await orderModel.getAllFromUsersCart(validInput.id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchUserCart', error))
    return errorResponse(error.status, error.message);
  }
};

const removeFromCart = async (reqData) => {
  try {
    const validInput = validateOrderRegister(reqData);
    // console.log("remove from cart input", validInput)

    const product = await orderModel.getItemFromUsersCurrentCart(validInput.user_id, validInput.product_id);

    // console.log("remove from cart product", product)

    if (!product || !product.length) {
      return errorResponse(520, "noItemInCart");
    }

    const cartPayload = {
      id: product[0].id,
      quantity: product[0].quantity - validInput.quantity > 0 ? product[0].quantity - validInput.quantity : 0 ,
      sub_total: product[0].sub_total - validInput.sub_total > 0 ? product[0].sub_total - validInput.sub_total : 0
    }

    if (cartPayload.quantity > 0) {
      response = await orderModel.updateCart(cartPayload);
    } else {
      response = await orderModel.deleteFromCart(cartPayload.id);
    }

    //const order = await orderModel.fetchOrderById(product[0].order_id);

    // console.log("remove from cart order", order)

  /** const orderPayload = {
      id: order[0].id,
      quantity: order[0].quantity - validInput.quantity > 0 ? order[0].quantity - validInput.quantity : 0 ,
      sub_total: order[0].sub_total - validInput.sub_total > 0 ? order[0].sub_total - validInput.sub_total : 0
    }; **/

  //  await orderModel.updateOrder(orderPayload);
    /** var updateCartPayload = {
      id : product[0].id,
      stage : 'ordered'
    }
    await orderModel.updateCart(updateCartPayload
  ); **/


    return successResponse(204)
  } catch (error) {
    console.error('error -> ', logStruct('removeFromCart', error))
    return errorResponse(error.status, error.message);
  }
};

const delFromCart = async (data) => {
  try {
    var reqData = {};
    const currCart = await orderModel.fetchCartById(data.id)
    //const prodQuantity = await orderModel.getItemFromUsersCurrentCart(data.user, data.product);

    const currOrder = await orderModel.fetchOrderById(currCart[0].order_id);
    reqData.id = currCart[0].order_id;
    reqData.quantity = currOrder[0].quantity - currCart[0].quantity;
    reqData.sub_total = currOrder[0].sub_total -  currCart[0].sub_total;
    await orderModel.updateOrder(reqData);
    await orderModel.deleteFromCart(data.id);
    return successResponse(204, "deleted")
  } catch (error) {
    console.error('error -> ', logStruct('delFromCart', error))
    return errorResponse(error.status, error.message);
  }
};

const createShipment = async (reqData) => {
  try {
    const validInput = validateShipRegister(reqData);
    const response = await orderModel.createShipment(validInput);
    return successResponse(201, response, null, 'created')
  } catch (error) {
    console.error('error -> ', logStruct('createShipment', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchUserShipment = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await orderModel.getAllFromShipmentById(validInput.id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchUserShipment', error))
    return errorResponse(error.status, error.message);
  }
};

const updateUserShipment = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await orderModel.updateShipment(validInput);
    return successResponse(204, response, null, 'updated')
  } catch (error) {
    console.error('error -> ', logStruct('updateUserShipment', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchAllFromShipmentByUserID = async (reqData) => {
  try {
    const validInput = validateUserId(reqData);
    const response = await orderModel.getAllFromShipmentByUserID(validInput.user_id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchAllFromShipmentByUserID', error))
    return errorResponse(error.status, error.message);
  }
};



const fetchActiveShipmentsBySeller = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await orderModel.getItemFromSellerSoldCart(validInput.id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchActiveShipmentsBySeller', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchAllShipments = async () => {
  try {
    //var productDetails = {};
    const response = await orderModel.getAllShipments();
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchAllShipments', error))
    return errorResponse(error.status, error.message);
  }
};



const createWarehouse = async (reqData) => {
  try {
    const validInput = validateWarehouse(reqData);
    const response = await orderModel.createWarehouse(validInput);
    return successResponse(201, response, null, 'created')
  } catch (error) {
    console.error('error -> ', logStruct('createWarehouse', error))
    return errorResponse(error.status, error.message);
  }
};

const updateWarehouse = async (reqData) => {
  try {
    const validInput = validateWarehouse(reqData);
    const response = await orderModel.updateWarehouse(validInput);
    return successResponse(204, response, null, 'updated')
  } catch (error) {
    console.error('error -> ', logStruct('updateWarehouse', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchAllWarehousesBySellerID = async (reqData) => {
  try {
    const validInput = validateSellerId(reqData);
    const response = await orderModel.getAllWarehousesBySellerID(validInput.seller_id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchAllWarehousesBySellerID', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchAllWarehouses = async () => {
  try {
    //const validInput = validateId(reqData);
    const response = await orderModel.getAllWarehouses();
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchAllWarehouses', error))
    return errorResponse(error.status, error.message);
  }
};


const fetchWarehouseByID = async (reqData) => {
  try {
    const validInput = validateWarehouseId(reqData);
    const response = await orderModel.getWarehouseById(validInput.warehouse_id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchWarehouseByID', error))
    return errorResponse(error.status, error.message);
  }
};


const createTradedItem = async (reqData) => {
  try {
    const validInput = validateSoldItemRegister(reqData);
    const response = await orderModel.createSoldItem(validInput);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('createTradedItem', error))
    return errorResponse(error.status, error.message);
  }
};

const updateTradedItem = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await orderModel.updateSoldItem(validInput);
    return successResponse(204)
  } catch (error) {
    console.error('error -> ', logStruct('updateTradedItem', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchTradedItemsBySeller = async (reqData) => {
  try {
    const validInput = validateSellerId(reqData);
    const response = await orderModel.getSoldItemsBySeller(validInput.seller_id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchTradedItemsBySeller', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchTradedItemsByUser = async (reqData) => {
  try {
    const validInput = validateUserId(reqData);
    const response = await orderModel.getSoldItemsByUser(validInput.user_id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchTradedItemsByUser', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchShipmentDestination = async (reqData) => {
  try {
    //const validInput = validateUserId(reqData);
    const response = await orderModel.getItemSoldLocation(reqData);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchShipmentDestination', error))
    return errorResponse(error.status, error.message);
  }
};


// db scripts
// const dbScripts = require('../lib/db_script')

module.exports = {
  createOrder,
  fetchOrder,
  updateOrder,
  updateStatus,
  fetchOrderByUserId,
  updateOrderQuantity,
  closeOrder,
  fetchAllOrders,
  fetchShippedOrders,
  fetchCompletedOrders,
  addToCart,
  fetchActiveCartByUser,
  fetchUserCart,
  removeFromCart,
  delFromCart,
  createShipment,
  fetchUserShipment,
  updateUserShipment,
  fetchAllFromShipmentByUserID,
  fetchActiveShipmentsBySeller,
  fetchAllShipments,
  createWarehouse,
  updateWarehouse,
  fetchAllWarehousesBySellerID,
  fetchAllWarehouses,
  fetchWarehouseByID,
  createTradedItem,
  updateTradedItem,
  fetchTradedItemsBySeller,
  fetchTradedItemsByUser,
  fetchShipmentDestination
}
