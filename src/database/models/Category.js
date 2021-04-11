module.exports = (sequelize, dataTypes) => {
    const alias = "categories"
    const columns = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        name: {
            type: dataTypes.STRING(25),
            allowNull: true
        },
    }
    const config = {
        tableName: 'categories',
        timestamps: true,
        paranoid: true
    }
    const Model = sequelize.define(alias, columns, config);
    Model.associate = function (models) {
        Model.hasMany(models.products, { as: 'products' })
    }  // models => todos los modelos. ; *models.categories* => el alias de la que queremos relacionar
    return Model;
};