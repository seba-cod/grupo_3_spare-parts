module.exports = (sequelize, DataTypes) => {
    const alias = "users"
    const columns = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING,
            unique: true
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.STRING
        },
        // ¿Es administrador?
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
    };
    let config = {
        tableName: "users",
        timestamps: true,
        paranoid: true
    }
    const Model = sequelize.define(alias, columns, config);
    Model.associate = function (models) {
        Model.hasMany(models.products, { as: 'products' })
    }  // models => todos los modelos. ; *models.categories* => el alias de la que queremos relacionar
    return Model;
}