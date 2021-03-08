module.export = (sequelize, DataTypes) => {
    let alias = "Users"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING,
            unique,
            allowNull = false
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
        bday: {
            type: DataTypes.DATE
        }
    };
    let config = {
        tableName: "users",
        timestamps: true,
        paranoid: true
    }
    const User = sequelize.define(alias, col, config);
    return User
}