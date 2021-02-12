const express = require('express');
const router = express.Router();

// Multer + Storage + Subir Imágenes
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage ({
    destination: (req,file, cb) => {
        cb(null, './public/images/avatars')
    },
    filename: (req, file,cb) => {
        let fileName = 'user-' + Date.now() + path.extname(file.originalname)
        cb(null, fileName)
    }
})

const uploadFile = multer ({ storage });

// Express Validator

const { body } = require('express-validator')

const validationsRegister = require('../validations/validations')
// Rutas
const userController = require('../controllers/userController');


router.get(['/login', '/ingreso'], userController.login);
router.post(['/login', '/ingreso'], userController.auth);
router.get(['/register', '/registro'], userController.register);
router.post(['/register', '/registro'], uploadFile.single('user_avatar'), validationsRegister.register, userController.create);



// crear usuario, editar usuario, borrar usuario

module.exports = router;