const express = require('express');
const router = express.Router();
const productController = require('../controllers/API_productController');
const userController = require('../controllers/API_userController');
const categoryController = require('../controllers/API_categoryController')

/*  -------------------------------------------- PRODUCT ROUTES ------------------------------------------------ */

router.get('/products/page/:offset', productController.paginatedProducts)
router.get('/products/:id', productController.productByPk)
router.get('/productlast' , productController.lastProductDB)
router.post('/products', productController.createProduct)
router.patch('/products/:id', productController.updateProduct)
router.delete('/products/:id', productController.deleteProduct)

/*  -------------------------------------------- USER ROUTES ------------------------------------------------ */

router.get('/users/page/:offset', userController.paginatedUsers)
router.get('/users/:id', userController.userByPk)
router.post('/users', userController.createUser)
router.patch('/users/:id', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)

/*  -------------------------------------------- CATEGORY ROUTES ------------------------------------------------ */
router.get('/categories/:id' ,categoryController.categoryByPk)
router.get('/categories/page/:offset', categoryController.paginatedCategories)

module.exports = router;