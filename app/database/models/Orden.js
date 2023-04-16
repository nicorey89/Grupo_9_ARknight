module.exports = (sequelize, dataTypes) => {
    const alias = "Orden";

    const cols = {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        state: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
    }

    const config = {
        tableName: "orders",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }

    const ORDEN = sequelize.define(alias, cols, config);

    ORDEN.associate = (models) => {

/*         ORDEN.belongsTo(models.User, {
            as: "usuario",
            foreignKey: "user_id",
        }); */

        ORDEN.hasMany(models.Orden_item, {
            as: "orden_items",
            foreignKey: "orden_id"
        });
    }

    return ORDEN;
}