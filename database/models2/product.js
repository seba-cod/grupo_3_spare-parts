const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(2,2),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(600),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    brand: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    original: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    piecenumber: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    carbrand: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    carmodel: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    caryear: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product',
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
        name: "idx_product__category",
        using: "BTREE",
        fields: [
          { name: "category" },
        ]
      },
      {
        name: "idx_product__user",
        using: "BTREE",
        fields: [
          { name: "user" },
        ]
      },
    ]
  });
};
