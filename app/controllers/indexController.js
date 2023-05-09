const { Producto, Sequelize, Sucursal } = require ('../database/models');
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
            const SUCURSAL = Sucursal.findAll();
            Promise.all([PRODUCT_OFERTAS,PRODUCTOS, SUCURSAL])
            .then(([productosOferta, producto, sucursales])=> {
                return res.render("index", {
                    sliderTitle: "Productos en oferta",
                    sliderProducts: producto,
                    productosOferta,
                    products : producto,
                    sucursales,
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
        const SUCURSAL = Sucursal.findAll();
        const PRODUCTO = Producto.findAll({
            where: {
              titulo: {
                [Op.like]: `%${loQueBuscoElUsuario}%`
              }
            }}
        )
        Promise.all([PRODUCTO, SUCURSAL])
        .then(([producto, sucursales]) => {
           if (producto) {
               return res.render('products/search', {
                  products : producto,
                  toThousand,
                  sucursales,
                  session:req.session
                   })
           }else {
            throw new Error('NO SE ENCONTRO EL PRODUCTO')
           }})
    }
    
}

module.exports = controller;