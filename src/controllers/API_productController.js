const db = require("../../database/models");
const { STATUS_SUCCESS, STATUS_ERROR, STATUS_NOT_FOUND } = require("./status");

const productApiMethods = {
  allProducts: (req, res) => {
    const limit = 10;
    let offset = ( parseInt(req.params.offset) * limit )


/*     const page = parseInt(req.query.page)
    const limit = req.query.limit
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}
    if (endIndex < db.users.length) {
    results.next = {
      page: page + 1,
      limit: limit
    }
    }
    if(startIndex > 0) {
      results.previous = {
        page : page -1,
        limit: limit
      }
    }
    results.results = db.users.slice(startIndex,endIndex)
    res.json(results) */


    db.products
      .findAndCountAll({ limit, offset,
        include:[
        {
          model: db.categories,
          as: 'categoryId',
        }
        ]
      })
      .then((products) => {
        let count = products.count; 

        let motor = 0, interior = 0, exterior = 0, accesorios = 0;
        let product = products.rows.map(data => {
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

          return productObject
        })
        let countProductsByCategory = {
          motor,
          interior,
          exterior,
          accesorios
        }
        const productsData = {
          countProductsByCategory,
          product,
        }


        const totalPages = Math.ceil( (count/limit) );
        const pageHardCoded = (parseInt(req.params.offset)+1)

        const forNextAndLast = (pageHardCoded >= totalPages)

        const meta = {
          totalProductsInDb: count,
          totalPages,
          hasPrevious: offset != 0, 
          hasNext: !forNextAndLast, 
          isLast: forNextAndLast ,
        }
        res.status(200).json({meta, productsData});
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          status: STATUS_ERROR,
          error,
        });
      });
  },
  productByPk: (req, res) => {
    const id = req.params.id;
    db.products
    .findOne(
      { 
        where:
          {id},
        include: [
          {
            model: db.categories,
            as: 'categoryId'
          },
          {
            model: db.users,
            as: "userOwner",
          },
        ]
      })
      .then( async product => {
        console.log('esto es product: ', product)
        const productData = {
          ...product.dataValues
        }

        delete productData.createdAt,
        delete productData.updatedAt,
        delete productData.deletedAt,
        productData.image = `http://localhost:3010/images/products/${productData.image}`
        
        const category = await db.categories.findByPk(productData.category)
        const user = await db.users.findByPk(productData.user)
// modificar para obtener categoryId y userOwner
        productData.user = [user.dataValues.email]
        productData.category = [category.dataValues.name]

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
