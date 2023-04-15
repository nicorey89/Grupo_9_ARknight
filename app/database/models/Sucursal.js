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
            type: dataTypes.STRING(100).UNIQUE,
            allowNull: false,
        },
        imagensuc_id: {
            type: dataTypes.INTEGER(11)
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
        provincia_id: {
            type: dataTypes.INTEGER(11)
        },
    }

    const config = {
        tableName: "sucursales",
        timestamps: false,
    }

    const SUCURSAL = sequelize.define(alias, cols, config);

    SUCURSAL.associate = (models) => {
        SUCURSAL.hasMany(models.Imagen_suc, {
            as: "imagenes_suc",
            foreignKey: "imagensuc_id"
        });
    }
    SUCURSAL.associate = (models) => {
        SUCURSAL.hasMany(models.Provincia, {
            as: "provincias",
            foreignKey: "provincia_id"
        });
    }

    return SUCURSAL;
}