module.exports = (sequelize, dataTypes) => {
    const alias = "Sucursal";

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
        direccion: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        altura: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        imagen_suc: {
            type: dataTypes.STRING(100)
        },
        telefono: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        celular: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        localidad: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        provincia: {
            type: dataTypes.STRING(100)
        },
    }

    const config = {
        tableName: "sucursales",
        timestamps: false,
    }

    const SUCURSAL = sequelize.define(alias, cols, config);

    return SUCURSAL;
}