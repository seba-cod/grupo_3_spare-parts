const db = require("../../database/models");
const { STATUS_SUCCESS, STATUS_ERROR, STATUS_NOT_FOUND } = require("./status");

const cartApiMethod = {
    showCart : (req,res) => {
        db.cart
            .findAll({
                include:[{association : "users"}],
                include:[{association : "products"}],
                where: {user_id :req.cookies.user_id}
            })
            .then((cart) =>{
                
            })
    }
}

module.exports = cartApiMethod ;