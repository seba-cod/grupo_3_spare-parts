// Solicito métodos y la base en .json
// const jsonTable = require('../database/jsonTable');
// const products = jsonTable('spareparts');
// Solicito mi DB (MySQL)
const db = require('../../database/models');
// Encriptado de contraseña
const bcrypt = require('bcryptjs');
//Validaciones
const {
    validationResult
} = require('express-validator')

module.exports = {
    products: (req, res) => {
        // Implementar APIs, levantarlas con JS y borrar el resto, dejar solo esta
        // return res.render('products')
        db.products.findAll()
            .then(products => {
                return res.render('products', { products })
            })
            .catch(err => console.log(err))
    },
    productdetail: (req, res) => {
        // Implementar APIs, levantarlas con JS y borrar el resto, dejar solo esta
        // return res.render('productDetail')
        let id = req.params.id
        db.products.findOne({
                where: {
                    id
                }
            })
            .then(product => {
                res.render('productDetail', {
                    product
                })
            })
            .catch(err => console.log(err))
    },
    checkout: (req, res) => {
        //Renderiza el carrito de compras
        res.render('cart');
    },
    publish: (req, res) => {
        //Renderiza la web de creación de producto por get
        res.render('publish');
    },
    createproduct: (req, res) => {
        // Crea producto por post
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('publish', {
                errors: errors.mapped(),
                old: req.body
            })
        };

        const {
            name,
            description,
            price,
            quantity,
            brand,
            original,
            piecenumber,
            carBrand,
            carModel,
            carYear,
            categorie
        } = req.body;

        db.products.create({
                name,
                price,
                description,
                quantity,
                brand,
                original,
                piecenumber,
                carBrand,
                carModel,
                carYear,
                image: req.file.filename,
                owner: req.session.user.user_name,
                category_id: parseInt(categorie)
            })
            .then(() => {
                res.redirect('/products')
            })
            .catch(err => {
                res.send(err)
            }) /*, const cat = await findByPk(req.body.categorie); setCategories(cat)*/
    },
    edit: (req, res) => {
        // Implementar APIs, levantarlas con JS y borrar el resto, dejar solo esta
        // return res.render('productEdit')

        db.products.findByPk(req.params.id)
            .then(product => res.render('productEdit', {
                product
            }))
            .catch(err => console.log(err));
    },
    update: async (req, res) => {
        const old = await db.product.findByPk(req.params.id)
        let filename = '';
        if (old.image != undefined) {
            let filename = old.image;
        }
        let {
            name,
            description,
            price,
            quantity,
            brand,
            original,
            piecenumber,
            carBrand,
            carModel,
            carYear,
            categorie
        } = req.body;
        db.products.update({
                name,
                description,
                price,
                categorie,
                quantity,
                brand,
                original,
                piecenumber,
                carBrand,
                carModel,
                carYear,
                image: req.body.file ? req.body.file.filename : filename
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(() => res.redirect('/detail/' + req.params.id))

    },
    delete: (req, res) => {
        db.products.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect('/products')
            })
            .catch(error => console.log(error))
    }
}