/* const { readJSON, writeJSON } = require('../data')


const products = readJSON('productos.json'); */

 const {products,Sequelize} = require ('../database/modeLs')//, category}
 const {Op} = Sequelize;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    res.render('products/products', {
      products,
      toThousand,
      session: req.session
    })
  },
 
  pDetail:(req, res)=>{

    let productId = req.params.id
    let product = products.find(product => product.id == productId)
    
    const PRODUCT_PROMISE = Product.findByPk(product.id, {
      include: [{association: 'images'}]
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
    category: (req, res) => {
      const categoryId = req.params.id;

    category.findByPk(categoryId, {
      include: [
        {
        association: 'subcategories',
        inckudes: {association: 'products',
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
  }
    /* pCard:(req, res)=>{
      // let products = readJSON('productos.json')
  
      
      res.render('products/productCard', {
          products,
          sliderTitle: "PRODUCTOS EN OFERTAS",
          sliderProducts: products,
          session:req.session,
          toThousand
      })
      }, */
      


module.exports = controller;
