const db = require("../../database/models");
const { STATUS_SUCCESS, STATUS_ERROR, STATUS_NOT_FOUND } = require("./status");

const categoryApiMethods = {
  categoryProducts: (req, res) => {
    db.categories
      .findAll()
      .then((category) => {

        let categoryData = category.map((data) => {
          let dataObject = {
            id: data.id,
            name: data.name,
            link: `http://localhost:3010/product/cat/${data.id}`,
          }
          return dataObject
        } )

        res.status(200).json({
          data: categoryData,
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
  // Este método que uso tiene?
  categoryByPk: (req, res) => {
    db.categories
      .findByPk(req.params.id)
      .then((category) => {
        const categoryData = {
          ...category.dataValues,
        };
        // delete categoryData.createdAt,
        // delete categoryData.updatedAt,
        // delete categoryData.deletedAt,

        res.json(categoryData);
      })
      .catch((error) => {
        res.status(500).json({
          status: STATUS_ERROR,
          error,
        });
      });
  },
};
module.exports = categoryApiMethods;
