const express = require('express');
const router = express.Router()
const { authMiddleware,authUerMiddleware } = require('../middleware/authMiddleware');
const ProductController = require('../controllers/ProductContoller');
router.post('/create', ProductController.createProduct)
router.put('/update/:id', authMiddleware, ProductController.updateProduct)
router.delete('/delete-product/:id', ProductController.deleteProduct)
router.get('/all-product', ProductController.getAllProduct)
router.get('/get-details/:id', ProductController.getDetailProduct)
module.exports = router