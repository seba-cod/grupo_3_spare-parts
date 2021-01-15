const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get(['/login', '/ingreso'], userController.login);
router.get(['/register', '/registro'], userController.register);

module.exports = router;