const db = require("../../database/models");
const { STATUS_SUCCESS, STATUS_ERROR, STATUS_NOT_FOUND } = require("./status");

const productApiMethods = {
  paginatedProducts: (req, res) => {
    const limit = 10;
    let offset = parseInt(req.params.offset) * limit;
    db.products
      .findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: db.categories,
            as: "categoryId",
          },
        ],
      })
      .then((products) => {
        let count = products.count;

        let motor = 0,
          interior = 0,
          exterior = 0,
          accesorios = 0;
        let product = products.rows.map((data) => {
          let productObject = {
            id: data.id,
            name: data.name,
            description: data.description,
            category: [data.categoryId.dataValues.name],
            detail: `http://localhost:3010/product/detail/${data.id}`,
          };
          switch (data.categoryId.dataValues.name) {
            case "Motor":
              motor += 1;
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

          return productObject;
        });
        let countProductsByCategory = {
          motor,
          interior,
          exterior,
          accesorios,
        };
        const productsData = {
          countProductsByCategory,
          product,
        };
        const totalPages = Math.ceil(count / limit);
        const pageHardCoded = parseInt(req.params.offset) + 1;
        const forNextAndLast = pageHardCoded >= totalPages;
        const currentPage = offset / 10 + 1;
        const meta = {
          totalProductsInDb: count,
          totalPages,
          currentPage,
          hasPrevious: offset != 0,
          hasNext: !forNextAndLast,
          isLast: forNextAndLast,
        };
        res.status(200).json({ meta, productsData });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          status: STATUS_ERROR,
          error,
        });
      });
  },
  productByPk: (req, res) => {
    const id = req.params.id;
    db.products
      .findOne({
        where: { id },
        include: [
          {
            model: db.categories,
            as: "categoryId",
          },
          {
            model: db.users,
            as: "userOwner",
          },
        ],
      })
      .then(async (product) => {
        console.log("esto es product: ", product);
        const productData = {
          ...product.dataValues,
        };

        delete productData.category,
          delete productData.user,
          delete productData.createdAt,
          delete productData.updatedAt,
          delete productData.deletedAt,
          delete productData.categoryId.dataValues.createdAt,
          delete productData.categoryId.dataValues.updatedAt,
          delete productData.categoryId.dataValues.deletedAt,
          delete productData.userOwner.dataValues.address,
          delete productData.userOwner.dataValues.first_name,
          delete productData.userOwner.dataValues.last_name,
          delete productData.userOwner.dataValues.admin,
          delete productData.userOwner.dataValues.password,
          delete productData.userOwner.dataValues.createdAt,
          delete productData.userOwner.dataValues.updatedAt,
          delete productData.userOwner.dataValues.deletedAt,
          (productData.userOwner.dataValues.fullname =
            productData.userOwner.dataValues.first_name +
            " " +
            productData.userOwner.dataValues.last_name),
          (productData.image = `http://localhost:3010/images/products/${productData.image}`);

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
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: STATUS_ERROR,
          error,
        });
      });
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
  lastProductDB: async (req, res) => {
    db.products
    .findOne({ 
      order: [
          ['createdAt', 'DESC']
      ],
      include: [ ]
  })
  .then((product) => {
    res.status(200).json({
      data:product,
      status: STATUS_SUCCESS,
    });
  })
  .catch( err => {
      console.log(err);
      res.status(500).json(response)
  });
}
 
};

module.exports = productApiMethods;
