module.exports = (sequelize, dataTypes) => {
    const alias = "Provincia";

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
        tableName: "provincias",
        timestamps: false,
    }

    const PROVINCIAS = sequelize.define(alias, cols, config);

    // PROVINCIAS.associate = (models) => {
    //     PROVINCIAS.hasMany(models.Usuario, {
    //         as: "usuario",
    //         foreignKey: "provincia_id"
    //     });
    // }

    return PROVINCIAS;
}