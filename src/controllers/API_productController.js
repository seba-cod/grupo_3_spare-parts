const db = require("../../database/models");
const { STATUS_SUCCESS, STATUS_ERROR, STATUS_NOT_FOUND } = require("./status");

const productApiMethods = {
  allProducts: (req, res) => {
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
  productByPk: (req, res) => {
    // TODO FIXME: este método no esta andando si le incluyo las categorias
    const { id } = req.params;
    db.products
      .findByPk(
        id
        /*     {
        include: "categories",
      } */
      )
      .then((product) => {
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
