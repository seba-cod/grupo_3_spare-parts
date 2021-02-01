const jsonTable = require('../database/jsonTable');
const userTable = jsonTable('users');

module.exports = {
    login: (req, res) => {
        res.render('login');
    },
    register: (req, res) => {
        res.render('register');
    },
    create: (req, res) => {
        let user = req.body;
        delete user.repassword;
        delete user.terms;
        const newUserId = userTable.create(user);
        res.redirect('/');
    }

};