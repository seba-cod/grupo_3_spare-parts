const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get(['/home', '/', ''], mainController.index);
router.get(['/login','/iniciarsesion'],mainController.login);
// router.get('/about', mainController.about);
router.get('/header', mainController.header);


module.exports = router;