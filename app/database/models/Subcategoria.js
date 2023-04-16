module.exports = (sequelize, dataTypes) => {
    const alias = "Subcategoria";

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
        Category_id: {
            type: dataTypes.INTEGER(11)
        },
    }

    const config = {
        tableName: "sub_categorias",
        timestamps: false,
    }

    const SUB_CATEGORIA = sequelize.define(alias, cols, config);

    SUB_CATEGORIA.associate = (models) => {
        SUB_CATEGORIA.belongsTo(models.Categoria, {
            as: "categoria",
            foreignKey: "categoria_id"
        });
    }
    SUB_CATEGORIA.associate = (models) => {
        SUB_CATEGORIA.hasMany(models.Producto, {
            as: "Sub_categorias",
            foreignKey: "subCategory_id"
        });
    }

    return SUB_CATEGORIA;
}