module.exports = (sequelize, DataTypes) => {
    const alias = "products"
    const columns = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
            },
            name: {
            type: dataTypes.STRING,
            allowNull: true
            },
            price: {
            type: dataTypes.DECIMAL,
            },
            image: {
            type: dataTypes.STRING(200),
            },
            offer: {
            type: dataTypes.BOOLEAN
            }
        }
    const config = {
        tableName: ‘products’,
        timestamps: true,
        paranoid: true
        }
    const Model = sequelize.define(alias, columns, config);
    return Model;
}