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
        tittle : "Product Detail",
        sliderTitle: "PRODUCTOS EN OFERTAS",
    sliderProducts: products
        
    })
},
pCard:(req, res)=>{
  let products = readJSON('productos.json')

  
  res.render('products/productCard', {
    sliderTitle: "PRODUCTOS EN OFERTAS",
    sliderProducts: products
    
  })
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
      const productId = Number(req.params.id);

      let {
        titulo, 
        modelo, 
        precio, 
        descuento, 
        cuotas, 
        categoria,
        subCategoria,
        descripcion
        } = req.body;

	   	products.forEach(product => {
	   		if(product.id === productId) {
	   		product.titulo = titulo,
	   		product.modelo = modelo,
	   		product.precio = precio,
	   		product.descuento = descuento,
	   		product.cuotas = cuotas,
	   		product.categoria = categoria,
	   		product.subCategoria = subCategoria,
	   		product.descripcion = descripcion,
        product.imagen =  req.file ? req.file.filename : product.imagen
	   		}
	 	  });

	   	writeJSON('productos.json',products);
	   	res.redirect('/products/');

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
