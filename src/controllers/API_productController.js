const db = require("../../database/models");
const { STATUS_SUCCESS, STATUS_ERROR, STATUS_NOT_FOUND } = require("./status");

const productApiMethods = {
  allProducts: (req, res) => {
    db.products
      .findAll({
        include:[
        {
          model: db.categories,
          as: 'categoryId',
        }
        ]
      })
      .then((products) => {
        let product = [];
        let count = 0;

        let motor = 0, interior = 0, exterior = 0, accesorios = 0;
        products.forEach(data => {

          count += 1;
          let productObject = {
            id: data.id,
            name: data.name,
            description: data.description,
            category: [data.categoryId.dataValues.name],
            detail: `http://localhost:3010/product/detail/${data.id}`
          }

          switch (data.categoryId.dataValues.name) {
            case "Motor":
                motor += 1;
                console.log('SUME UNO DE MOTOR')
                break;
            case "Interior":
                interior += 1;
                break;
            case "Exterior":
                exterior += 1;
                break;
            case "Accesorios":
                accesorios += 1;
                break;
          }

          product.push(productObject)
        })
        let countByCategory = {
          motor,
          interior,
          exterior,
          accesorios
        }
        const productsData = {
          count, 
          countByCategory,
          product,
        }
        res.json(productsData);
      })
      .catch((error) => {
        res.status(500).json({
          status: STATUS_ERROR,
          error,
        });
      });
  },
  productByPk: (req, res) => {
    const { id } = req.params;
    db.products
    .findOne( { where: id }, { include:[
          {
            model: db.categories,
            as: 'categoryId',
          }
        ]
      } // TODO no está andando el findOne
      )
      .then( product => {
        console.log(product)
        const productData = {
          ...product.dataValues

        }

        delete productData.createdAt,
        delete productData.updatedAt,
        delete productData.deletedAt,
        productData.image = `http://localhost:3010/images/products/${productData.image}`
                



        if (!product) {
          return res.status(404).json({
            status: STATUS_NOT_FOUND,
          });
        }
        res.status(200).json({ productData });
      })
      .catch((error) => {
        res.status(500).json({
          status: STATUS_ERROR,
          error,
        });
      });
  },
  createProduct: (req, res) => {
    const body = req.body;
    db.products
      .create(body)
      .then((product) => {
        res.status(201).json({
          data: product,
          status: STATUS_SUCCESS,
        })
      })
      .catch((error) => {
        res.status(500).json({
          status: STATUS_ERROR,
          error,
        })
      })
  },
  updateProduct: (req, res) => {
    const body = req.body;
    db.products
      .update(body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        db.products.findByPk(req.params.id).then((product) => {
          res.status(201).json({
            data: product,
            status: STATUS_SUCCESS,
          });
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: STATUS_ERROR,
          error,
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
        res.status(200).json({
          status: STATUS_SUCCESS,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: STATUS_ERROR,
          error,
        });
      });
  },
};

module.exports = productApiMethods;
