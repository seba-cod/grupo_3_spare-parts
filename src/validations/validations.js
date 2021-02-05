const { body } = require('express-validator')

module.exports ={
    register: [
        body('user_name')
            .notEmpty().withMessage('Debes completar el nombre')
            .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 4 caracteres')
            .isLength({ max: 20 }).withMessage('El nombre debe tener menos de 10 caracteres'),
        body('first_name')
            .notEmpty().withMessage('Debes completar el nombre'),
        body('last_name')
            .notEmpty().withMessage('Debes completar el apellido'),
        body('email')
            .isEmail().withMessage('El email debe ser válido'),
        body('address')
            .notEmpty().withMessage('Debes completar una dirección válida'),
        body('password')
        .notEmpty().withMessage('Debes completar tu contraseña')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .isLength({ max: 50 })
    ]
     // user_name first_name last_name email adress password repassword
}