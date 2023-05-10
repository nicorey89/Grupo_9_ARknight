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
        categoria_id: {
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

        SUB_CATEGORIA.hasMany(models.Producto, {
            as: "productos",
            foreignKey: "subCategory_id"
        });
    }
    

    return SUB_CATEGORIA;
}