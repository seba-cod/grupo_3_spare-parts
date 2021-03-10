module.exports = (sequelize, dataTypes) => {
    const alias = "products"
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
        price: {
            type: dataTypes.DECIMAL,
        },
        description: {
            type: dataTypes.STRING,
        },
        quantity: {
            type: dataTypes.STRING,
        },
        brand: {
            type: dataTypes.STRING,
        },
        original: {
            type: dataTypes.STRING,
            allowNull: true,
        },
        piecenumber: {
            type: dataTypes.STRING,
            allowNull: true,
        },
        carBrand: {
            type: dataTypes.STRING,
            allowNull: true,
        },
        carModel: {
            type: dataTypes.STRING,
            allowNull: true,
        },
        carYear: {
            type: dataTypes.STRING,
            allowNull: true,
        },

    }
    const config = {
        tableName: 'products',
        timestamps: true,
        paranoid: true
    }
    const Model = sequelize.define(alias, columns, config);
    return Model;
};