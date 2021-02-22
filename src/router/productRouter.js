const express = require('express');
const router = express.Router();
const path = require('path');
//Para manejo de archivos traemos multer
const multer = require('multer')
const storage = multer.diskStorage ({
    destination: (req,file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/products'))
    },
    filename: (req, file,cb) => {
        let fileName = 'product-' + Date.now() + path.extname(file.originalname)
        cb(null, fileName)
    } });
const upload = multer ({ storage });

// Express Validator

const { check } = require('express-validator')

const validationsRegister = require('../validations/validations')

//Requerimos el controlador
const productController = require('../controllers/productController');

//Rutas para todos los usuarios
router.get(['/products', '/productos'], productController.products);
router.get(['/:id/detalle', '/:id/producto'], productController.productdetail); // ver que pasa con los links del header por esta sentencia

//Rutas vendedor
router.get('/publicar', productController.publish);
router.post('/publicar',/*uploadFile.any('image') ,*/ validationsRegister.createProduct, productController.createproduct);
router.get('/:id/editar', productController.edit);
router.put('/:id', /*upload.any() ,*/ productController.update);

//Rutas user logueado
router.get(['/cart', '/checkout', '/carrito'], productController.checkout);


module.exports = router;