module.exports = (sequelize, dataTypes) => {
  const alias = "order"
  const columns = {
    id: {
    autoIncrement: true,
    type: dataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
    },
    state: {
      type: dataTypes.STRING(255),
      allowNull: false
    },
    total_price: {
      type: dataTypes.DECIMAL(12,2),
      allowNull: true
    },
    products: {
      type: dataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    user: {
      type: dataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }

  const config = {
      tableName: 'order',
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
          name: "idx_order__user",
          using: "BTREE",
          fields: [
            { name: "user" },
          ]
        },
      ]
  }
  const Model = sequelize.define(alias, columns, config);
  Model.associate = function (models) {
    
    
    Model.belongsTo(models.users, { as: 'users', foreignKey: "user" })

    Model.belongsTo(models.products, { as: 'orderProducts', foreignKey: "products"  })

  }
  return Model;
};
