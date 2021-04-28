module.exports = (sequelize, dataTypes) => {
    const alias = "cart"
    const columns = {
        id: {
            autoIncrement: true,
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        user: {
          type: dataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          }
        }
    }
    const config = {
        tableName: 'cart',
        timestamps: true,
        paranoid: true,
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
            name: "idx_cart__user",
            using: "BTREE",
            fields: [
              { name: "user" },
            ]
          }
        ]
    }
    const Model = sequelize.define(alias, columns, config);
    Model.associate = function (models) {
      
      Model.belongsTo(models.products, { as: 'products', through: { model: "cart_product" }, foreignKey: "cart", otherKey: "product" })
      
      Model.belongsTo(models.users, { as: 'users', foreignKey: "user" })

      Model.hasMany(models.cart_product, { as: "cart_products", foreignKey: "cart" })

    }
    return Model;
};

