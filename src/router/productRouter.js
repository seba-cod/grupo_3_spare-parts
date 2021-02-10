const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer')

const storage = multer.diskStorage ({
    destination: (req,file, cb) => {
        cb(null, './public/images/avatars')
    },
    filename: (req, file,cb) => {
        let fileName = 'user-' + Date.now() + path.extname(file.originalname)
        cb(null, fileName)
    }
});

const uploadFile = multer ({ storage });


const productController = require('../controllers/productController');

//Rutas para todos los usuarios
router.get(['/products', '/productos'], productController.products);
router.get(['/detalle/:id', '/producto/:id'], productController.productdetail); // ver que pasa con los links del header por esta sentencia

//Rutas vendedor
router.get('/publicar', productController.publish);
router.post('/publicar', /*upload.any() ,*/ productController.createproduct);
router.get('/editar/:id', productController.edit);

//Rutas user logueado
router.get(['/cart', '/checkout', '/carrito'], productController.checkout);


module.exports = router;