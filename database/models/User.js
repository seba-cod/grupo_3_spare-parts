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
            unique,
            allowNull = false,
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.email
        },
        address: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.password
        },
        avatar: {
            type: DataTypes.STRING
        },
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
    return Model;
}