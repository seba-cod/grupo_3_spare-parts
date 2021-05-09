const db = require("../../database/models");
const { STATUS_SUCCESS, STATUS_ERROR, STATUS_NOT_FOUND } = require("./status");

const categoryApiMethods = {
     
  categoryProducts: (req,res) =>{ 
      db.categories.findAll()
      .then((category) => {
        res.status(200).json({
          data:category,
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
      categoryByPk: (req, res) => {
        db.categories
          .findByPk(req.params.id)
          .then((category) => {
            const categoryData = {
              ...category.dataValues
            }
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


      


    
}
module.exports = categoryApiMethods;