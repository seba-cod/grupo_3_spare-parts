const path = require('path');

module.exports = {
    login: (req, res) => {
        res.render(path.resolve('./src/views/login.ejs'));
    },
    register: (req, res) => {
        res.render(path.resolve('./src/views/register.ejs'));
    },

};