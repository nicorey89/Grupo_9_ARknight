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
        rol: {
            type: dataTypes.INTEGER(11),
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        avatar: {
            type: dataTypes.STRING(100),
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
        provincia: {
            type: dataTypes.STRING(100),
        },
        localidad: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        direccion: {
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


    return USUARIO;
}