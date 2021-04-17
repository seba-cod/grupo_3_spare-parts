const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

const admin = require('../middleware/authAdm');


router.get(['/home', '/', ''], admin, mainController.index);
router.get(['/about', '/sobre'], mainController.about);
router.get(['/contact', '/contacto'], mainController.contact);
router.get(['/search', '/busqueda'], mainController.search);
// router.get(('*'), mainController.notfound);
module.exports = router;
