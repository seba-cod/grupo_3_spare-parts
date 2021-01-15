const path = require('path');

module.exports = {
    detail: (req, res) => {
        res.render(path.resolve('./src/views/productDetail.ejs'));
    },
    checkout: (req, res) => {
        res.render(path.resolve('./src/views/cart.ejs'));
    },

};