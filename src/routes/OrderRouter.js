const express = require('express');
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const { authUerMiddleware, authMiddleware } = require('../middleware/authMiddleware');
router.post('/create', authUerMiddleware, OrderController.createOrder)
router.get('/get-all-order/:id',authUerMiddleware, OrderController.getAllOrderDetails)
router.get('/get-details-order/:id',authUerMiddleware, OrderController.getDetailsOrder)
router.delete('/cancel-order/:id',authUerMiddleware, OrderController.cancelOrder)
router.get('/get-all-order',authMiddleware, OrderController.getAllOrder)
module.exports = router