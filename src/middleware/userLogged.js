// const jsonTable = require('../database/jsonTable');
// const userTable = jsonTable('users');
const db = require('../../database/models');

module.exports = async (req, res, next) =>{
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    if (emailInCookie){
        let userFromCookie = await db.users.findOne({ where: { email: emailInCookie } })
        if (userFromCookie){
            req.session.user = userFromCookie;
        }
        if (req.session && req.session.user){
            res.locals.isLogged = true;
            res.locals.user = req.session.user;
        }
        if (req.session && req.session.user.admin){
            res.locals.isAdmin = true;
        }
    }

    next();
};