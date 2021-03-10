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
        tableName: 'products',
        timestamps: true,
        paranoid: true
    }
    const Model = sequelize.define(alias, columns, config);
    return Model;
};