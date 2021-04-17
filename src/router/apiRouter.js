const express = require('express');
const router = express.Router();
const productController = require('../controllers/API_productController');
const userController = require('../controllers/API_userController');

/*  -------------------------------------------- PRODUCT ROUTES ------------------------------------------------ */

router.get('/products', productController.products)
router.get('/products/:id', productController.productdetail)
router.post('/products', productController.createproduct)
router.patch('/products/:id', productController.update)
router.delete('/products/:id', productController.delete)

/*  -------------------------------------------- USER ROUTES ------------------------------------------------ */
//users api rutas
router.get('/user', userController.allUsers)
router.get('/user/:id', userController.userByUsername)
router.post('/user', userController.createUser)


module.exports = router;
