const db = require("../../database/models");
const { STATUS_SUCCESS, STATUS_ERROR, STATUS_NOT_FOUND } = require('./status')

const productApiMethods = {
  products: (req, res) => {
    db.products
      .findAll()
      .then((products) => {
        res.json(products);
      })
      .catch((error) => {
        res.status(500).json({
          status: STATUS_ERROR,
          error,
        });
      });
  },
  productdetail: (req, res) => { // TODO FIXME: este método no esta andando si le incluyo las categorias
    const { id } = req.params;
    console.log(id)
    db.products
      .findByPk(id, 
    /*     {
        include: "categories",
      } */
      )
      .then(product => {
        if (!product) {
          return res.status(404).json({
            status: STATUS_NOT_FOUND,
          });
        }
        res.status(200).json({
          data: product,
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
  createproduct: (req, res) => { // TODO FIXME: este método no esta andando desde postman cuando envías form-data no llega la información, se agrega a la DB un nuevo ID pero llega todo null
    const body = req.body
    console.log(req.body)
    
    db.products
      .create(body)
      .then(product => {
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
  update: (req, res) => {
    const body = req.body;
    db.products
      .update(body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        db.Product.findByPk(req.params.id).then((product) => {
          res.status(201).json({
            data: product,
            status: STATUS_SUCCESS,
          });
        });
      }).catch((error) => {
        res.status(500).json({
          status: STATUS_ERROR,
          error,
        });
      });
  },
  delete: (req, res) => {
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