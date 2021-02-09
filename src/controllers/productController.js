const fs = require('fs');
const path = require('path');
const jsonTable = require('../database/jsonTable');
const products = jsonTable('spareparts');

module.exports = {
    detail: (req, res) => {
        // Solicito todos los productos utilizando el método all() dentro del objeto products, que trae la función de trabajos s/json.
        let allProducts = products.all();
        res.render('product', {allProducts});
    },
    checkout: (req, res) => {
        res.render('cart');
    },
    publish: (req, res) => {
        res.render('sell');
    },
    createproduct: (req, res) => {
        // req.body.name
        // req.body.description
        // req.body.price
        // req.body.categorie
        // req.body.quantity
        // //img name_ image
        // req.body.original
        // req.body.piecenumber
        // req.body.carBrand
        // req.body.carModel
        // req.body.carYear
    }
};