module.exports = (sequelize, dataTypes) => {
    const alias = "Producto";

    const cols = {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        titulo: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        modelo: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        precio: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        cuotas: {
            type: dataTypes.INTEGER(11),
        },
        descuento: {
            type: dataTypes.INTEGER(11),
        },
        subCategory_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        descripcion: {
            type: dataTypes.INTEGER(11),
        },
        imagen_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
    }

    const config = {
        tableName: "productos",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }

    const PRODUCTO = sequelize.define(alias, cols, config);

    PRODUCTO.associate = (models) => {
        PRODUCTO.belongsTo(models.Subcategoria, {
            as: "subcategory",
            foreignKey: "subcategory_id",
        });
        
        PRODUCTO.hasMany(models.Imagen, {
            as: "imagenes",
            foreignKey: "imagen_id",
        });

       /*  PRODUCTO.belongsTo(models.OrderItem, {
            as: "orderItem",
            foreignKey: "productId"
        }); */
    }

    return PRODUCTO;
}