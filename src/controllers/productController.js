module.exports = {
    detail: (req, res) => {
        res.render('product');
    },
    checkout: (req, res) => {
        res.render('cart');
    },
    publish: (req, res) => {
        res.render('sell');
    }
};