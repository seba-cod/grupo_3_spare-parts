module.exports = (sequelize, DataTypes) => {
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
            type: dataTypes.SRING,
        },
        brand: {
            type: dataTypes.SRING,
        },
        original: {
            type: dataTypes.STRING,
            allowNull: true,
        },
        piecenumber: {
            type: dataTypes.SRING,
            allowNull: true,
        },
        carBrand: {
            type: dataTypes.SRING,
            allowNull: true,
        },
        carModel: {
            type: dataTypes.SRING,
            allowNull: true,
        },
        carYear: {
            type: dataTypes.SRING,
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