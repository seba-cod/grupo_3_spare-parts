const db = require("../database/models");
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
        // Declaro un array vacío para poder trabajar la busqueda
        let searchArray = [];
        // Divido lo que escribió el Usuario como busqueda para poder buscar cada palabra
        req.query.query.split(' ').forEach(eachWordOfTheSearch => searchArray.push({ [Op.substring]:(eachWordOfTheSearch) }))
        // Iré a buscar si dentro de mis productos existe algo que coincida con alguna palabra del array de busqueda
        db.products.findAll({
            where: {
                name: {
                    // Utilizamos el operador de "o"
                    [Op.or]: searchArray // req.query para acceder a la URL, .query para acceder al parametro de busqueda
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
        // Renderizado de status:404
        res.render('not_found');
    }
};