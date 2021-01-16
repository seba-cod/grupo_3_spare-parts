const path = require('path');

module.exports = {
    index: (req, res) => {
        res.render(path.resolve('./src/views/index.ejs'));
    },
    login: (req,res) =>{
        res.render(path.resolve('./src/views/login.ejs'))
    }
    // about: (req, res) => {
    //     res.render(path.resolve('./src/views/about.ejs'));
    // },

};