const jsonTable = require('../database/jsonTable');
const userTable = jsonTable('users');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

module.exports = {
    login: (req, res) => {
        // Se renderiza por GET
        res.render('login');
    },
    auth: (req, res) => {
    // Método por POST para envío de form
        // Utilizo express validator para cargar los errores
        let errors = validationResult(req);
        // Declaro un usuario, recupero el email del body y encuentro al usuario buscado
        // let userWanted;
        // let email = req.body.email;
        let userWanted = userTable.findByField('email', req.body.email);

        // userWanted = userTable.emailFind(email);
        // Si lo encontré verifico la contraseña y le cargo los datos en session
        if (userWanted) {
            let comparePsw = bcryptjs.compareSync(req.body.password, userWanted.password)
            if (comparePsw) {
                delete userWanted.password;
                delete userWanted.terms;
                req.session.user = userWanted;
                return res.redirect('/user/profile')
            }
            else { return res.render('login', { errors: { password: { msg: 'La contraseña es incorrecta' } }, old: req.body } ) }
        // Si no encontre un usuario render de form con datos ya ingresados
        } else { 
            return res.render('login', { 
                errors:  { email: { msg: 'No te encuentras registrado' } }, old: req.body } ) }
    },
    profile: (req, res) => {
        res.render('profile', {user: req.session.user})
    },
    logout: (req, res) => {
        // Borro session actual, ¿intento borrar cookies?
        req.session.destroy();
        // Intento redirigir al home pero no funciona-revisar
        res.redirect('/');
    },
    register: (req, res) => {
        // Se renderiza por GET
        res.render('register');
    },
    create: (req, res) => {
    // Método por POST para envío de form
        // Utilizo express validator para cargar los errores
        let errors = validationResult(req);
        // Reviso que no se encuentre el correo electronico ya registrado
        let existUser = userTable.findByField('email', req.body.email);
        if (existUser) { return res.render('register', { errors: { email: { msg: 'Este correo ya se encuentra registrado'}}}) }
        // Si no existe un usuario con ese correo atajo ruta en primer ingreso
        else if (errors.isEmpty()) {
            let user = req.body;
            user.password = bcryptjs.hashSync(req.body.password, 10)
            user.avatar = req.file.filename;
            userTable.create(user);
            return res.redirect('/user/login');
        } else {
        // Render de form con datos ya ingresados
            return res.render('register', { errors: errors.mapped(), old: req.body });
        }
    },
    adminAll: (req, res) => {
    // Se renderiza por GET
        let users = userTable.all();
        return res.render('adminView', { users: users });
    },
    detail: (req, res) => {
    // Se renderiza por GET
        let users = userTable.all();
        let user;
        users.forEach( x => { if (x.id == req.params.id) { return user = x; } })
        user.id = req.params.id;
        return res.render('adminDetail', { user });
    },
    delete: (req, res) => {
    // Método por POST para envío de form
        userTable.delete(req.params.id)
        return res.redirect('/user/admin/all')
    },
    edit: (req, res) => {
    // Edicion de Usuario como Admin
    // Método por GET para envío de form
    let user = userTable.find(req.params.id);
        return res.render('adminEdit', { user });
    },    
    update: (req, res) => {
        // Método por POST para envío de form
            // Utilizo express validator para cargar los errores
            let errors = validationResult(req);
            // Atajo ruta en primer ingreso
            if (errors.isEmpty()) {
                let user = req.body;
                if (user.avatar != req.file.filename) {
                    user.avatar = req.file.filename;
                }
                userTable.create(user);
                return res.redirect('/');
            } else {
            // Render de form con datos ya ingresados
                return res.render('adminEdit', { errors: errors.mapped(), old: req.body });
            }
        },

};



/*hacer mañana:
1. cerrar session req.session y cookies.
3. ejs en index para si es administrador muestre las opciones de ver usuarios y editarlos
4. ejs para que un usuario vea sus productos con detalle y edicion como la lista de usuarios de adm
5. sequelize y hacer las BD
6. vincular el modelo con todo esto*/