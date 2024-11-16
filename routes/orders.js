const express  = require('express');
const router  = express.Router();

const ordersController = require('../controllers/orders');
const {authenticator, allowCustomer, allowAdmin, allowSeller} = require('../lib/common');

// orders
router.post('/create', authenticator, allowCustomer, async (req, res, next) => {
  const response = await ordersController.createOrder(req.body);
  return res.status(response.status).send(response)
})

router.get('/order/:id', authenticator, allowCustomer, async (req, res, next) => {
  req.body.id = Number(req.params.id);
  const response = await ordersController.fetchOrder(req.body)
  return res.status(response.status).send(response)
})

router.get('/orderByUserID/:id', authenticator, allowCustomer, async (req, res, next) => {
  req.body.user_id = Number(req.params.id);
  const response = await ordersController.fetchOrderByUserId(req.body)
  return res.status(response.status).send(response)
})

router.put('/order/:id', authenticator, allowCustomer, async (req, res, next) => {
  req.body.id = Number(req.params.id);
  const response = await ordersController.updateOrder(req.body)
  return res.status(response.status).send(response)
})

router.put('/status/:id', authenticator, async (req, res, next) => {
  req.body.id = Number(req.params.id);
  const response = await ordersController.updateStatus(req.body)
  return res.status(response.status).send(response)
})

router.put('/quantity/:id', authenticator, allowCustomer, async (req, res, next) => {
  req.body.id = Number(req.params.id);
  const response = await ordersController.updateOrderQuantity(req.body)
  return res.status(response.status).send(response)
})

router.put('/closeOrder/:id', authenticator, allowCustomer, async (req, res, next) => {
  req.body.id = Number(req.params.id);
  const response = await ordersController.closeOrder(req.body)
  return res.status(response.status).send(response)
})

router.get('/orders', authenticator, allowAdmin,  async (req, res, next) => {
  const response = await ordersController.fetchAllOrders();
  return res.status(response.status).send(response)
})
router.get('/activeOrders', authenticator, allowAdmin,  async (req, res, next) => {
  const response = await ordersController.fetchShippedOrders();
  return res.status(response.status).send(response)
})

router.get('/completedOrders', authenticator, allowAdmin,  async (req, res, next) => {
  const response = await ordersController.fetchCompletedOrders();
  return res.status(response.status).send(response)
})


// carts
router.post('/addToCart', authenticator, allowCustomer, async (req, res, next) => {
  const response = await ordersController.addToCart(req.body)
  return res.status(response.status).send(response)
})

router.get('/activeCart/:id', authenticator, allowCustomer, async (req, res, next) => {
  // user id
  req.body.id = Number(req.params.id);
  const response = await ordersController.fetchActiveCartByUser(req.body)
  return res.status(response.status).send(response)
})

router.get('/cart/:id', authenticator, allowCustomer, async (req, res, next) => {
  // order id
  req.body.id = Number(req.params.id);
  const response = await ordersController.fetchUserCart(req.body)
  return res.status(response.status).send(response)
})

router.delete('/removeFromCart', authenticator, allowCustomer, async (req, res, next) => {
  const response = await ordersController.removeFromCart(req.body);
  return res.status(response.status).send(response)
})

router.delete('/deleteCart/:id', authenticator, allowCustomer, async (req, res, next) => {
  req.body.id = Number(req.params.id);
  const response = await ordersController.delFromCart(req.body);
  return res.status(response.status).send(response)
})

// shipments
router.post('/ship', authenticator, async (req, res, next) => {
  const response = await ordersController.createShipment(req.body)
  return res.status(response.status).send(response)
})

router.get('/ship/:id', authenticator, async (req, res, next) => {
  req.body.id = Number(req.params.id);
  const response = await ordersController.fetchUserShipment(req.body)
  return res.status(response.status).send(response)
})

router.get('/shipment/:id', authenticator, allowCustomer, async (req, res, next) => {
  req.body.user_id = Number(req.params.id);
  const response = await ordersController.fetchAllFromShipmentByUserID(req.body)
  return res.status(response.status).send(response)
})

router.get('/shipments', authenticator, allowAdmin,  async (req, res, next) => {
  const response = await ordersController.fetchAllShipments()
  return res.status(response.status).send(response)
})

router.get('/shipmentSeller/:id', authenticator, allowSeller,  async (req, res, next) => {
  req.body.id = Number(req.params.id);
  const response = await ordersController.fetchActiveShipmentsBySeller(req.body);
  return res.status(response.status).send(response)
})

router.put('/ship/:id', authenticator, async (req, res, next) => {
  req.body.id = Number(req.params.id);
  const response = await ordersController.updateUserShipment(req.body)
  return res.status(response.status).send(response)
});

// warehouse
router.post('/warehouse', authenticator, async (req, res, next) => {
  const response = await ordersController.createWarehouse(req.body)
  return res.status(response.status).send(response)
})

router.get('/warehouses', authenticator, async (req, res, next) => {
  const response = await ordersController.fetchAllWarehouses()
  return res.status(response.status).send(response)
})

router.get('/warehouse/:warehouse_id', authenticator, async (req, res, next) => {
  req.body.warehouse_id = Number(req.params.warehouse_id);
  const response = await ordersController.fetchWarehouseByID(req.body)
  return res.status(response.status).send(response)
})

router.put('/warehouse/:warehouse_id', authenticator, async (req, res, next) => {
  req.body.warehouse_id = Number(req.params.warehouse_id);
  const response = await ordersController.updateWarehouse(req.body)
  return res.status(response.status).send(response)
})

router.get('/warehousebySellerID/:seller_id', authenticator, allowSeller, async (req, res, next) => {
  req.body.seller_id = Number(req.params.seller_id);
  const response = await ordersController.fetchAllWarehousesBySellerID(req.body)
  return res.status(response.status).send(response)
})

//tradedItems
router.post('/tradedItems', authenticator, allowCustomer, async (req, res, next) => {
  const response = await ordersController.createTradedItem(req.body)
  return res.status(response.status).send(response)
})

router.put('/tradedItems/:id', authenticator, async (req, res, next) => {
  req.body.id = Number(req.params.id);
  const response = await ordersController.updateTradedItem(req.body)
  return res.status(response.status).send(response)
});

router.get('/tradedItem/:seller_id', authenticator, allowSeller,  async (req, res, next) => {
  req.body.seller_id = Number(req.params.seller_id);
  const response = await ordersController.fetchTradedItemsBySeller(req.body);
  return res.status(response.status).send(response)
})

router.get('/shipment/dest/:order_id', authenticator, allowSeller,  async (req, res, next) => {
  req.body.order_id = Number(req.params.order_id);
  const response = await ordersController.fetchShipmentDestination(req.body.order_id);
  return res.status(response.status).send(response)
})

module.exports = router;
