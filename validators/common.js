'use strict';


const {successResponse, errorResponse} = require('../lib/response');

exports.validateId = body => {
  const arr = ['id'];

  if (isNaN(body.id)) {
    throw errorResponse(401);
  }

  arr.map((item) => {
    const check = body.hasOwnProperty(item);
    if (!check) throw errorResponse(400, item+'Missing');
  });

  return body;
};

exports.validateUserId = body => {
  const arr = ['user_id'];

  if (isNaN(body.user_id)) {
    throw errorResponse(401);
  }

  arr.map((item) => {
    const check = body.hasOwnProperty(item);
    if (!check) throw errorResponse(400, item+'Missing');
  });

  return body;
};

exports.validateSellerId = body => {
  const arr = ['seller_id'];

  if (isNaN(body.seller_id)) {
    throw errorResponse(401);
  }

  arr.map((item) => {
    const check = body.hasOwnProperty(item);
    if (!check) throw errorResponse(400, item+'Missing');
  });

  return body;
};

exports.validateWarehouseId = body => {
  const arr = ['warehouse_id'];

  if (isNaN(body.warehouse_id)) {
    throw errorResponse(401);
  }

  arr.map((item) => {
    const check = body.hasOwnProperty(item);
    if (!check) throw errorResponse(400, item+'Missing');
  });

  return body;
};
