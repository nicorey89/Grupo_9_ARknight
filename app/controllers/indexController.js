const { Producto, Sequelize, } = require ('../database/modeLs');
const {Op} = Sequelize;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller ={
    index: (req, res) => {
        Producto.findAll({
            include: [{association: "imagenes"}]
        })
        .then(producto=> {
            return res.render("index", {
                sliderTitle: "Productos en oferta",
                sliderProducts: producto,
                session: req.session
            })
        })
        .catch(error => console.log(error));
    },
    search: (req,res) => {
        const loQueBuscoElUsuario = req.query.search;

        const SEARCH_PRODUCTS_PROMISE = Producto.findAll({
            where: {
              titulo: {
                [Op.like]: loQueBuscoElUsuario,
              },
            },
            include: [{ association: "images" }],
        })
        Promise.all([SEARCH_PRODUCTS_PROMISE])
        .then(([productsResults]) => {
            res.render('products/search', {
                productsResults,
                toThousand,
                session:req.session
                })
            })

    }
    
}

module.exports = controller;