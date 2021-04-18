// Solicito mi DB (MySQL)
const db = require("../../database/models");
// Encriptado de contraseña
const bcrypt = require("bcryptjs");
//Validaciones
const { validationResult } = require("express-validator");

module.exports = {
  allProducts: (req, res) => {
    db.products
      .findAll()
      .then((products) => {
        return res.render("products", { products });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  productDetail: (req, res) => {
    let id = req.params.id;
    db.products
      .findOne({
        where: {
          id,
        },
      })
      .then((product) => {
        res.render("productDetail", {
          product,
        });
      })
      .catch((err) => console.log(err));
  },
  checkout: (req, res) => {
    //Renderiza el carrito de compras
    res.render("cart");
  },
  publishForm: (req, res) => {
    //Renderiza la web de creación de producto por get
    res.render("publish");
  },
  createProduct: (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("publish", {
        errors: errors.mapped(),
        old: req.body,
      });
    }

    const { name, description, price, quantity, brand, original, piecenumber, carBrand, carModel, carYear,  categorie } = req.body;

    let filename = "";
    db.products
      .create({
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
        image: req.file ? req.file.filename : filename,
        owner: req.session.user.user_name,
        categoryId: parseInt(categorie),
      })
      .then(() => {
        res.redirect("/product/all");
      })
      .catch((err) => {
        res.send(err);
      }); /*, const cat = await findByPk(req.body.categorie); setCategories(cat)*/
  },
  editProduct: (req, res) => {
    db.products
      .findByPk(req.params.id)
      .then((product) =>
        res.render("productEdit", {
          product,
        })
      )
      .catch((err) => console.log(err));
  },
  updateProduct: (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("publish", {
        errors: errors.mapped(),
        old: req.body,
      });
    }

    let filename = "";
    const id = req.params.id;
    const { name, description, price, quantity, brand, original, piecenumber, carBrand, carModel, carYear,  categorie } = req.body;
    let image = req.file;

    db.products
      .findByPk(id)
      .then( old => { 
        if (old.image) {
          filename = old.image;
        }

        db.products
          .update({
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
            image: image ? req.file.filename : filename,
            categoryId: parseInt(categorie),
            },
          {
            where: {
            id: req.params.id,
          }
        } )
      })
      .then(() => res.redirect("/product/detail/" + req.params.id))
      .catch( err => { console.log(err) } )
  },
  deleteProduct: (req, res) => {
    db.products
      .destroy({ where: {
                    id: req.params.id, 
      } } )
        .then(() => {
          res.redirect("/product/all");
        })
        .catch((error) => console.log(error));
  },
};
