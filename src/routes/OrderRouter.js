const express = require('express');
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const { authUerMiddleware } = require('../middleware/authMiddleware');
router.post('/create', authUerMiddleware, OrderController.createOrder)
module.exports = router