var DataTypes = require("sequelize").DataTypes;
var _cart_product = require("./cart_product");
var _category = require("./category");
var _order = require("./order");
var _orderitem = require("./orderitem");
var _product = require("./product");

function initModels(sequelize) {
  var cart_product = _cart_product(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var order = _order(sequelize, DataTypes);
  var orderitem = _orderitem(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);

  cart.belongsToMany(product, { as: 'product_products', through: cart_product, foreignKey: "cart", otherKey: "product" });
  product.belongsToMany(cart, { as: 'cart_carts', through: cart_product, foreignKey: "product", otherKey: "cart" });
  cart_product.belongsTo(cart, { as: "cart_cart", foreignKey: "cart"});
  cart.hasMany(cart_product, { as: "cart_products", foreignKey: "cart"});
  product.belongsTo(category, { as: "category_category", foreignKey: "category"});
  category.hasMany(product, { as: "products", foreignKey: "category"});
  orderitem.belongsTo(order, { as: "order_order", foreignKey: "order"});
  order.hasMany(orderitem, { as: "orderitems", foreignKey: "order"});
  cart_product.belongsTo(product, { as: "product_product", foreignKey: "product"});
  product.hasMany(cart_product, { as: "cart_products", foreignKey: "product"});
  orderitem.belongsTo(product, { as: "product_product", foreignKey: "product"});
  product.hasMany(orderitem, { as: "orderitems", foreignKey: "product"});
  order.belongsTo(user, { as: "user_user", foreignKey: "user"});
  user.hasMany(order, { as: "orders", foreignKey: "user"});
  product.belongsTo(user, { as: "user_user", foreignKey: "user"});
  user.hasMany(product, { as: "products", foreignKey: "user"});

  return {
    cart_product,
    category,
    order,
    orderitem,
    product,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
