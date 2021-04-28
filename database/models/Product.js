module.exports = (sequelize, DataTypes) => {
    const alias = "products"
    const columns = {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        
        // Datos obligatorios al cargar un producto
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(2,2),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(600),
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        brand: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
          image: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        // Datos no obligatorios en la carga de productos
        original: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        piecenumber: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        carBrand: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        carModel: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        carYear: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        // Seleccionable y vinculante con la tabla de categorias
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'categories',
              key: 'id'
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    }

    const config = {
        tableName: 'products',
        timestamps: true,
        paranoid: true,
        indexes: [
            {
              name: "PRIMARY",
              unique: true,
              using: "BTREE",
              fields: [
                { name: "id" },
              ]
            },
            {
              name: "idx_product__categoryId",
              using: "BTREE",
              fields: [
                { name: "categoryId" },
              ]
            },
            {
              name: "idx_product__userId",
              using: "BTREE",
              fields: [
                { name: "userId" },
              ]
            }
        ]
    }

    const Model = sequelize.define(alias, columns, config);
    Model.associate = function (models) {
        Model.belongsTo(models.categories, {
            as: 'categories',
            foreingKey: 'categoryId'
        })
        Model.belongsTo(models.users, {
            as: 'user',
            foreingKey: 'userId'
        })
        
        Model.belongsToMany(models.cart, { as:'cart', through: { model: "cart_product"}, foreignKey:'products', otherKey:'cart'})

        Model.hasMany(models.cart_product, { as: 'cart_products', foreingKey:'product'})

        Model.hasMany(models.order_item, { as: 'order_items', foreingKey:'product'})

    }
    return Model;
};
