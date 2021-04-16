const express = require('express');
const router = express.Router();
const controller = require('../controllers/apiController');
//products api rutas
router.get('/products', controller.products)
router.get('/products/:id', controller.productdetail)
router.post('/products', controller.createproduct)
router.patch('/products/:id', controller.update)
router.delete('/products/:id', controller.delete)

//users api rutas
// router.get('/user', controller.users)
// router.post('/user', controller.createuser)

module.exports = router;
