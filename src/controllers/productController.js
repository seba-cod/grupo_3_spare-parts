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
  productsByCategory: (req, res) => {
    db.products
      .findAll ({
        include: [{
          model: db.categories,
          as: 'categoryId',
          where: {
            id: req.params.category
          }
      }]})
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

    let filename = "";
    const { name, description, price, quantity, brand, original, piecenumber, carBrand, carModel, carYear } = req.body;

    db.products
      .create(
        {
          name,
          price,
          description,
          quantity,
          brand,
          original: parseInt(original),
          piecenumber,
          carBrand,
          carModel,
          carYear,
          image: req.file ? req.file.filename : filename,
          category: parseInt(req.body.categorie),
          user: req.session.user.id,
        }
        // la categoria y el usuario estan hardcodeados, si incluyo las asociaciones como abajo y las intento setear, el navegador me devuelve {} y no se crea el producto
        // ,
        // {
        //   include: [
        //     {
        //       association: "categories",
        //       as: "categoryId",
        //     },
        //     {
        //       association: "users",
        //       as: "products",
        //     },
        //   ],
        // }
      )
      .then(async () => {
        // const productCategorie = await db.categories.findByPk(category);
        // const productOwner = await db.users.findByPk(owner);
        // await products.setCategory(productCategorie);
        // await products.setUser(productOwner)
        res.redirect("/product/all");
      })
      .catch((err) => {
        res.send(err);
      });
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

    const id = req.params.id;
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
      categorie,
    } = req.body;
    let image = req.file;
    console.log("req.file: ", image);
    db.products
      .findByPk(id)
      .then((old) => {
        console.log("esto es old: ", old);

        db.products
          .update(
            {
              name,
              price,
              description,
              quantity,
              brand,
              original: parseInt(original),
              piecenumber,
              carBrand,
              carModel,
              carYear,
              image: image ? req.file.filename : old.image,
              categoryId: parseInt(categorie),
            },
            {
              where: { id },
            }
          )
          .then(() => res.redirect("/product/detail/" + req.params.id));
      })
      .catch((err) => {
        return res.render("productEdit", {
          errors: errors.mapped(),
          old: req.body,
        });
      });
  },
  deleteProduct: (req, res) => {
    db.products
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        res.redirect("/product/all");
      })
      .catch((error) => console.log(error));
  }
};
