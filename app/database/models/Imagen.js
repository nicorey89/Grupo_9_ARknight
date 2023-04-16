module.exports = (sequelize, dataTypes) => {
    const alias = "Imagen";

    const cols = {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        producto_id : {
            type: dataTypes.INTEGER(11),
            allowNull: false 
        }
    }

    const config = {
        tableName: "imagenes",
        timestamps: false,
    }

    const PRODUCTO_IMAGE = sequelize.define(alias, cols, config);

    PRODUCTO_IMAGE.associate = (models) => {
        PRODUCTO_IMAGE.belongsTo(models.Producto, {
            as: "producto",
            foreignKey: "producto_id"
        });
    }

    return PRODUCTO_IMAGE;
}