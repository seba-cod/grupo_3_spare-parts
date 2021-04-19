const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    state: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    date_created: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    total_price: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true
    },
    products: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'order',
    timestamps: true,
    paranoid: true,
    // Guardaria la order para poder mostrarsela como completada al cliente
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
  });
};
