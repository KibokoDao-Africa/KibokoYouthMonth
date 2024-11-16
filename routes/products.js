const express  = require('express');
const router  = express.Router();

const prodController = require('../controllers/products');
const {authenticator, allowCustomer, allowAdmin, allowSeller} = require('../lib/common');

const auth = require('../controllers/auth');

router.post('/category', authenticator, allowAdmin, async (req, res) => {
  const response = await prodController.createProductCategory(req.body)
  return res.status(response.status).send(response)
})

router.post('/add', authenticator , allowSeller, async (req, res) => {
  const response = await prodController.createProduct(req.body)
  return res.status(response.status).send(response)
})

router.get('/fetch/:id', async (req, res) => {
  req.body.id = Number(req.params.id);
  const response = await prodController.fetchProd(req.body)
  return res.status(response.status).send(response)
})

router.get('/fetchProd/:id', async (req, res) => {
  req.body.id = Number(req.params.id);
  const response = await prodController.fetchProdName(req.body)
  return res.status(response.status).send(response)
})

router.get('/fetchCategory/:id', async (req, res) => {
  req.body.id = Number(req.params.id);
  const response = await prodController.fetchProdCategory(req.body)
  return res.status(response.status).send(response)
})

router.get('/fetchCategories', authenticator, async (req, res) => {
  const response = await prodController.fetchProdCategories();
  return res.status(response.status).send(response)
})

router.get('/fetchProductByWarehouseID/:id', authenticator, async (req, res) => {
  req.body.warehouse_id = Number(req.params.id);
  const response = await prodController.fetchProdByWarehouse(req.body)
  return res.status(response.status).send(response)
})

router.get('/fetchAll', async (req, res) => {
  const response = await prodController.fetchAllProducts()
  return res.status(response.status).send(response)
})

router.put('/updateQuantity/:id', authenticator, allowCustomer, async (req, res) => {
  req.body.id = Number(req.params.id);
  const response = await prodController.updateQuantity(req.body);
  return res.status(response.status).send(response)
})

router.get('/category/:id', async (req, res) => {
  req.body.id = Number(req.params.id);
  const response = await prodController.fetchProductCategory(req.body)
  return res.status(response.status).send(response)
})

router.get('/name/:id', async (req, res) => {
  req.body.id = Number(req.params.id);
  const response = await prodController.fetchProdCategory(req.body)
  return res.status(response.status).send(response)
})

router.put('/update/:id', authenticator, allowSeller, async (req, res) => {
  req.body.id = Number(req.params.id);
  const response = await prodController.updateProduct(req.body);
  return res.status(response.status).send(response)
})

router.delete('/item/:id', authenticator, allowSeller, async (req, res) => {
  req.body.id = Number(req.params.id);
  const response = await prodController.removeProduct(req.body)
  return res.status(response.status).send(response)
})


router.get('/fetchProductBySellerID/:seller_id', authenticator, allowSeller, async (req, res) => {
  req.body.seller_id = Number(req.params.seller_id);
  const response = await prodController.fetchProdBySellerID(req.body)
  return res.status(response.status).send(response)
})

router.put('/readd/:id', authenticator, allowSeller, async (req, res) => {
  req.body.id = Number(req.params.id);
  const response = await prodController.reAddProduct(req.body);
  return res.status(response.status).send(response)
});

module.exports = router;
