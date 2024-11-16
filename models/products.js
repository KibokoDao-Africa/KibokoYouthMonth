// const userDb = require('../db/users');
// const orderDb = require('../db/orders');
// const productDb = require('../db/products');

const db = require('../models/db');
const moment = require('moment');


exports.createProduct = async (data) => {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = db.write('products').insert({
    name: data.name || null,
    sku: data.sku || null,
    description: data.description || null,
    seller_id: data.seller_id || null,
    warehouse_id: data.warehouse_id || null,
    quantity: data.quantity || null,
    price: data.price || null,
    one_time_limit: data.one_time_limit || null,
    currency: data.currency || null,
    picture: data.picture || null,
    created_at: createdAt,
    updated_at: createdAt
  });
  console.info("query -->", query.toQuery())
  return query;
};

exports.updateProduct = async (data) => {
  data.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
  const toBeUpdated = {};
  const canBeUpdated = ['name','description', 'seller_id', 'warehouse_id',
  'updated_at', 'quantity', 'price', 'currency', 'one_time_limit', 'picture'];
  for (let i in data) {
    if (canBeUpdated.indexOf(i) > -1) {
      toBeUpdated[i] = data[i];
    }
  }
  const query = db.write('products')
    .where('id', data.id)
    .update(toBeUpdated);

  console.info("query -->", query.toQuery())
  return query;
};

exports.removeProduct = async (id) => {
  const query = db.write('products')
    .where('id', id)
    .update({
      available: 0,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    });
  console.info("query -->", query.toQuery())
  return query;
};

exports.reAddProduct = async (id) => {
  const query = db.write('products')
    .where('id', id)
    .update({
      available: 1,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    });
  console.info("query -->", query.toQuery())
  return query;
};

exports.getDetailsById = async (id) => {
  const query = db.read.select('*')
  .from('products')
  .where('id', '=', id);
  return query;
};


exports.getNameById = async (id) => {
  const query = db.read.select('products.name','products.picture')
  .from('products')
  .where('id', '=', id);
  return query;
};

exports.getAllProducts = async () => {
  const query = db.read.select('*')
  .from('products');

  //console.info("query -->", query.toQuery())
  return query;
};

exports.getAllProductsBySellerID = async (seller_id) => {
  const query = db.read.select('*')
  .from('products')
  .where('seller_id', '=', seller_id);
  //console.info("query -->", query.toQuery())
  return query;
};

exports.getAllProductsByWarehouseID = async (warehouse_id) => {
  const query = db.read.select('*')
  .from('products')
  .where('warehouse_id', '=', warehouse_id);
  //console.info("query -->", query.toQuery())
  return query;
};

exports.getCategoryNameById = async (id) => {
  const query = db.read.select('product_category.category')
  .from('product_category')
  .join('product_categorized','product_categorized.category_id','=','product_category.id')
  .where('product_categorized.product_id', '=', id);
  return query;
};

exports.getProdCategories = async () => {
  const query = db.read.select('*')
  .from('product_category');
  return query;
};

exports.createProductCategory = async (data) => {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = db.write('product_category').insert({
    category: data.category,
    created_at: createdAt,
    updated_at: createdAt
  });
  console.info("query -->", query.toQuery())
  return query;
};

exports.getCategoryById = async (id) => {
  const query = db.read.select('product_categorized.category_id')
  .from('product_categorized')
  //.join('product_category','product_category.id','=','product_categorized.category_id')
  .where('product_categorized.product_id', '=', id);
  return query;
};

exports.productCategorize = async (data) => {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = db.write('product_categorized').insert({
    product_id: data.product_id,
    category_id: data.category_id || 1,
    created_at: createdAt,
    updated_at: createdAt
  });
  console.info("query -->", query.toQuery())
  return query;
};


exports.getProductCategory = async (id) => {
  const query = db.read.select('category_id')
  .from('product_categorized')
  .where('product_id', '=', id);
  return query;
};
