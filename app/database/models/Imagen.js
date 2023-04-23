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
        product_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
    }

    const config = {
        tableName: "imagenes",
        timestamps: false,
    }

    const IMAGEN = sequelize.define(alias, cols, config);

   IMAGEN.associate = (models) => {
        IMAGEN.belongsTo(models.Producto, {
            as: "producto",
            foreignKey: "product_id"
        });
    }

    return IMAGEN;
}