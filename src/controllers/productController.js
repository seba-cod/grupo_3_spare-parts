const fs = require('fs');
const path = require ('path');
const jsonTable = require('../database/jsonTable');
const products = jsonTable('spareparts');

module.exports = {
    products: (req, res) => {
        // Solicito todos los productos utilizando el método all() dentro del objeto products, que trae la función de trabajos s/json.
        let allProducts = products.all();
        res.render('products', { allProducts });
    },
    productdetail: (req, res) => {
        let product = products.find(req.params.id)
        res.render('productDetail', {product: product})

    },
    checkout: (req, res) => {
        res.render('cart');
    },
    publish: (req, res) => {
        res.render('publish');
    },
    createproduct: (req, res) => {
        let newProduct = {
            //vendor: req.session.user.id, // linkeo al vendedor
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            categorie: req.body.categorie,
            quantity: req.body.quantity,
            //img name_ image // que dato tomar de la imágen para mostrarla?
            original: "",
            piecenumber: "",
            carBrand: "",
            carModel: "",
            carYear: "",
        };
        if (req.body.original != "") {
            newProduct.original = req.body.original
        };
        if (req.body.piecenumber != "") {
            newProduct.piecenumber = req.body.piecenumber
        };
        if (req.body.carBrand != "") {
            newProduct.carBrand = req.body.carBrand
        };
        if (req.body.carModel != "") {
            newProduct.carModel = req.body.carModel
        };
        if (req.body.carYear != "") {
            newProduct.carYear = req.body.carYear
        };
        products.create(newProduct);
        let allProducts = products.all();
        res.render('products', { allProducts });
    }
}