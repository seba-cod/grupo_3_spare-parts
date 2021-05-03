const express = require('express');
const router = express.Router();
const path = require('path');



// Express Validator
const { check } = require('express-validator')
const validations = require('../middleware/validations')

// Controlador
const cartController = require('../controllers/cartController');


router.get(['/add/:id', '/agregar/:id'], cartController.addToCart);

router.get(['/show', '/ver'], cartController.showCart);

router.post(['/checkout', '/pagar'], cartController.checkout);
router.delete(['/delete/:id', '/borrar/:id'], cartController.removeFromCart);



module.exports = router;