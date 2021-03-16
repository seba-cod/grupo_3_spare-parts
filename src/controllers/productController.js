const fs = require('fs');
const path = require('path');
const jsonTable = require('../database/jsonTable');
const products = jsonTable('spareparts');
const db = require('../../database/models');
//Validaciones
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')

module.exports = {
    products: (req, res) => {
        db.products.findAll()
            .then(products => {
                return res.render('products', { products })
            })
            .catch(err => console.log(err))
    },
    productdetail: (req, res) => {
        let id = req.params.id
        db.products.findOne({ where: { id } })
            .then(product => {
                res.render('productDetail', { product })
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
            return res.render('publish', { errors: errors.mapped(), old: req.body }) };

        const { name, description, price, quantity, brand, original, piecenumber, carBrand, carModel, carYear, categorie } = req.body;
        db.products.create({
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
                image: req.filename,
                owner: req.session.user.user_name,
                category_id: parseInt(categorie)
                })
            .then( () => { res.redirect('/products') })
            .catch(err => { res.send(err) }) /*, const cat = await findByPk(req.body.categorie); setCategories(cat)*/
    },
    edit: (req, res) => {
        db.products.findByPk(req.params.id)
        .then( product => res.render('productEdit', {product}))
        .catch( err => console.log(err));
    },
    update: (req, res) => {
        // let filename = '';
        // if (req.body.image == undefined){
        //     filename = req.body.currentImage
        //     } else{
        //     filename = req.body.image
        //     }
        let { name, description, price, quantity, brand, original, piecenumber, carBrand, carModel, carYear, categorie } = req.body;
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
        // image: req.file ? req.file.filename
        },
        { where: { id: req.params.id } }
        )
        .then( () => res.redirect('/detail/' + req.params.id) )

    },
    delete: (req, res) => {
    db.products.destroy({
        where: { id: req.params.id } } )
        .then(() => { res.redirect('/products') } )
        .catch(error => console.log(error))}
}