const { Producto, Sequelize } = require ('../database/models');
const {Op} = Sequelize;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller ={
    index: (req, res) => {
        try {
            const PRODUCT_OFERTAS = Producto.findAll({
                where : {
                    descuento : {
                        [Op.eq]: 10
                    }
                },
                limit : 5,

            });
            const PRODUCTOS = Producto.findAll({
                limit: 5
            })
            Promise.all([PRODUCT_OFERTAS,PRODUCTOS ])
            .then(([productosOferta, producto])=> {
                return res.render("index", {
                    sliderTitle: "Productos en oferta",
                    sliderProducts: producto,
                    productosOferta,
                    products : producto,
                    session: req.session,
                    toThousand 
                })
            })
        } catch (error) {
            console.log(error)    
        }
    },
    search: (req,res) => {
        const loQueBuscoElUsuario = req.query.search;
        Producto.findAll({
            where: {
              titulo: {
                [Op.like]: `%${loQueBuscoElUsuario}%`
              }
            }}
        )
        .then((producto) => {
           if (producto) {
               return res.render('products/search', {
                  products : producto,
                  toThousand,
                  session:req.session
                   })
           }else {
            throw new Error('NO SE ENCONTRO EL PRODUCTO')
           }})
    }
    
}

module.exports = controller;