const { check, body } = require("express-validator");

module.exports = [
    
    check("titulo")
    .notEmpty()
    .withMessage("El titulo es obligatorio"),
    
    check("modelo")
    .notEmpty()
    .withMessage("El modelo es obligatorio"),
    
    check("precio")
    .notEmpty()
    .withMessage("El precio es obligatorio"),
    
    check("descuento")
    .notEmpty()
    .withMessage("El descuento es obligatorio"),
    
    check("cuotas")
    .notEmpty()
    .withMessage("El cuotas es obligatorio"),
    
    check("descripcion")
    .notEmpty()
    .withMessage("El detalle es obligatorio"),
    
];