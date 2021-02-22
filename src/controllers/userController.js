 const jsonTable = require('../database/jsonTable');
const userTable = jsonTable('users');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator')

module.exports = {
    login: (req, res) => {
        res.render('login');
    },
    auth: (req, res) => {
        //verificar los datos del usuario
        let user;
        user = userTable.forEach(userNow = userNow.user_name == req.body.user_name)
        
        if (user !=undefined) {
            user.password == req.body.password 
        }
        req.session.user = user;
        
        res.cookie('rememberToken', token, { maxAge: 1000 * 60  * 60 *  24 * 90 });
        //redireccionar
        res.redirect('/')

        
    },
    register: (req, res) => {
        res.render('register');
    },
    create: (req, res) => {
        // intento de validación
        // Valido los campos
        let errors = validationResult(req);

        // Me fijo si no hay errores
        if (errors.isEmpty()) {
        let user = req.body;
  
        res.redirect('/');
        
        } else {
            // Renderizo el formulario nuevamente con los errors y los datos completados
            return res.render('register', { errors: errors.mapped(), old: req.body });
        }
        

       
        //delete user.repassword;
        //delete user.terms;
        //const newUserId = userTable.create(user);
        //res.redirect('/');
        
    }

};