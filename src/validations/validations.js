const { check } = require('express-validator')

module.exports ={
    register: [
        check('user_name')
            .notEmpty().withMessage('Debes completar el nombre')
            .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 4 caracteres')
            .isLength({ max: 20 }).withMessage('El nombre debe tener menos de 20 caracteres'),
        check('first_name')
            .notEmpty().withMessage('Debes completar el nombre'),
        check('last_name')
            .notEmpty().withMessage('Debes completar el apellido'),
        check('email')
            .isEmail().withMessage('El email debe ser válido'),
        check('address')
            .notEmpty().withMessage('Debes completar una dirección válida'),
        check('password')
        .notEmpty().withMessage('Debes completar tu contraseña')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .isLength({ max: 12 }).withMessage('No te pases de listo muchacho')
    ],
    login: [
        check('user_name')
            .notEmpty().withMessage('Debes completar el nombre')
            .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 4 caracteres')
            .isLength({ max: 20 }).withMessage('El nombre debe tener menos de 10 caracteres'),
            check('password')
            .notEmpty().withMessage('Debes completar tu contraseña')
    ]
     // user_name first_name last_name email adress password repassword
}