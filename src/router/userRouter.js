const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get(['/login', '/ingreso'], userController.login);
router.get(['/register', '/registro'], userController.register);
router.post(['/register', '/registro'], userController.create);



// crear usuario, editar usuario, borrar usuario

module.exports = router;