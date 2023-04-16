module.exports = (sequelize, dataTypes) => {
    const alias = "Imagen_suc";

    const cols = {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: dataTypes.STRING(100)
        },
    }

    const config = {
        tableName: "imagenes_suc",
        timestamps: false,
    }

    const SUC_IMAGE = sequelize.define(alias, cols, config);

    SUC_IMAGE.associate = (models) => {
        SUC_IMAGE.belongsTo(models.Sucursal, {
            as: "sucursal",
            foreignKey: "imagensuc_id"
        });
    }

    return SUC_IMAGE;
}