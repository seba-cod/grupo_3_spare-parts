module.export = (sequelize, DataTypes) => {

    let alias = "Usuarios"
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: DataTypes.STRING
        }

        
    };
    let config = {
        //tableName: "users",
        timestamps: false
    }



    const Usuario = sequelize.define(alias,col,config);
    
    
    
    
    return Usuario

}