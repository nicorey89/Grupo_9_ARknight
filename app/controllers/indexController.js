const { Producto, Sequelize, Sucursal, Categoria, Subcategoria} = require ('../database/models');
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
            const CATEGORIAS = Categoria.findAll();
            Promise.all([PRODUCT_OFERTAS,PRODUCTOS, SUCURSAL, CATEGORIAS])
            .then(([productosOferta, producto, sucursales, categorias])=> {
                return res.render("index", {
                    sliderTitle: "Productos en oferta",
                    sliderProducts: producto,
                    productosOferta,
                    products : producto,
                    sucursales,
                    categorias,
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
        const CATEGORIAS = Categoria.findAll();
        Promise.all([PRODUCTO, SUCURSAL, CATEGORIAS])
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
    },
    categoria: (req,res) => {
        const SUCURSALES = Sucursal.findAll();
        const CATEGORIAS = Categoria.findAll({
            include: [{association: "Subcategorias" }]
        })
        Promise.all([SUCURSALES,CATEGORIAS])
        .then(([sucursales, categorias]) => {
            const SUBCATEGORIA = categorias.map(sub_categoria => sub_categoria)
            return res.render("products/categorias",{
                sucursales,
                categorias,
                subcategoris : SUBCATEGORIA,
                session:req.session
            })
        })
        
    },
    categorias: (req,res) => {
        const SUCURSAL = Sucursal.findAll();
        const CATEGORIAS = Categoria.findAll({include: [{ association: "Subcategorias" }]});
        const SUBCATEGORIAS = Subcategoria.findAll({
          where : {
            categoria_id : req.params.id
          }});
  
        Promise.all([SUCURSAL,CATEGORIAS, SUBCATEGORIAS])
        .then(([sucursales, categorias, subcategorias]) => {
            return res.render("products/subcategorias", {
              categorias,
              subcategorias,
              sucursales,
              session: req.session
            })
          })
    },
    subcategoria: (req,res) => {
        const SUCURSAL = Sucursal.findAll();
        const CATEGORIAS = Categoria.findAll({include: [{ association: "Subcategorias" }]});
        const PRODUCTO = Producto.findAll({
            where: {
                subCategory_id: req.params.id
            }}
        )
        Promise.all([SUCURSAL,CATEGORIAS, PRODUCTO])
        .then(([sucursales, categorias, products]) => {
            return res.render("products/productsForSubcategory", {
              categorias,
              sucursales,
              products,
              toThousand,
              session: req.session
            })
          })
    },
    
}

module.exports = controller;