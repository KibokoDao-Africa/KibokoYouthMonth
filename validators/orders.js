'use strict';


const {successResponse, errorResponse} = require('../lib/response');

exports.validateOrderRegister = body => {
  const bodyStruct = {};
  const arr = ['product_id', 'user_id', 'quantity', 'sub_total']
  const ign_arr = ['stage']

  arr.map((item) => {
    const check = body.hasOwnProperty(item);
    if (!check) throw errorResponse(400, item+'Missing');
    bodyStruct[item] = body[item];
  });

  ign_arr.map((item) => {
    bodyStruct[item] = body[item];
  });
  return bodyStruct;
};

exports.validateSoldItemRegister = body => {
  const bodyStruct = {};
  const arr = ['order_id', 'seller_id', 'product_id', 'payment_mode', 'status']

  arr.map((item) => {
    const check = body.hasOwnProperty(item);
    if (!check) throw errorResponse(400, item+'Missing');
    bodyStruct[item] = body[item];
  });

  return bodyStruct;
};

exports.validateShipRegister = body => {
  const bodyStruct = {};
  const arr = ['order_id', 'user_id', 'carier_company', 'carier_id'];
  const ign_arr = ['tracking_id', 'status']

  ign_arr.map((item) => {
    bodyStruct[item] = body[item];
  });

  arr.map((item) => {
    const check = body.hasOwnProperty(item);
    if (!check) throw errorResponse(400, item+'Missing');
    bodyStruct[item] = body[item];
  });

  return bodyStruct;
};

exports.validateWarehouse = body => {
  const bodyStruct = {};
  const arr = ['name', 'seller_id', 'pictures', 'about_us', 'verified', 'email', 'phone', 'street', 'zipcode', 'city', 'state',
  'country', 'latitude', 'longitude']

  arr.map((item) => {
    const check = body.hasOwnProperty(item);
    if (!check) throw errorResponse(400, item+'Missing');
    bodyStruct[item] = body[item];
  });

  return bodyStruct;
};
