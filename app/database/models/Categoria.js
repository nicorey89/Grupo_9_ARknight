module.exports = (sequelize, dataTypes) => {
    const alias = "Categoria";

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
        banner: {
            type: dataTypes.STRING(100)
        },
    }

    const config = {
        tableName: "categorias",
        timestamps: false,
    }

    const CATEGORIA = sequelize.define(alias, cols, config);

    CATEGORIA.associate = (models) => {
        CATEGORIA.hasMany(models.Subcategoria, {
            as: "Subcategorias",
            foreignKey: "categoria_id"
        });
    }

    return CATEGORIA;
}