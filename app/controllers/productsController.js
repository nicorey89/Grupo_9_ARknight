const { Producto, Sequelize, Sucursal} = require ('../database/models');
const {Op} = Sequelize;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    const SUCURSAL = Sucursal.findAll();
    const PRODUCTO = Producto.findAll();
    Promise.all([PRODUCTO, SUCURSAL])
    .then(([product, sucursales, sliderProducts]) => {
      return res.render("products/productDetail", {
        ...product,
        toThousand,
        sliderTitle: "OFERTAS",
        sliderProducts,
        sucursales,
        session: req.session
        })
    })
    .catch(error => console.log(error))
  },
  pDetail:(req, res)=>{
    const producto = req.params.id
    const PRODUCT_PROMISE = Producto.findByPk(producto)
    const ALL_PRODUCTS_PROMISE = Producto.findAll({
      where: {
        descuento: {
          [Op.gte]: 10,
        },
      }
    });
    const SUCURSAL = Sucursal.findAll();
    Promise.all([PRODUCT_PROMISE, ALL_PRODUCTS_PROMISE, SUCURSAL])
    .then(([product, sliderProducts, sucursales]) => {
      return res.render("products/productDetail", {
        producto : product,
        toThousand,
        tittle : "Product Detail",
        sliderTitle: "PRODUCTOS EN OFERTAS",
        sliderProducts: sliderProducts,
        sucursales,
        session: req.session
    })
    })
    .catch(error => console.log(error))
    },
    /* category: (req, res) => {
      const categoryId = req.params.id;

    category.findByPk(categoryId, {
      include: [
        {
        association: 'subcategories',
        includes: {association: 'products',
      include: {association: 'images'}}
      }]
    })
    .then((category) => {
      const PRODUCTS = category.subcategories.map(
        subcategory => subcategory)
      return res.render('categories', {
        category,
        subcategories: category.subcategories,
        products: PRODUCTS.flat(),
        session: req.session
    })
    
    })
    .catch(error => console.log(error))
    }
  } */
  pCard:(req, res)=>{
    const SUCURSAL = Sucursal.findAll();
    const PRODUCTO = Producto.findAll();

    Promise.all([PRODUCTO, SUCURSAL])
      .then(([productos, sucursales]) => {
        res.render('products/productCard', {
            products : productos,
            sliderTitle: "PRODUCTOS EN OFERTAS",
            sliderProducts: productos,
            session:req.session,
            sucursales,
            toThousand
        })
      })
      }
    }
      


module.exports = controller;
