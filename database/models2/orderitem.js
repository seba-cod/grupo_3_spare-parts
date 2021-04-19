const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orderitem', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    price: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'orderitem',
    timestamps: false,
    paranoid: true,
    // Guardaría los datos de un carrito borrado para en un futuro ir midiendo que tanto sube el valor de los productos
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "idx_orderitem__order",
        using: "BTREE",
        fields: [
          { name: "order" },
        ]
      },
      {
        name: "idx_orderitem__product",
        using: "BTREE",
        fields: [
          { name: "product" },
        ]
      },
    ]
  });
};
