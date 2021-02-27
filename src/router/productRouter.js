const express = require('express');
const router = express.Router();
const path = require('path');
// Requiero multer: storage 
const multer = require('multer');
const storage = multer.diskStorage ({
    destination: (req,file, cb) => {
        cb(null, './public/images/products')
    },
    filename: (req, file,cb) => {
        let fileName = 'user-' + `${Date.now()}img${path.extname(file.originalname)}`;
        cb(null, fileName)
    }
});
const upload = multer ({ storage });
// Express Validator
const { check } = require('express-validator')
const validationsRegister = require('../validations/validations')

// Controlador
const productController = require('../controllers/productController');

//Rutas para todos los usuarios
router.get(['/all', '/todos'], productController.products);
router.get(['/detail/:id', '/detalle/:id'], productController.productdetail); // ver que pasa con los links del header por esta sentencia

//Rutas vendedor
router.get('/publicar', productController.publish);
router.post('/publicar', upload.any('product_img'), validationsRegister.createProduct, productController.createproduct);
router.get('/editar/:id', productController.edit);
router.put('/editar/:id', /*upload.any() ,*/ productController.update);

//Rutas user logueado
router.get(['/cart', '/checkout', '/carrito'], productController.checkout);

module.exports = router;