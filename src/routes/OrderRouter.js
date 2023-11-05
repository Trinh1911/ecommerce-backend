const express = require('express');
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const { authUerMiddleware } = require('../middleware/authMiddleware');
router.post('/create', authUerMiddleware, OrderController.createOrder)
router.get('/get-all-order/:id',authUerMiddleware, OrderController.getAllOrderDetails)
router.get('/get-details-order/:id',authUerMiddleware, OrderController.getDetailsOrder)
module.exports = router