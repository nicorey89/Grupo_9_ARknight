const { Producto, Sequelize, } = require ('../database/models');
const {Op} = Sequelize;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    Producto.findAll({
        include: [{association: "imagen"}]
    })
    .then(products => {
        return res.render("index", {
            sliderTitle: "Productos en oferta",
            sliderProducts: products,
            session: req.session
        })
    })
    .catch(error => console.log(error));
  },
  pDetail:(req, res)=>{    
    let productId = req.params.id;

    const PRODUCT_PROMISE = Producto.findByPk(productId, {
      include: [{ association: "imagen" }],
    });

    const ALL_PRODUCTS_PROMISE = Producto.findAll({
      where: {
        descuento: {
          [Op.gte]: 10,
        },
      },
      include: [{ association: "imagen" }],
    });

    Promise.all([PRODUCT_PROMISE, ALL_PRODUCTS_PROMISE])
      .then(([producto, sliderProducts]) => {
        res.render("products/productDetail", {
          sliderTitle: "Productos en oferta",
          sliderProducts,
          producto,
          toThousand,
          session: req.session,
        });
      })
      .catch((error) => console.log(error));
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
      Producto.findAll({include: [{ association: "imagen" }]})
      .then((productos) => {
        res.render('products/productCard', {
            products : productos,
            sliderTitle: "PRODUCTOS EN OFERTAS",
            sliderProducts: productos,
            session:req.session,
            toThousand
        })
      })
      }
    }
      


module.exports = controller;
