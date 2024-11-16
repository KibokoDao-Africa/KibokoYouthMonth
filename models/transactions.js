const db = require('../models/db');
const moment = require('moment');


exports.getTransactionById = async (id) => {
  const query = db.read.select('*')
  .from('transactions')
  .where('id', '=', id);
  return query;
};


exports.getTransactionByUserId = async (user_id) => {
  const query = db.read.select('*')
  .from('transactions')
  .where('user_id', '=', user_id);
  return query;
};


exports.getTransactionBySellerId = async (seller_id, order_id, product_id) => {
  const query = db.read.select('transactions.*')
  .from('transactions')
  .join('traded_items','traded_items.order_id','=','transactions.destination')
  .join('orders', 'orders.id', '=', 'traded_items.order_id')
  //.join('products', 'products.id', '=', 'traded_items.product_id')
  .where('traded_items.seller_id', '=', seller_id)
  .where('transactions.destination', '=', order_id)
  .where('traded_items.product_id', '=', product_id);

  return query;
};


exports.getAllTransactions = async () => {
  const query = db.read.select('*')
  .from('transactions');

  return query;
};

exports.getTransactionsByMode = async (mode) => {
  const query = db.read.select('*')
  .from('transactions')
  .where('mode', '=', mode);
  return query;
};

exports.createTransaction = async (data) => {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = db.write('transactions').insert({
    reference_no: data.reference_no,
    date: createdAt,
    user_id: data.user_id,
    amount: data.amount,
    mode: data.mode,
    destination: data.destination || null,
    explanation: data.explanation,
    status: data.status,
    created_at : createdAt,
    updated_at : createdAt
  });
  console.info("query -->", query.toQuery())
  return query;
};

exports.updateTransaction = async (data) => {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = db.write('transactions').update({
    status : data.status,
    updated_at : createdAt
  })
  .where('id', '=', data.id);

  console.info("query -->", query.toQuery())
  return query;
};

exports.updateTransactionRef = async (data) => {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = db.write('transactions').update({
    status : data.status,
    updated_at : createdAt
  })
  .where('reference_no', '=', data.reference_no);

  console.info("query -->", query.toQuery())
  return query;
};
