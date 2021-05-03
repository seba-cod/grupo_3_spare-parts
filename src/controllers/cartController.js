// Solicito mi DB (MySQL)
const db = require("../../database/models");
// Encriptado de contraseña
//Validaciones
const { validationResult } = require("express-validator");

module.exports = {
  showCart: (req, res) => {
    db.cart.findAll({
      include:[
        {
          model: db.products,
          as: 'cartProduct',
        },
        {
          model: db.users,
          as: 'users'
        }
      ]
    }).then( cart => {

        let products = [];
        let users = [];

        // Acá cart me devuelve un array de carros que contienen todas las opciones
        // De esta forma obtengo un array de objetos con cada carro, dentro de la propiedad cartProduct, y de users, tengo los productos y usuarios respectivamente, que poseen dataValues (la info que me interesa) 

        cart.forEach(eachCart => { 
          products.push(eachCart.cartProduct.dataValues)
          users.push(eachCart.users.dataValues)
         } )

         let total_price = 0;
         for (let i = 0 ; i<products.length ; i ++ ) {
          total_price += parseInt(products[i].price)
        }

        return res.render('cart', {products, users, total_price})
    }).catch( err => console.error(err));
  },
  addToCart: (req, res) => {
    const product = req.params.id;
    return (
      db.cart.create({
        user: req.session.user.id,
        product: product
      }).then(res => console.log('####This is the promise of addToCart method on product controller, productId: ', product)).catch(err => console.log(err))
    )
  },
  removeFromCart: (req,res) => {
      db.cart
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        res.redirect("/cart/showcart");
      })
      .catch((error) => console.log(error));
  },
  checkout: (req, res) => {
    db.cart.destroy({
      where: {
        user: req.session.user.id
      }
    }).then( res => {
      console.log(res)
      //como le envio los productos? hay una forma más eficiente de obtener el costo total?
        db.order.create({
          state: 'complete',
          total_price: req.body.total_price,
          user: req.session.user.id,
          products: req.body.products 
        }, {
          include:[
            {
              model: db.products,
              as: 'orderProducts',
            }
          ] }
          )
          .then(() => {
            res.redirect("/cart/showcart");
          });
    }).catch(err => console.error(err))
  }
};