const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cart_product', {
    cart: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cart',
        key: 'id'
      }
    },
    product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'cart_product',
    timestamps: true,
    paranoid: false, 
    // Guardaría este dato para poder sugerirle al cliente los productos relacionados, teniendo dos niveles, principalmente su navegacion y secundariamente las cosas que agrega a su carrito.
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cart" },
          { name: "product" },
        ]
      },
      {
        name: "idx_cart_product",
        using: "BTREE",
        fields: [
          { name: "product" },
        ]
      },
    ]
  });
};
