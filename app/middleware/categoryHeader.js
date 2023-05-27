const { Categoria } = require('../database/models')
module.exports = (req, res, next) => {
    if (!res.locals.categorias) {
        Categoria.findAll({
            include: [{ association: "Subcategorias" }]
        })
        .then(categorias => {
            console.log(categorias);
            res.locals.categorias = categorias
            next()
        })
    }
}