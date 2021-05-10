const db = require("../../database/models");
const { STATUS_SUCCESS, STATUS_ERROR, STATUS_NOT_FOUND } = require("./status");

const dataApi = {
    show : async (req,res) => {
        try {
            const products = await db.products.findAndCountAll({})
            const users = await db.users.findAndCountAll({})
            const orders = await db.order.findAndCountAll({})
            
            let totalGain = 0;
            orders.rows.forEach(row => {
                const orderInformation = row.dataValues.total_price;
                totalGain += Number(orderInformation);
                })
                
            let meta = {
                totalProductsInDb: products.count,
                totalUsersInDb: users.count,
                totalGain,
            }
            res.status(200).json(meta)
        }
        catch (error) { 
            res
                .status(500)
                .json({
                        status: STATUS_ERROR,
                        error
                    })
        }
    }
}

module.exports = dataApi ;