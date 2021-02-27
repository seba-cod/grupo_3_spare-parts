const jsonTable = require('../database/jsonTable');
const userTable = jsonTable('users');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

module.exports = {
    login: (req, res) => {
        res.render('login');
    },
    auth: (req, res) => {
        //verificar los datos del usuario
        let user = undefined;
        let allUsers = userTable.all();
        user = allUsers.forEach(userNow => userNow.user_name == req.body.user_name)

        if (user != undefined) {
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
    },
    adminAll: (req, res) => {
        let users = userTable.all();
        return res.render('adminView', {users: users});
    },
    detail: (req, res) => {
        let users = userTable.all();
        let user;
        users.forEach( (x) => { if (x.id == req.params.id) { return user = x;} } )
        user.id = req.params.id;
        res.render('adminDetail', {user}); 
    },
    delete: (req, res) => {
        jsonTable.delete(req.params.id)
        return res.redirect('/user/admin/all')
    },
    edit: (req, res) => {
            let user = userTable.find(req.params.id);
            res.render('adminEdit', {user}); 
    }

};