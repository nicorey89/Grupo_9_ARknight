const { Producto, Sequelize, } = require ('../database/modeLs');
const {Op} = Sequelize;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    Producto.findAll({
      include: [{association: 'imagenes'}
    ]
    })
    .then(([product, sliderProducts]) => {
      return res.render("products/productDetail", {
        ...product,
        toThousand,
        sliderTitle: "OFERTAS",
        sliderProducts,
        session: req.session
        })
    })
    .catch(error => console.log(error))
  },
  pDetail:(req, res)=>{

  
    const PRODUCT_PROMISE = Producto.findByPk(productos.id, {
      include: [{association: 'imagenes'}]
    })
    const ALL_PRODUCTS_PROMISE = Product.findALL({
      where: {
        discount: {
          [Op.gte]: 10,
        },
      },
      include: [{association: 'images'}]
    });
    Promise.all([PRODUCT_PROMISE, ALL_PRODUCTS_PROMISE])
    .then(([product, sliderProducts]) => {
      return res.render("products/productDetail", {
        ...product,
        toThousand,
        tittle : "Product Detail",
        sliderTitle: "PRODUCTOS EN OFERTAS",
        sliderProducts,
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
      let products = readJSON('productos.json')
  
      
      res.render('products/productCard', {
          products,
          sliderTitle: "PRODUCTOS EN OFERTAS",
          sliderProducts: products,
          session:req.session,
          toThousand
      })
      }
    }
      


module.exports = controller;
