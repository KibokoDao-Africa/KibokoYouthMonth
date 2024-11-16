'use strict';

const {successResponse, errorResponse} = require('../lib/response');


exports.validateTransaction = body => {
  const bodyStruct = {};
  const arr = ['reference_no', 'user_id', 'amount', 'mode', 'destination', 'explanation', 'status']


  arr.map((item) => {
    const check = body.hasOwnProperty(item);
    if (!check) throw errorResponse(400, item+'Missing');
    bodyStruct[item] = body[item];
  });
  return bodyStruct;
};
