const express = require('express');
const router = express.Router();
const path = require('path');
// Requiero multer: storage 
const multer = require('multer');
const storage = multer.diskStorage ({
    destination: (req,file, cb) => {
        cb(null, './public/images/avatars')
    },
    filename: (req, file,cb) => {
        let fileName = 'user-' + `${Date.now()}img${path.extname(file.originalname)}`;
        cb(null, fileName)
    }
});
const upload = multer ({ storage });
// Express Validator
const { check } = require('express-validator');
const validationsRegister = require('../validations/validations');

// Controlador
const userController = require('../controllers/userController');

// muestra form de login
router.get(['/login', '/ingreso'], userController.login);
// proceso form de login
router.post(['/login', '/ingreso'], userController.auth);
// muestra form de register
router.get(['/register', '/registro'], userController.register);
// muestra rutas de administrador
router.get(['/admin/all', '/admin/todos'], userController.adminAll);
router.get(['/admin/detail/:id', '/admin/detalle/:id'], userController.detail);

// proceso form de register
router.post(['/register', '/registro'], upload.single('user_avatar'), validationsRegister.register, userController.create);
// proceso form de administrador
router.get(['/admin/edit/:id', '/admin/editar/:id'], userController.edit);
router.put(['/admin/edit/:id', '/admin/editar/:id'], upload.single('user_avatar'), validationsRegister.register, userController.update); /*no quiere andar ni con PUT ni con PATCH, hay que generar un nuevo metodo en validaciones para este update*/
router.delete(['/admin/detalle/:id', '/admin/detalle/:id'], userController.delete);

// cierre de sesion
router.post('/logout', userController.logout); 

module.exports = router;