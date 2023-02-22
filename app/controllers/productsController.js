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
         "subcCategoria": req.body.subCategoria,
        "descripcion": req.body.descripcion,
         "imagen": req.file.filename
       }
       products.push(newProduct);
       writeJSON(products);
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

	   	writeJSON(products);
	   	res.send('Producto editado correctamente');
	   },
	destroy : (req, res ) => {
      
   
		let productId = Number(req.params.id)
		
		  products.forEach(product =>{
			if (product.id === productId){
           let productToDestroy = products.indexOf(product);
		   products.splice(productToDestroy , 1)

			}
		  })

		   writeJson(products)
	
           res.send("producto eliminado")
	}

 
   /* let productId = Number(req.params.id)
     let products = products.filter(product => product.id !== productId)

       writeJSON(products)
    
      res.redirect('/');  } */}

module.exports = controller 