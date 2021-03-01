const jsonTable = require('../database/jsonTable');
const userTable = jsonTable('users');

module.exports = (req, res, next) =>{
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = userTable.findByField('email', emailInCookie);

    if (userFromCookie){
        req.session.user = userFromCookie;
    }

    if (req.session && req.session.user){
        res.locals.isLogged = true;
        res.locals.user = req.session.user;
    }


    next();
};