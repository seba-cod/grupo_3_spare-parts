const { Sequelize } = require("../../database/models");
const db = require("../../database/models");
const Op = db.Sequelize.Op;

module.exports = {
    index: (req, res) => {
    db.categories
      .findAll()
      .then(async (categories) => {
        const products = await db.products.findAll({limit: 4, order: [ [ Sequelize.fn('RAND')]]});
        let randomProducts = [];
        let randomProductsToSearch = products.forEach(randomProductsToSearch => {
            randomProducts.push(randomProductsToSearch.dataValues) } )
        return res.render("index", { categories, randomProducts });
      })
      .catch((err) => {
        console.log(err);
      })
    },
    about: (req, res) => {
        res.render('about');
    },
    contact: (req, res) => {
        res.render('contact');
    },
    sendContact: (req, res) => {
        /* TODO escribir el formulario para que envíe un correo electrónico a: correo-falso1@spare-parts.com */
        /* TODO aprender a email framework */
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