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

// muestra form de login
router.get(['/login', '/ingreso'], guest, userController.login);
// proceso form de login
router.post(['/login', '/ingreso'], validations.login, userController.auth);
// muestra perfil de usuario
router.get(['/profile', '/profile'], auth, userController.profile);
// cierre de sesion
router.get('/logout', userController.logout); 


// muestra form de register
router.get(['/register', '/registro'], guest, userController.register);

// muestra rutas de administrador -- agregar midd "authAdm" que verifica que el usuario en su prop user.admin == true
router.get(['/admin/all', '/admin/todos'], admin, userController.adminAll);
router.get(['/admin/detail/:id', '/admin/detalle/:id'], userController.detail);

// proceso form de register
router.post(['/register', '/registro'], upload.single('avatar'), validations.register, userController.create);
// proceso form de administrador
router.get(['/admin/edit/:id', '/admin/editar/:id'], userController.edit);
router.patch(['/admin/edit/:id', '/admin/editar/:id'], upload.single('avatar'), validations.update, userController.update); 
router.delete(['/admin/detaile/:id', '/admin/detalle/:id'], userController.delete);

/*------------------------------------------------------export------------------------------------------------------*/
module.exports = router;