const fs = require('fs');
const path = require ('path');
const jsonTable = require('../database/jsonTable');
const products = jsonTable('spareparts');
// const Product = require('../database/models/Product');
//Validaciones
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')

module.exports = {
    products: (req, res) => {
        //Renderiza el detalle de todos los productos por get
        // Solicito todos los productos utilizando el método all() dentro del objeto products, que trae la función de trabajos s/json.
        let allProducts = products.all();
        res.render('products', { allProducts });
        // /*SEQUELIZE*/
        // db.Product.findAll()
        //     .then(product => {
        //         res.render('products', {product})
        //     })
        //     .catch(err => console.log(err)) 

    },
    productdetail: (req, res) => {
        //Renderiza el detalle de un producto por get
        let product = products.find(req.params.id);
        res.render('productDetail', {product});
                // /*SEQUELIZE*/
        // let id = req.params.id
        // db.Product.findOne( where: { id } )
        //     .then(product => {
        //         res.render('productDetail', {product})
        //     })
        //     .catch(err => console.log(err)) 
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
        //Crea producto por post
        let errors = validationResult(req);
        // Me fijo si no hay errores
        if (errors.isEmpty()) {
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
        return res.render('products', { allProducts });
    }  
    else {
        return res.render('publish', { errors: errors.mapped(), old: req.body }); 
    }
        // let errors = validationResult(req);
        /* Si no hay errores: creo el producto con el request del body */ 
            // if (errors.isEmpty()) {
            // const { name, description, price, categorie, quantity, image, brand} = req.body;
            // };
            // let { original, piecenumber, carBrand, carModel, carYear };
            // const arrayOpt = [original, piecenumber, carBrand, carModel, carYear];
            // Consulto por los datos que son opcionales, si están cargados los llevamos, si no los dejamos en null
            // for ( let i = 0 ; i < arrayOpt.lenght ; i++ ) {
            //     if ( req.body.arrayOpt[i] != "") {
            //         arrayOpt[i] = req.body.arrayOpt[i]
            //     } else { arrayOpt[i] = null } 
            //}
            // db.Product.create({
            //     name,
            //     description,
            //     price,
            //     categorie,
            //     image: req.filename,
            //     brand,
            //     original,
            //     piecenumber,
            //     carBrand,
            //     carModel,
            //     carYear
            //     })
            //     .then( () => { res.redirect('/products') } )
            //     .catch(error => res.render('publish', { errors: errors.mapped(), old: req.body });)
    },
    edit: (req, res) => {
        let product = products.find(req.params.id);
        res.render('productEdit', {product}); 
        // // SEQUELIEZE
        // db.Product.findByPk(req.params.id)
        //     .then( product => res.render('productEdit', {product}))
        //     .catch( err => console.log(err));
    },
    update: (req, res) => {
        let product = req.body;
        product.id = Number(req.params.id);
    // Si viene una imagen nueva la guardo
        if (req.file) {
            product.image = req.file.filename;
        // Si no viene una imagen nueva, busco en base la que ya había
        } else {
            oldProduct = products.find(req.params.id);
            product.image = oldProduct.image;
        }
        products.update(product);
        return res.redirect('productDetail');

        // SEQUELIZE
            // const old = await Product.findByPk(req.params.id)
            // let { name, description, price, categorie, quantity, brand, original, piecenumber, carBrand, carModel, carYear };
            // let arrayData = [name, description, price, categorie, quantity, brand, original, piecenumber, carBrand, carModel, carYear];
            // for ( let i = 0 ; i < arrayData.lenght ; i++ ) {
            //     if ( req.body.arrayData[i] != old.arrayData[i]) {
            //         arrayData[i] = req.body.arrayData[i]
            //     } else { arrayData[i] = old.arrayData[i] }
            // }
            // db.Product.update({
            // name,
            // description,
            // price,
            // categorie,
            // quantity,
            // brand, 
            // original,
            // piecenumber,
            // carBrand,
            // carModel,
            // carYear,
            // image: req.file ? req.file.filename : old.image
            // },
            // { where: { id: req.params.id } }
            // )
            // .then( () => res.redirect('productDetail') )

    } 
    //,
    // delete: (req, res) => {
        // Product.destroy({
        //     where: { id: req.params.id } } )
        //     .then(() => { res.redirect('/products') } )
        //     .catch(error => console.log(error)});
}