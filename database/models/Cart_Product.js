module.exports = (sequelize, dataTypes) => {
    const alias = "cart_product"
    const columns = {
      cart: {
        type: dataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'cart',
          key: 'id'
        }
      },
      product: {
        type: dataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'products',
          key: 'id'
        }
      }
    }
    const config = {
        tableName: 'cart_product',
        timestamps: true,
        paranoid: true,
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
          }
        ]
    }
    const Model = sequelize.define(alias, columns, config);
    Model.associate = function (models) {
      Model.belongsTo(models.cart, { as: 'carts_product', foreignKey: "cart" })
      Model.belongsTo(models.products, { as: 'cart_products', foreignKey: "products"})

    }
    return Model;
};