const fs = require('fs');
const path = require('path');
const {readJSON, writeJSON} = require('../data')

 

const productsFilePath = path.join(__dirname, '../data/productos.json');

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const writeJson = (products) => {
	fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8')
};



const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    res.render('products/products', {
      products,
      toThousand
    })
  },
  pDetail:(req, res)=>{
    //res.render('products/productDetail')
    const products = readJSON("productos.json")

    const product = products.find(product => product.id === +req.params.id) 

    

    return res.render("products/productDetail", {
        ...product,
        toThousand,
        tittle : "Product Detail"
    })

  },
  pCard:(req, res)=>{
    res.render('products/productCard')
  },
  create: (req, res) => {
  res.render("products/product-create-form")
  },
  store: (req, res) => {
      let lastId = products[products.length - 1].id

      let newProduct = {
         "id":lastId + 1,
         "titulo": req.body.titulo,
        "modelo": req.body.modelo,
         "precio": req.body.precio,
         "descuento": req.body.descuento,
         "cuotas": req.body.cuotas,
         "categoria": req.body.categoria,
         "subcCategoria": req.body.subCategoria,
        "descripcion": req.body.descripcion,
         "imagen": req.file.filename
       }
       products.push(newProduct);
       writeJson(products);
       res.redirect('/products/')
  },
  edit: (req, res) => {
	   	let productId = Number(req.params.id);

	   	let productToEdit = products.find(product => product.id === productId);

	   	res.render('products/product-edit-form', {
	   		productToEdit
	   	})
	},
	   update: (req, res) => {
	   	let productId = Number(req.params.id)

	   	products.forEach(product => {
	   		if(product.id === productId) {
	   		product.name = req.body.name,
	   		product.price = req.body.price,
	   		product.discount = req.body.discount,
	   		product.category = req.body.category,
	   		product.description = req.body.description
	   		}
	 	  });

	   	writeJson(products);
	   	res.send('Producto editado correctamente');
	   },
	destroy : (req, res ) => {
		
		let productId = Number(req.params.id)

		let products = products.filter(product => product.id != productId)

		writeJson(products)
    res.redirect('/');
  },
  registro : (req, res) => {
     res.send('llegue')
  }
}
module.exports = controller;