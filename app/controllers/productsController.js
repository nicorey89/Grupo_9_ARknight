const { readJSON, writeJSON } = require('../data')


const products = readJSON('productos.json');


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    res.render('products/products', {
      products,
      toThousand,
      session:req.session
    })
  },
  pDetail:(req, res)=>{

    let productId = req.params.id
    let product = products.find(product => product.id == productId)
    

    return res.render("products/productDetail", {
        ...product,
        toThousand,
        tittle : "Product Detail",
        sliderTitle: "PRODUCTOS EN OFERTAS",
        sliderProducts: products,
        session:req.session
        
    })
    },
    pCard:(req, res)=>{
      let products = readJSON('productos.json')
  
      
      res.render('products/productCard', {
          products,
          sliderTitle: "PRODUCTOS EN OFERTAS",
          sliderProducts: products,
          session:req.session,
          toThousand
      })
      },
      

}
module.exports = controller;
