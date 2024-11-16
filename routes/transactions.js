'use strict';

const express  = require('express');
const router  = express.Router();
const transactionsController = require('../controllers/transactions');
const {authenticator, auth, allowCustomer,  allowAdmin, allowSeller} = require('../lib/common');
const path = require('path');
//const authController = require('../controllers/auth');


router.post('/transaction', authenticator, allowCustomer, async (req, res) => {
  const response = await transactionsController.createTransaction(req.body)
  return res.status(response.status).send(response)
})

router.put('/update/:id', authenticator, allowAdmin, async (req, res) => {
  req.body.id = Number(req.params.id);
  const response = await transactionsController.updateTransactionByID(req.body);
  return res.status(response.status).send(response)
})


/** router.put('/updateRef/:ref', authenticator, allowAdmin, async (req, res) => {
  req.body.ref = req.params.ref;
  const response = await transactionsController.updateTransactionByRef(req.body);
  return res.status(response.status).send(response)
}) **/


router.put('/updateTxRef/:ref', authenticator, async (req, res) => {
  req.body.ref = req.params.ref;
  const response = await transactionsController.updateTransactionByRef(req.body);
  return res.status(response.status).send(response)
})

router.put('/updateTxID/:id', authenticator, async (req, res) => {
  req.body.id = Number(req.params.id);
  const response = await transactionsController.updateTransactionByID(req.body);
  return res.status(response.status).send(response)
})

router.get('/fetchEthPrice', authenticator, async (req, res) => {
  const response = await transactionsController.checkEthPriceUSD()
  return res.status(response.status).send(response)
})

router.get('/fetch/:id', authenticator, async (req, res) => {
  req.body.id = Number(req.params.id);
  const response = await transactionsController.fetchTransactionByID(req.body)
  return res.status(response.status).send(response)
})

router.get('/fetchTxBySeller/:seller_id/:order_id/:product_id', authenticator, allowSeller, async (req, res) => {
  req.body.seller_id = Number(req.params.seller_id);
  req.body.order_id = Number(req.params.order_id);
  req.body.product_id = Number(req.params.product_id);
  const response = await transactionsController.fetchTransactionBySeller(req.body)
  return res.status(response.status).send(response)
})

router.get('/fetchAll', authenticator, async (req, res) => {
  const response = await transactionsController.fetchAllTransactions()
  return res.status(response.status).send(response)
})

router.get('/fetchTxByUser/:user_id', authenticator, allowCustomer, async (req, res) => {
  req.body.user_id = Number(req.params.user_id);
  const response = await transactionsController.fetchTransactionByUser(req.body)
  return res.status(response.status).send(response)
})

module.exports = router;
