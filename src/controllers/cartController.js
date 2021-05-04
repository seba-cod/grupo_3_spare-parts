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
        let carts = [];

        // Acá cart me devuelve un array de carros que contienen todas las opciones
        // De esta forma obtengo un array de objetos con cada carro, dentro de la propiedad cartProduct, y de users, tengo los productos y usuarios respectivamente, que poseen dataValues (la info que me interesa) 
          cart.forEach(eachCart => { 
          products.push(eachCart.cartProduct.dataValues)
          users.push(eachCart.users.dataValues)
          carts.push(eachCart.dataValues.id)
         } )

         let total_price = 0;
         for (let i = 0 ; i<products.length ; i ++ ) {
          total_price += parseInt(products[i].price)
        }
        return res.render('cart', {products, users, total_price, carts})
    }).catch( err => console.error(err));
  },
  addToCart: (req, res) => { // pegarle con JS desde el front y e.preventDefault
    const product = req.params.id;
    return (
      db.cart.create({
        user: req.session.user.id,
        product: product
      }).then( () => res.redirect('/product/all') )
      .catch(err => console.log(err))
    )
  },
  removeFromCart: async (req,res) => {
    const id = req.params.id
    try{
      const destroyCart = await db.cart.destroy({where: {id} })
      res.redirect('/cart/show')
    } catch (err) {
      console.error(err)
    }
  },
  checkout: async (req, res) => {
    const user = req.session.user.id;
    try {

      const currentCart = await db.cart.findAll({include:[
        { model: db.products, as: 'cartProduct', },
      ]})
      let products = []
      let totalPayment = []
      
      currentCart.forEach(eachCart => { 
        products.push(eachCart.cartProduct.dataValues.id)
        totalPayment.push(eachCart.cartProduct.dataValues.price)
       } )

      arrayOfTotalCost = []
      totalPayment.forEach(priceOfAnObject => arrayOfTotalCost.push(parseInt(priceOfAnObject)))
      let total_price = 0;
      arrayOfTotalCost.forEach(individualCostOfEachProduct => {
        total_price += individualCostOfEachProduct;
      })
      
      const newOrder = await db.order.create({
        state: 'complete',
        total_price,
        user,
        products 
      }, {
        include:[ { model: db.products, as: 'orderProducts', } ] 
      } )
  
      const destroyCart = await db.cart.destroy({where: {user}})

      res.redirect("/user/profile");
    }
    catch(err) { 
      console.error(err)
    } 
  }
};