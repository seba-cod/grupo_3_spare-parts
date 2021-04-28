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
    date_created: {
      type: dataTypes.DATEONLY,
      allowNull: true
    },
    total_price: {
      type: dataTypes.DECIMAL(12,2),
      allowNull: true
    },
    products: {
      type: dataTypes.STRING(255),
      allowNull: false
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

    Model.hasMany(models.order_item, { as: "order", foreignKey: "order" })

  }
  return Model;
};
