module.exports = (sequelize, dataTypes) => {
    const alias = "categories"
    const columns = {
        id: {
            autoIncrement: true,
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(25),
            allowNull: true,
            unique: "name"
        },
    }
    const config = {
        tableName: 'categories',
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
              name: "name",
              unique: true,
              using: "BTREE",
              fields: [
                { name: "name" },
              ]
            },
          ]
    }
    const Model = sequelize.define(alias, columns, config);
    Model.associate = function (models) {
        Model.hasMany(models.products, { as: 'products', foreignKey: "category" })
    }
    return Model;
};
