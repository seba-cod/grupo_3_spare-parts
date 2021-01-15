const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get(['/productdetail', '/detalleproducto'], productController.detail);
router.get(['/cart', '/checkout', '/carrito'], productController.checkout);

module.exports = router;