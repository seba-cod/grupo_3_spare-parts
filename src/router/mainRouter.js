const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get(['/home', '/', ''], mainController.index);
// router.get('/about', mainController.about);

module.exports = router;