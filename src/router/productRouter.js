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

router.get(['/product', '/producto'], productController.detail);
router.get(['/cart', '/checkout', '/carrito'], productController.checkout);
router.get('/publicar', productController.publish);
router.post('/publicar', /*upload.any() ,*/ productController.createproduct);

module.exports = router;