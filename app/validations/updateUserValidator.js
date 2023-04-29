const { check } = require("express-validator");

module.exports = [
    check("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

    check("apellido")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),


]