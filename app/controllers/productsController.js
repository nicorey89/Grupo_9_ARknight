const { Producto, Sequelize, Sucursal, Categoria} = require ('../database/models');
const {Op} = Sequelize;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    const SUCURSAL = Sucursal.findAll();
    const PRODUCTO = Producto.findAll();
    const CATEGORIAS = Categoria.findAll();
    Promise.all([PRODUCTO, SUCURSAL, CATEGORIAS])
    .then(([product, sucursales, sliderProducts, categorias]) => {
      return res.render("products/productDetail", {
        ...product,
        toThousand,
        sliderTitle: "OFERTAS",
        sliderProducts,
        sucursales,
        categorias,
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
    const CATEGORIAS = Categoria.findAll( {
      include: [{ association: "Subcategorias" }],
    });
    Promise.all([PRODUCT_PROMISE, ALL_PRODUCTS_PROMISE, SUCURSAL, CATEGORIAS])
    .then(([product, sliderProducts, sucursales, categorias]) => {
      return res.render("products/productDetail", {
        producto : product,
        toThousand,
        tittle : "Product Detail",
        sliderTitle: "PRODUCTOS EN OFERTAS",
        sliderProducts: sliderProducts,
        sucursales,
        categorias,
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
    const CATEGORIAS = Categoria.findAll();

    Promise.all([PRODUCTO, SUCURSAL, CATEGORIAS])
      .then(([productos, sucursales, categorias]) => {
        res.render('products/productCard', {
            products : productos,
            sliderTitle: "PRODUCTOS EN OFERTAS",
            sliderProducts: productos,
            session:req.session,
            categorias,
            sucursales,
            toThousand
        })
      })
      }
    }
      


module.exports = controller;
