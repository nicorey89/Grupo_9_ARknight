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
      Producto.findAll()
      .then((productos) => {
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
            Producto.findByPk(productId)
            .then((productToEdit) =>{
              res.render('admin/product-edit-form', {
                  productToEdit,
                  session:req.session
              })
            })
            .catch((error) => console.log(error))
    },
    update: (req, res) => {
      let errors = validationResult(req);
        if(errors.isEmpty()) {

            const {
              titulo,
              modelo,
              precio,
              descuento,
              cuotas,
              categoria,
              subCategoria,
              descripcion,
            } = req.body
            
             Producto.update({
              titulo: titulo,
              modelo: modelo,
              precio: precio,
              descuento: descuento,
              cuotas: cuotas,
              categoria: categoria,
              subCategoria: subCategoria,
              descripcion: descripcion,
              imagen : req.file ? req.file.filename : "default-image.png",
             },{
              where:{
                id: req.params.id
              }
             })
            .then(() => {
                  return res.redirect("/admin/products");
                })
            .catch(error => console.log(error))

        } else {
          let productId = req.params.id;
          Producto.findByPk(productId)
          .then((productToEdit) =>{
            res.render('admin/product-edit-form', {
                productToEdit,
                session:req.session,
                errors: errors.mapped(),
                old: req.body,
            })
          })
          .catch((error) => console.log(error))
        }
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
    let userId = Number(req.params.id)
    let {rol} = req.body;
    Usuario.update({
      rol: rol,
    },{
      where:{
        id: userId
      }
    })
    .then(() => {
      return res.redirect("/");
    })
  },
  destroyUser:(req,res) => {
    let userId = Number(req.params.id)
   Usuario.destroy({where: {
    id: userId
   }})
   .then(() => {
     res.redirect('/admin');
   })
  }
}
