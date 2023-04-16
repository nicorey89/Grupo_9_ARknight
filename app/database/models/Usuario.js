module.exports = (sequelize, dataTypes) => {
    const alias = "Usuario";

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
        apellido: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        rol_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        pasword: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        avatar_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        telefono: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        codigo_postal: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        provincia_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        localidad: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
    }

    const config = {
        tableName: "usuarios",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }

    const USUARIO = sequelize.define(alias, cols, config);

    USUARIO.associate = (models) => {
        USUARIO.hasMany(models.Provincia, {
            as: "provincias",
            foreignKey: "provincia_id"
        });
        
        USUARIO.belongsTo(models.Avatar, {
            as: "avatar",
            foreignKey: "avatar_id",
        });
        USUARIO.belongsTo(models.Rol, {
            as: "rol",
            foreignKey: "rol_id",
        });
    }

    return USUARIO;
}