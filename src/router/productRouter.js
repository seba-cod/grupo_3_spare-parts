const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get(['/product', '/producto'], productController.detail);
router.get(['/cart', '/checkout', '/carrito'], productController.checkout);
router.get('/publicar', productController.publish);

module.exports = router;