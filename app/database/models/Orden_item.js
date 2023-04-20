module.exports = (sequelize, dataTypes) => {
    const alias = "Orden_item";

    const cols = {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        order_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        product_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        quantity: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
    }

    const config = {
        tableName: "ordenes_items",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }

    const ORDEN_ITEM = sequelize.define(alias, cols, config);

    ORDEN_ITEM.associate = (models) => {
        
       /*  ORDER_ITEM.hasMany(models.Product, {
            as: "products",
            foreignKey: "productId",
        }); */

        ORDEN_ITEM.belongsTo(models.Orden, {
            as: "orden",
            foreignKey: "orden_id",
        })
    }

    return ORDEN_ITEM;
}