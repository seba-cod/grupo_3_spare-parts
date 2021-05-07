const db = require("../../database/models");
const { STATUS_SUCCESS, STATUS_ERROR, STATUS_NOT_FOUND } = require("./status");

const categoryApiMethods = {
     
    paginatedCategories: (req, res) => {
        const limit = 2;
        let offset = ( parseInt(req.params.offset) * limit )
        db.categories
          .findAndCountAll({limit, offset})
          .then((categories) => {
            const count = categories.count;
            const categoriesData = categories.rows.map(data => {
              let categoriesObject = {
                id: data.id,
                name: data.name,
                created: data.createdAt,
                detail: `http://localhost:3010/admin/detail/${data.id}`
              }
              return categoriesObject
            })
    
            const totalPages = Math.ceil( (count/limit) );
            const pageHardCoded = (parseInt(req.params.offset)+1)
            const forNextAndLast = (pageHardCoded >= totalPages)
            const currentPage = (offset/10 + 1)
            const meta = {
              totalCategoriesInDb: count,
              totalPages,
              currentPage,
              hasPrevious: offset != 0, 
              hasNext: !forNextAndLast, 
              isLast: forNextAndLast ,
            }
            res.status(200).json({meta, categoriesData});
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