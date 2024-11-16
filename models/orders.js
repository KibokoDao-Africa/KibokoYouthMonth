// const userDb = require('../db/users');
// const orderDb = require('../db/orders');
// const productDb = require('../db/products');

const db = require('../models/db');
const moment = require('moment');

exports.createOrder = async (data) => {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = db.write('orders').insert({
    user_id: data.user_id,
    quantity: data.quantity || 0,
    sub_total: data.sub_total || 0,
    new: 1,
    status: "pending",
    created_at: createdAt,
    updated_at: createdAt
  });
  console.info("query -->", query.toQuery())
  return query;
};


exports.fetchOrderById = async (id) => {
  const query = db.read.select('*')
  .from('orders')
  .where('id', '=', id);
  return query;
};



exports.getOrderByUserId = async (user_id) => {
  const query = db.read.select('*')
  .from('orders')
  .where('user_id', '=', user_id);
  return query;
};

exports.fetchNewOrder = async (user_id) => {
  const query = db.read.select('id', 'quantity', 'sub_total')
  .from('orders')
  .where('user_id', '=', user_id)
  .where('new', '=', 1);
  console.info("query -->", query.toQuery())
  return query;
};

exports.getActiveOrders = async (user_id) => {
  const query = db.read.select('*')
  .from('orders')
  .where('user_id', '=', user_id)
  .where('new', '=', 1);
  //console.info("query -->", query.toQuery())
  return query;
};

exports.updateOrder = async (data) => {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = db.write('orders').update({
    quantity: data.quantity || 0,
    sub_total: data.sub_total || 0,
    updated_at: createdAt
  })
  .where('id', '=', data.id)
  .where('new', '=', 1);
  console.info("query -->", query.toQuery())
  return query;
};

exports.closeOrder = async (data) => {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = db.write('orders').update({
    new: data.new || 0,
    updated_at: createdAt
  })
  .where('id', '=', data.id);
  console.info("query -->", query.toQuery())
  return query;
};

exports.updateStatus = async (data) => {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = db.write('orders').update({
    status: data.status,
    updated_at: createdAt
  })
  .where('id', '=', data.id)
  .where('new', '=', 0);
  console.info("query -->", query.toQuery())
  return query;
};

exports.getAllOrders = async () => {
  const query = db.read.select('*')
  .from('orders');

  //console.info("query -->", query.toQuery())
  return query;
};

exports.getCompletedOrders = async () => {
  const query = db.read.select('*')
  .from('orders')
  .where('status', '=', "delivered")
  .where('new', '=', 0);
  //console.info("query -->", query.toQuery())
  return query;
};

exports.getShippedOrders = async () => {
  const query = db.read.select('*')
  .from('orders')
  .where('new', '=', 0)
  .where('status', '=', 'shipped')
  .orWhere('status', '=', 'active');

  //console.info("query -->", query.toQuery())
  return query;
};


exports.fetchCartById = async (id) => {
  const query = db.read.select('*')
  .from('carts')
  .where('id', '=', id);
  return query;
};

exports.fetchExistingProductFromCart = async (data) => {
  const query = db.read.select('id', 'quantity', 'sub_total')
  .from('carts')
  .where('product_id', '=', data.product_id)
  .where('order_id', '=', data.order_id)
  .limit(1);
  console.info("query -->", query.toQuery())
  return query;
};




exports.addToCart = async (data) => {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

  const query = db.write('carts')
  .insert({
    product_id: data.product_id,
    user_id: data.user_id,
    quantity: data.quantity,
    sub_total: data.sub_total,
    stage: data.stage,
    order_id: data.order_id,
    created_at: createdAt,
    updated_at: createdAt
  });
  console.info("query -->", query.toQuery())
  return query;
};

exports.updateCart = async (data) => {
  data.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

  const toBeUpdated = {};
  const canBeUpdated = ['quantity', 'sub_total', 'stage', 'updated_at'];
  for (let i in data) {
    if (canBeUpdated.indexOf(i) > -1) {
      toBeUpdated[i] = data[i];
    }
  }

  console.log("update to cart model", data, toBeUpdated)

  const query = db.write('carts')
    .where('id', data.id)
    .update(toBeUpdated);

  console.info("query -->", query.toQuery())
  return query;
};

exports.getAllFromUsersCart = async (order_id) => {
  const query = db.read.select('*')
  .from('carts')
  .where('order_id', '=', order_id);
  return query;
};

exports.getAllFromUsersCurrentCart = async (user_id) => {
  const query = db.read.select('carts.*')
  .from('carts')
  .join('orders','orders.id','=','carts.order_id')
  .where('carts.user_id', '=', user_id)
  .where('carts.stage', '=', 'cart')
  .where('orders.new', '=', 1);
  return query;
};

exports.getItemFromUsersCurrentCart = async (user_id, product_id) => {
  const query = db.read.select('carts.*')
  .from('carts')
  .join('orders','orders.id','=','carts.order_id')
  .where('carts.user_id', '=', user_id)
  .where('carts.product_id', '=', product_id)
  .where('carts.stage', '=', 'cart')
  .where('orders.new', '=', 1);
  return query;
};

exports.deleteFromCart = async (id) => {
  console.log("del to cart model", id)
  const query = db.write('carts')
  .from('carts')
  .where('id', '=', id)
  .del()
  return query;
};


