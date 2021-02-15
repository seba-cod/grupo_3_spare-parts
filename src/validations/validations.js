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
            .isLength({ max: 20 }).withMessage('El nombre debe tener menos de 20 caracteres'),
        check('password')
            .notEmpty().withMessage('Debes completar tu contraseña')
    ],
    createProduct: [
        check('name')
            .notEmpty().withMessage('Debes completar el nombre'),
        check('description')
            .notEmpty().withMessage('Debes completar la descripción con un máximo de 300 caractéres')
            .isLength({ max : 300 }).withMessage('Debes completar la descripción con un máximo de 300 caractéres'),
        check('price')
            .notEmpty().withMessage('Debes completar el precio y este debe ser mayor a cero'),
            /* Me falta esta validación, que sea > a 0 pero no se que valdación usar*/
        check('categorie')
            .notEmpty().withMessage('Debes seleccionar una categoría'),
        check('quantity')
            .notEmpty().withMessage('La cantidad debe ser mayor a 0 y menor a 99'),
    ]

}