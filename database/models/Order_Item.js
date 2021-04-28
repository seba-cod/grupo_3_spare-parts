module.exports = (sequelize, dataTypes) => {
    const alias = "order_item"
    const columns = {
      id: {
        autoIncrement: true,
        type: dataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      price: {
        type: dataTypes.STRING(255),
        allowNull: false
      },
      product: {
        type: dataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'product',
          key: 'id'
        }
      },
      orderId: {
        type: dataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'order',
          key: 'id'
        }
      }

    }
    const config = {
        tableName: 'order_item',
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
            name: "idx_order_item__orderId",
            using: "BTREE",
            fields: [
              { name: "order" },
            ]
          },
          {
            name: "idx_order_item__product",
            using: "BTREE",
            fields: [
              { name: "product" },
            ]
          },
        ]
    }
    const Model = sequelize.define(alias, columns, config);
    Model.associate = function (models) {
      
      Model.belongsTo(models.order, { as: 'orders', foreignKey: "orderId" })
      Model.belongsTo(models.products, { as: 'products', foreignKey: "product" })
      
    }
    return Model;
};
