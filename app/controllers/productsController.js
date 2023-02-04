const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = (products) => {
	fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8')
};

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  pDetail:(req, res)=>{
    res.render('products/productDetail')
  },
  pCard:(req, res)=>{
    res.render('products/productCard')
  },
  create: (req, res) => {
  res.render("products/product-create-form")
  }
  // store: (req, res) => {
  //   // Do the magic

  //   let lastId = products[products.length - 1].id

  //   newProduct = {
  //     id:lastId + 1,
  //     name: req.body.name,
  //     price: req.body.price,
  //     discount: req.body.discount,
  //     category: req.body.category,
  //     description: req.body.description,
  //     image: "default-image.png"
  //   }
  //   products.push(newProduct);

  //   writeJson(products);
  //   res.redirect('/products/')
  //   },
  //   edit: (req, res) => {
	// 	// Do the magic
	// 	let productId = Number(req.params.id);

	// 	let productToEdit = products.find(product => product.id === productId);

	// 	res.render('product-edit-form', {
	// 		productToEdit
	// 	})
	// },
	// // Update - Method to update
	// update: (req, res) => {
	// 	// Do the magic
	// 	let productId = Number(req.params.id)

	// 	products.forEach(product => {
	// 		if(product.id === productId) {
	// 		product.name = req.body.name,
	// 		product.price = req.body.price,
	// 		product.discount = req.body.discount,
	// 		product.category = req.body.category,
	// 		product.description = req.body.description
	// 		}
	// 	});

	// 	writeJson(products);
	// 	res.send('Producto editado correctamente');
	// }
}


module.exports = controller;