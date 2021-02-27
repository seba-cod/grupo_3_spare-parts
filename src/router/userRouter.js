const express = require('express');
const router = express.Router();
const path = require('path');
// Requiero multer: storage 
const upload = require('../database/helpers/storage');
// Express Validator
const { check } = require('express-validator')
const validationsRegister = require('../validations/validations')

// Controlador
const userController = require('../controllers/userController');

// muestra form de login
router.get(['/login', '/ingreso'], userController.login);
// proceso form de login
router.post(['/login', '/ingreso'], userController.auth);

// muestra form de register
router.get(['/register', '/registro'], userController.register);
// proceso form de register
router.post(['/register', '/registro'], upload.single('user_avatar'), validationsRegister.register, userController.create);

router.get(['/admin/all', '/admin/todos'], userController.adminAll);
router.get(['/admin/detail/:id', '/admin/detalle/:id'], userController.detail);
router.get(['/admin/edit/:id', '/admin/editar/:id'], userController.edit);
router.delete(['/admin/detalle/:id', '/admin/detalle/:id'], userController.delete);


module.exports = router;