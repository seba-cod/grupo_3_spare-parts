module.exports = (sequelize, DataTypes) => {
    const alias = "users"
    const columns = {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
          },
          user_name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: "user_name"
          },
          first_name: {
            type: DataTypes.STRING(25),
            allowNull: false
          },
          last_name: {
            type: DataTypes.STRING(30),
            allowNull: false
          },
          email: {
            type: DataTypes.STRING(255),
            allowNull: false
          },
          address: {
            type: DataTypes.STRING(255),
            allowNull: false
          },
          password: {
            type: DataTypes.STRING(255),
            allowNull: false
          },
          avatar: {
            type: DataTypes.STRING(255),
            allowNull: true
          },
          admin: {
            type: DataTypes.BOOLEAN,
            allowNull: true
          }
    };
    let config = {
        tableName: "users",
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
              name: "user_name",
              unique: true,
              using: "BTREE",
              fields: [
                { name: "user_name" },
              ]
            },
          ]
    }
    const Model = sequelize.define(alias, columns, config);
    Model.associate = function (models) {
        Model.hasMany(models.cart, { as: "carts"});
        Model.hasMany(models.order, { as: "orders"});
        Model.hasMany(models.products, { as: "products"});
    } 
    return Model;
}

