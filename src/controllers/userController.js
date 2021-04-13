// Solicito métodos y la base en .json
// const jsonTable = require('../database/jsonTable');
// const userTable = jsonTable('users');
// Solicito mi DB (MySQL)
const db = require('../../database/models');
// Encriptado de contraseña
const bcryptjs = require('bcryptjs');
// Validaciones
const {
    validationResult
} = require('express-validator');



module.exports = {
    login: (req, res) => {
        // Renderizado del login
        res.render('login');
    },
    auth: (req, res) => {
        // Método por POST para envío de form
        // Utilizo express validator para cargar los errores
        let errors = validationResult(req);
        db.users.findOne({ where: { email: req.body.email } })
            .then(user => {
                let comparePsw = bcryptjs.compareSync(req.body.password, user.password)
                if (comparePsw) {
                    delete user.password;
                    delete user.terms;
                    req.session.user = user;
                } else {
                    return res.render('login', {
                        errors: {
                            password: {
                                msg: 'La contraseña es incorrecta'
                            }
                        }, old: req.body
                    } )
                }
                // Si el usuario marca la casilla de Recuerdame, guardo su información en una cookie
                if (req.body.remember_user) {
                    res.cookie('userEmail', user.email, {
                        maxAge: (1000 * 60)
                    }) // la guardo durante 1 mes
                }
                return res.redirect('/user/profile')
            } )
            .catch(err => res.render('login', {
                errors: {
                    email: {
                        msg: 'No te encuentras registrado'
                    }
                },
                old: req.body
            }))
    },
    profile: (req, res) => {
        res.render('profile', {
            user: req.session.user
        })
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
        //  Reviso que no se encuentre el correo electronico ya registrado
        db.users.findOne({ where: { email: req.body.email }})
            .then( user => {
                if (user) {
                    return res.render('register', { errors: {
                            email: { msg: 'Este correo ya se encuentra registrado' } }
                    })
                }
                // Pregunto si hay errores. Si los hay los devuelvo.
                if (!errors.isEmpty()) {
                    res.render('register', {
                        errors: errors.mapped(),
                        old: req.body
                    } ) 
                }
                
                const { user_name, first_name,  last_name, email,address} = req.body
                let password = bcryptjs.hashSync(req.body.password, 10)
                let avatar = req.file;
                db.users.create({
                    user_name,
                    first_name,
                    last_name,
                    email,
                    address,
                    password,
                    avatar: avatar ? req.file.filename : "default.png"
                })
                .then(() => {
                    res.redirect('/user/login')
                } )
             } )
            .catch(err => {
                res.render('register', {
                    errors: errors.mapped(),
                    old: req.body
                })
            })
        },
    
    adminAll: (req, res) => {
        // Se renderiza por GET
        db.users.findAll()
            .then(users => {
                return res.render('adminView', { users })
            })
            .catch(err => res.send('Tu DB no está andando por: ' + err))
    },
    detail: async (req, res) => {
        // Se renderiza por GET
        let id = req.params.id
        let user = await db.users.findByPk(id)
        return res.render('adminDetail', { user } );
    },
    delete: (req, res) => {
        // Método por POST para envío de form
        let id = req.params.id
        db.users.delete({ where: { id } } )
            .then(() => { return res.redirect('/user/admin/all') })
            .catch(err => { res.send('something went wrong ' + err) })
        },
    edit: (req, res) => {
        let id = req.params.id
        db.users.findByPk(id)
        .then(user => {
            return res.render('adminEdit', { user } ) } )
        .catch(err => { res.send('something went wrong ' + err) })
    },
    update: async (req, res) => {
        // Método por POST para envío de form
        // Utilizo express validator para cargar los errores
        let errors = validationResult(req);
        let id = req.params.id
        const old = await db.users.findByPk(id)
        const { first_name, last_name, address } = req.body
        let avatar = req.file;
        console.log(req.file)
        db.users.update({ 
            first_name,
            last_name, 
            address,
            avatar: avatar ? req.file.filename : old.avatar
            }, {
                where: { id } } )
            .then(() => res.redirect('adminEdit'))
            .catch( err => { return res.render('adminEdit', {
                    errors: errors.mapped(),
                    old: req.body
                })
            })
    }
}