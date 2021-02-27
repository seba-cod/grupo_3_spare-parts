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
        let user = undefined;
        allUsers = userTable.all();
        user = allUsers.forEach(userNow => userNow.user_name == req.body.user_name)
           
        if (user !=undefined) {
            if (user.password == req.body.password) {
                req.session.user = user;
            } 
        }
        // else { res.render ('login', { 
        //         errors: { user_name: { msg: 'No te encuentras registrado' }, password: { msg: 'La contraseña es incorrecta'} }  }  )  }


        //redireccionar
        res.send(allUsers)
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