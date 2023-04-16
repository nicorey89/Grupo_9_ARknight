module.exports = (sequelize, dataTypes) => {
    const alias = "Rol";

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
        tableName: "roles",
        timestamps: false,
    }

    const ROL = sequelize.define(alias, cols, config);

    ROL.associate = (models) => {
        ROL.hasMany(models.Usuario, {
            as: "usuarios",
            foreignKey: "rol_id"
        });
    }
    return ROL;
}