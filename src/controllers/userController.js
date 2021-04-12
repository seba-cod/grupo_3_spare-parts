// Solicito métodos y la base en .json
const jsonTable = require('../database/jsonTable');
const userTable = jsonTable('users');
// Solicito mi DB (MySQL)
const db = require('../database/models');
// Encriptado de contraseña
const bcryptjs = require('bcryptjs');
// Validaciones
const { validationResult } = require('express-validator');

module.exports = {
    login: (req, res) => {
        // Renderizado del login
        res.render('login');
    },
    auth: (req, res) => {
        // Método por POST para envío de form
        // Utilizo express validator para cargar los errores
        let errors = validationResult(req);
        // Declaro un usuario, recupero el email del body y encuentro al usuario buscado
        let userWanted = userTable.findByField('email', req.body.email);

        // Para DB - con APIs borrariamos esto y hariamos un fetch con la comparación desde el front? Si es así resolver lo de cookies y sostener LOCAL STORAGE para mantener al usuario logueado; si utilizamos local storage hay que atajar los siguientes métodos que utilizan req.session

        /* db.users.findOne({ where: { email: req.body.email }})
            .then(user => {
                let comparePsw = bcryptjs.compareSync(req.body.password, user.password)
                if (comparePsw) {
                    delete user.password;
                    delete user.terms;
                    req.session.user = user;
                } else {
                    return res.render('login', { errors: { password: { msg: 'La contraseña es incorrecta' } }, old: req.body }) 
                }
                
                // Si el usuario marca la casilla de Recuerdame, guardo su información en una cookie
                if (req.body.remember_user) {
                    res.cookie('userEmail', user.email, { maxAge: (1000 * 60 * 60 * 24 * 30) }) // la guardo durante 1 mes
                    return res.redirect('/user/profile')
                }
            .catch(err => return res.render('login', {
                errors: { email: { msg: 'No te encuentras registrado' } }, old: req.body
            }) ) */

        // Si lo encontré verifico la contraseña y le cargo los datos en session
        if (userWanted) {
            let comparePsw = bcryptjs.compareSync(req.body.password, userWanted.password)
            if (comparePsw) {
                delete userWanted.password;
                delete userWanted.terms;
                req.session.user = userWanted;
                // Si el usuario marca la casilla de Recuerdame, guardo su información en una cookie
                if (req.body.remember_user) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60 * 60 * 24 * 30) }) // la guardo durante 1 mes
                }
                return res.redirect('/user/profile')
            }
            else { return res.render('login', { errors: { password: { msg: 'La contraseña es incorrecta' } }, old: req.body }) }
            // Si no encontre un usuario render de form con datos ya ingresados
        } else {
            return res.render('login', {
                errors: { email: { msg: 'No te encuentras registrado' } }, old: req.body
            })
        }
    },
    profile: (req, res) => {
        res.render('profile', { user: req.session.user })
    },
    logout: (req, res) => {
        // Limpio la Cookie de remember_user
        res.clearCookie('userEmail');
        // Borro session actual, ¿intento borrar cookies? // Si lo hago desde el front con local storage hay que borrarlo también
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

        // Para DB  - NECESITA AGREGAR async DELANTE DE LA FUNCION DEL MÉTODO
        // - es seguro hacer este método desde el front con fetch?

        /* Reviso que no se encuentre el correo electronico ya registrado
            let userExists = await db.users.findOne({ where: { email: req.body.email }})
            if (userExists) {
                return res.render('register', { errors: { email: { msg: 'Este correo ya se encuentra registrado' } } }) 
            }
            
            if (errors.isEmpty()) {
                // destructuro el body para enviarselo a la db
                { user_name, first_name, last_name, email, address, password } = req.body
                let avatar = req.file.filename;
            }
            db.users.create({
                user_name,
                first_name,
                last_name,
                email,
                address,
                password,
                avatar
            })
                .then( () => { res.redirect('/user/login')})
                .catch( err => { res.render('register', {errors: errors.mapped(), old: req.body ) })}
        */

        // Reviso que no se encuentre el correo electronico ya registrado
        let existUser = userTable.findByField('email', req.body.email);
        if (existUser) { return res.render('register', { errors: { email: { msg: 'Este correo ya se encuentra registrado' } } }) }
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
        // Metodo DB
        /* db.users.findAll()
            .then(users => {
                return res.render('adminView', { users })
            })
            .catch (err => res.send('Tu DB no está andando por: ' + err))}) */
    },
    detail: (req, res) => {
        // Se renderiza por GET
        let users = userTable.all();
        let user;
        users.forEach(x => { if (x.id == req.params.id) { return user = x; } })
        user.id = req.params.id;
        return res.render('adminDetail', { user });
        // Metodo DB - PONER async DELANTE DEL METODO
        /* let user = await db.users.findByPk(where: { id: req.params.id })
        return res.render('adminDetail', { user });
        */
    },
    delete: (req, res) => {
        // Método por POST para envío de form
        userTable.delete(req.params.id)
        return res.redirect('/user/admin/all')
        // Metodo DB 
        /*
        db.users.delete({where:{id: req.params.id}})
            .then( () => { return res.redirect('/user/admin/all')})
            .catch( err => { res.send('something went wrong ' + err)}
        */
    },
    edit: (req, res) => {
        // Edicion de Usuario como Admin
        // Método por GET para envío de form
        let user = userTable.find(req.params.id);
        return res.render('adminEdit', { user });

        // Metodo DB
        /*
            db.users.findByPk({where:{id:req.params.id}})
                .then( user => { return res.render('adminEdit', {user})})
        */
    },
    update: (req, res) => {
        // Método por POST para envío de form
        // Utilizo express validator para cargar los errores
        let errors = validationResult(req);
        // Atajo ruta en primer ingreso
        if (errors.isEmpty()) {
            console.log('editar usuarios no errores')
            let user = req.body;
            if (req.file) {
                if (user.avatar != req.file.filename) {
                    user.avatar = req.file.filename;
                }
            }
            userTable.create(user);
            return res.redirect('/');
        } else {
            console.error(errors.mapped())    // req obligatorio cambair la imagen y el nombre de usuario-modif.
            // Render de form con datos ya ingresados
            return res.render('adminEdit', { errors: errors.mapped(), old: req.body });
        }
    }
            // Metodo DB - poner ASYNC antes de la funcion del método 
            /* const old = await db.users.findByPk({ where: { id: req.params.id } } )
            const { first_name, last_name, address } = req.body
            db.users.update({
            first_name,
            last_name,
            address,
            avatar: req.file ? req.file.filename : old.avatar
            },
            { where: { id: req.params.id } }
            )
            .then( () => res.redirect('productDetail') )
            .catch( err =>  { 
                return res.render('adminEdit', { errors: errors.mapped(), old: req.body }) 
            }
            */

    ,

};


