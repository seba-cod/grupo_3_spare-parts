const express = require('express');
const router = express.Router();
const path = require('path');

/*------------------------------------------------------middlewares----------------------------------------------------*/
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
const validations = require('../middleware/validations');

// Invitados
const guest = require('../middleware/guest');

// Acceso solo para usuarios logueados
const auth = require('../middleware/auth');

// Require Admin midd
const admin = require('../middleware/authAdm');

// Controlador
const userController = require('../controllers/userController');

/*------------------------------------------------------vistas------------------------------------------------------*/

router.get(['/login', '/ingreso'], guest, userController.login);
router.post(['/login', '/ingreso'], validations.login, userController.auth);
router.get(['/profile', '/profile'], auth, userController.profile);
router.get(['/register', '/registro'], guest, userController.register);
router.get(['/logout', '/salir'], userController.logout); 

router.get(['/admin/all', '/admin/todos'], admin, userController.adminAll);
router.get(['/admin/detail/:id', '/admin/detalle/:id'], userController.detail);

router.post(['/register', '/registro'], upload.single('avatar'), validations.register, userController.create);

router.get(['/edit/:id', '/editar/:id'], userController.userEdit);
router.get(['/admin/edit/:id', '/admin/editar/:id'], admin, userController.adminEdit);
router.patch(['/admin/edit/:id', '/admin/editar/:id'], upload.single('avatar'), validations.update, userController.adminUpdate); 
router.patch(['/edit/:id', '/editar/:id'], upload.single('avatar'), validations.update, userController.userUpdate); 
router.delete(['/admin/delet/:id', '/admin/delete/:id'], userController.delete);

/*------------------------------------------------------export------------------------------------------------------*/
module.exports = router;