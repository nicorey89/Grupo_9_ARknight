const { readJSON, writeJSON } = require('../data')


const products = readJSON('productos.json');


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    res.render('products/products', {
      products,
      toThousand
    })
  },
  pDetail:(req, res)=>{

    let productId = req.params.id
    let product = products.find(product => product.id == productId)
    

    return res.render("products/productDetail", {
        product,
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
         "subCategoria": req.body.subCategoria,
        "descripcion": req.body.descripcion,
         "imagen": req.file ? req.file.filename : null


       }
       products.push(newProduct);
       writeJSON('productos.json',products);
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
	   	let productId = req.params.id
       console.log(productId)
	   	products.forEach(product => {
        console.log(product.id == productId)
	   		if(product.id == productId) {
	   		product.titulo = req.body.titulo,
	   		product.modelo = req.body.modelo,
	   		product.precio = req.body.precio,
	   		product.descuento = req.body.descuento,
	   		product.cuotas = req.body.cuotas,
	   		product.categoria = req.body.categoria,
	   		product.subCategoria = req.body.subCategoria,
	   		product.descripcion = req.body.descripcion
	   		}
	 	  });

	   	writeJSON('productos.json',products);
	   	res.redirect('/products/')
	   },
	destroy : (req, res ) => {
      
   
		let productId = Number(req.params.id)
		
		  products.forEach(product =>{
			if (product.id === productId){
           let productToDestroy = products.indexOf(product);
		   products.splice(productToDestroy , 1)

			}
		  })

    writeJSON('productos.json',products);
    res.redirect('/');
  }
}
module.exports = controller;