exports.createShipment = async (data) => {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = db.write('shipment').insert({
    user_id: data.user_id,
    order_id: data.order_id,
    carier_company: data.carier_company,
    carier_id: data.carier_id,
    status: data.status,
    tracking_id: data.tracking_id || 0,
    created_at: createdAt,
    updated_at: createdAt
  });
  console.info("query -->", query.toQuery())
  return query;
};

exports.updateShipment = async (data) => {
  data.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

  const toBeUpdated = {};
  const canBeUpdated = ['carier_company', 'tracking_id','status', 'updated_at'];
  for (let i in data) {
    if (canBeUpdated.indexOf(i) > -1) {
      toBeUpdated[i] = data[i];
    }
  }
  const query = db.write('shipment')
    .where('id', data.id)
    .update(toBeUpdated);

  console.info("query -->", query.toQuery())
  return query;
};

exports.getAllShipments = async () => {
  const query = db.read.select('*')
  .from('shipment');
  //console.info("query -->", query.toQuery())
  return query;
};

exports.getAllFromShipmentById = async (id) => {
  const query = db.read.select('*')
  .from('shipment')
  .where('id', '=', id);
  return query;
};

exports.getItemFromSellerSoldCart = async (seller_id) => {
  const query = db.read.select('shipment.*')
  .from('shipment')
  .join('orders','orders.id','=','shipment.order_id')
  .join('traded_items','traded_items.order_id','=','shipment.order_id')
  .where('traded_items.seller_id', '=', seller_id)
  //.where('carts.stage', '=', 'ordered')
  .where('orders.new', '=', 0)
  .where('shipment.status', '=', 'pending');
  return query;
};

 exports.getItemSoldLocation = async (order_id) => {
  const query = db.read.select('seller.city', 'seller.state', 'seller.country')
  .from('seller')
  .join('traded_items','traded_items.seller_id','=','seller.id')
  //.join('shipment','shipment.order_id','=', order_id)
  //.join('seller','orders.id','=','shipment.order_id')
  .where('traded_items.order_id', '=', order_id)
  //.where('carts.stage', '=', 'ordered')
  //.where('orders.new', '=', 0)
  .where('traded_items.status', '=', 'paid');
  return query;
}; 



exports.getAllFromShipmentByUserID = async (user_id) => {
  const query = db.read.select('*')
  .from('shipment')
  .where('user_id', '=', user_id);
  return query;
};

exports.createWarehouse = async (data) => {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = db.write('warehouse').insert({
    seller_id: data.seller_id || null,
    name: data.name || null,
    about_us: data.about_us || null,
    email: data.email || null,
    phone: data.phone || null,
    street: data.street || null,
    city: data.city || null,
    zipcode: data.zipcode || null,
    state: data.state || null,
    country: data.country || null,
    pictures: data.pictures || null,
    latitude: data.latitude || null,
    longitude : data.longitude || null,
    created_at: createdAt,
    updated_at: createdAt
  });
  console.info("query -->", query.toQuery())
  return query;
};

exports.updateWarehouse = async (data) => {
  data.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

  const toBeUpdated = {};
  const canBeUpdated = ['name', 'email', 'city', 'street', 'state', 'about_us', 'pictures', 'phone', 'zipcode', 'latitude', 'longitude', 'updated_at'];
  for (let i in data) {
    if (canBeUpdated.indexOf(i) > -1) {
      toBeUpdated[i] = data[i];
    }
  }
  const query = db.write('warehouse')
    .where('id', data.warehouse_id)
    .update(toBeUpdated);

  console.info("query -->", query.toQuery())
  return query;
};

exports.getWarehouseById = async (warehouse_id) => {
  const query = db.read.select('*')
  .from('warehouse')
  .where('id', '=', warehouse_id);
  return query;
};

exports.getAllWarehouses = async () => {
  const query = db.read.select('*')
  .from('warehouse');

  //console.info("query -->", query.toQuery())
  return query;
};



exports.getAllWarehousesBySellerID = async (seller_id) => {
  const query = db.read.select('*')
  .from('warehouse')
  .where('seller_id', '=', seller_id);
  //console.info("query -->", query.toQuery())
  return query;
};


exports.createSoldItem = async (data) => {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = db.write('traded_items').insert({
    order_id: data.order_id,
    seller_id: data.seller_id,
    product_id: data.product_id,
    payment_mode: data.payment_mode,
    status: data.status,
    created_at: createdAt,
    updated_at: createdAt
  });
  console.info("query -->", query.toQuery())
  return query;
};

exports.updateSoldItem = async (data) => {
  data.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

  const toBeUpdated = {};
  const canBeUpdated = ['payment_mode','status', 'updated_at'];
  for (let i in data) {
    if (canBeUpdated.indexOf(i) > -1) {
      toBeUpdated[i] = data[i];
    }
  }
  const query = db.write('traded_items')
    .where('id', data.id)
    .update(toBeUpdated);

  console.info("query -->", query.toQuery())
  return query;
};

exports.getSoldItemsBySeller = async (seller_id) => {
  const query = db.read.select('*')
  .from('traded_items')
  .where('seller_id', '=', seller_id);
  return query;
};

exports.getSoldItemsByUser = async (user_id) => {
  const query = db.read.select('traded_items.*')
  .from('traded_items')
  .join('orders','orders.id','=','traded_items.order_id')
  .where('orders.user_id', '=', user_id);
  return query;
};
