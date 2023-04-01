const {products, readJSON, writeJSON } = require('../data')

const { validationResult } = require("express-validator")

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index:(req, res)=>{
        res.render('admin/admin',{
            session:req.session
        })

    },
     listar: (req,res)=>{
        const products = readJSON("productos.json");
      res.render("admin/products2" , {
          products,
          toThousand,
          session:req.session
         
      })
     },

    pAdmit:(req,res)=>{
        const products = readJSON("productos.json");
    
        let productId = req.params.id;
        let product = products.find(product => product.id == productId);
        
    
        return res.render("admin/adminProducts", {
            ...product,
            toThousand,
            tittle : "administracion de productos",
            session:req.session
          
       })
    },
    create: (req, res) => {
        res.render("admin/product-create-form", {
            session: req.session
        })
    },
    store: (req, res) => {
        const products = readJSON("productos.json");
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
         res.redirect('/admin/')
    },





    edit: (req, res) => {
            let productId = req.params.id;
            const products = readJSON("productos.json");
            let productToEdit = products.find(product => product.id == productId);
            console.log(productToEdit);

            res.render('admin/product-edit-form', {
                productToEdit,
                session:req.session
            })
    },

    update: (req, res) => {
        const productId = Number(req.params.id);
        const products = readJSON("productos.json");
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
             res.redirect('/admin/products/');
  
    },
    destroy : (req, res ) => {
      
        const products = readJSON("productos.json");
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
