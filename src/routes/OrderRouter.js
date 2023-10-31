const express = require("express");
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const { authUserMiddleWare } = require("../middleware/authMiddleware");
// router.post('/create', authUserMiddleWare, OrderController.createOrder)
  router.post('/create', function(req, res) {
    try {
      // Auth middleware
      authUserMiddleWare(req, res, next)  
  
      // Controller logic
      OrderController.createOrder(req, res)
    } catch (err) {
      // Handle error
      //...
    }
  })
module.exports = router