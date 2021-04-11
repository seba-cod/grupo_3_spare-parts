module.exports = (sequelize, DataTypes) => {
    const alias = "products"
    const columns = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING(25),
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL,
        },
        description: {
            type: DataTypes.STRING,
        },
        quantity: {
            type: DataTypes.STRING,
        },
        brand: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        original: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        piecenumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        carBrand: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        carModel: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        carYear: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        category_id: {
            type: DataTypes.INTEGER,
        }

    }
    const config = {
        tableName: 'products',
        timestamps: true,
        paranoid: true
    }
    const Model = sequelize.define(alias, columns, config);
    Model.associate = function (models) {
        Model.belongsTo(models.categories, { as: 'category', foreingKey: 'category_id'})
    }  // models => todos los modelos. ; *models.categories* => el alias de la que queremos relacionar
    return Model;
};