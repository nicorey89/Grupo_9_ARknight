const { Producto, Sequelize, Usuario } = require ('../database/models');

const { validationResult } = require("express-validator")

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index:(req, res)=>{
        res.render('admin/admin',{
            session:req.session
        })
    },
     listar: (req,res)=>{
      Producto.findAll({
        include: [{association: 'imagen'}]
      }).then((productos) => {
        if(productos){
          res.render("admin/products2" , {
            products : productos,
            toThousand,
            session:req.session
           })    
        }else {
          throw new Error('ERRRRRoOR Aquii!!');
        }
      });
    },
     listarUsers: (req,res)=>{
      Usuario.findAll()
      .then((usuarios) => {
        if(usuarios){
          res.render("admin/users-admin" , {
              users : usuarios,
              session : req.session
          })
        }else{
          throw new Error('Error aquiiii')
        }
      })
    },
    create: (req, res) => {
        res.render("admin/product-create-form", {
            session: req.session
        })
    },
    store: (req, res) => {
      let newUser = {
        nombre: req.body.name,
        apellido: req.body.apellido ,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12),
        avatar: req.file ? req.file.filename : "default-image.png",
        telefono: "",
        direccion: "",
        codigo_postal: "",
        provincia: "",
        localidad: ""
        }

    Usuario.create(newUser)
    
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
  },
  userUpdate: (req,res) => {
    const users = readJSON("users.json");
    let userId = Number(req.params.id)
    let {rol} = req.body;
    users.forEach(user => {
        if(user.id === userId) {
        user.rol = rol
        }
    });

    writeJSON("users.json", users );

    return res.redirect("/");

  },
  destroyUser:(req,res) => {
    const users = readJSON("users.json");
    let userId = Number(req.params.id)
    
      users.forEach(user =>{
        if (user.id === userId){
       let userToDestroy = users.indexOf(user);
       users.splice(userToDestroy , 1)

        }
      })

writeJSON('users.json',users);
res.redirect('/admin');
  }
}
