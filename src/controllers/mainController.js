const db = require("../../database/models");
const Op = db.Sequelize.Op;

module.exports = {
    index: (req, res) => {
        console.log(req.session);
        res.render('index');
    },
    about: (req, res) => {
        res.render('about');
    },
    contact: (req, res) => {
        res.render('contact');
    },
    search: (req, res) => {
        console.log(req.query.query)
        let unArrayQueVoyAConstruir = [];
        req.query.query.split(' ').forEach(algoMejorQueX => unArrayQueVoyAConstruir.push({ [Op.substring]: algoMejorQueX }))

        db.products.findAll({
            where: {
                name: {
                    [Op.or]: unArrayQueVoyAConstruir // req.query para acceder a la URL, .query para acceder al parametro de busqueda
                }
            }
        })
        .then(product => {
            if (product.length > 0) {
                return res.render('products', {products:product})
            }
            return res.send('No existen productos encontrados con tu busqueda: ')
        })
        .catch(err => console.log(err))
    },
    notfound: (req, res) => {
        res.render('not_found');
    }
};