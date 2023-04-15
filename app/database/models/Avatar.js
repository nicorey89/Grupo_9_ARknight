module.exports = (sequelize, dataTypes) => {
    const alias = "Avatar";

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
    }

    const config = {
        tableName: "avatares",
        timestamps: false,
    }

    const AVATAR_IMAGE = sequelize.define(alias, cols, config);

    AVATAR_IMAGE.associate = (models) => {
        AVATAR_IMAGE.hasMany(models.Usuario, {
            as: "usuario",
            foreignKey: "avatar_id"
        });
    }

    return AVATAR_IMAGE;
}