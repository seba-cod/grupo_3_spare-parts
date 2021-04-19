const express = require('express');
const router = express.Router();
const path = require('path');

/*------------------------------------------------------middlewares----------------------------------------------------*/
// Requiero multer: storage 
const multer = require('multer');
const storage = multer.diskStorage ({
    destination: (req,file, cb) => {
        cb(null, './public/images/products')
    },
    filename: (req, file,cb) => {
        let fileName = 'product-' + `${Date.now()}img${path.extname(file.originalname)}`;
        cb(null, fileName)
    }
});
const upload = multer ({ storage });

// Express Validator
const { check } = require('express-validator')
const validations = require('../middleware/validations')

// Controlador
const productController = require('../controllers/productController');

//Rutas para todos los usuarios
router.get(['/all', '/todos'], productController.allProducts);
router.get(['/detail/:id', '/detalle/:id'], productController.productDetail); // ver que pasa con los links del header por esta sentencia

//Rutas vendedor
router.get(['/publicar', '/publish'], productController.publishForm);
router.get(['/editar/:id','/edit/:id'], productController.editProduct);
router.post(['/publicar', '/publish'], upload.single('image'), validations.createProduct, productController.createProduct);
router.patch(['/editar/:id','/edit/:id'], upload.single('image'), productController.updateProduct);
router.delete(['/admin/delete/:id', '/admin/borrar/:id'], productController.deleteProduct);

//Rutas user logueado
router.get(['/cart', '/checkout', '/carrito'], productController.checkout);

module.exports = router;