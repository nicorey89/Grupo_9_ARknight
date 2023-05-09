const { Producto, Sequelize, Usuario, Categoria, Subcategoria, Sucursal} = require ('../database/models');

const { validationResult } = require("express-validator")

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index:(req, res)=>{
      Sucursal.findAll()
      .then((sucursales) =>{
        return res.render('admin/admin',{
            session:req.session,
            sucursales
        })
      })
    },
     listar: (req,res)=>{
      const SUCURSAL = Sucursal.findAll();
      const PRODUCTO = Producto.findAll();
      Promise.all([PRODUCTO, SUCURSAL])
      .then(([productos, sucursales]) => {
        if(productos){
          res.render("admin/products2" , {
            products : productos,
            sucursales,
            toThousand,
            session:req.session
           })    
        }else {
          throw new Error('ERRRRRoOR Aquii!!');
        }
      });
    },
     listarUsers: (req,res)=>{
      const SUCURSAL = Sucursal.findAll();
      const USUARIOS = Usuario.findAll();
      Promise.all([USUARIOS, SUCURSAL])
      .then(([usuarios, sucursales]) => {
        if(usuarios){
          res.render("admin/users-admin" , {
              users : usuarios,
              sucursales,
              session : req.session
          })
        }else{
          throw new Error('Error aquiiii')
        }
      })
    },
    create: (req, res) => {
      Sucursal.findAll()
      .then((sucursales) => {
        return res.render("admin/product-create-form", {
          sucursales,
            session: req.session
        })
      })
    },
    store: (req, res) => {
  
      let errors = validationResult(req);

      if(req.fileValidatorError){
        errors.errors.push({
          value: "",
          msg: req.fileValidatorError,
          param: "image",
          location: "file",
        });
      }
      if (!req.file) {
        errors.errors.push({
          value: "",
          msg: "El producto debe tener una imagen",
          param: "image",
          location: "file",
        });
      }
      if (errors.isEmpty()) {
        let { titulo, modelo, precio, cuotas, descripcion, descuento } = req.body;
  
        let newProduct = {
          titulo,
          modelo,
          precio,
          cuotas,
          descripcion,
          descuento,
          subCategory_id: 1,
          imagen: req.file ? req.file.filename : "default-image.png"
        };
  
        Producto.create(newProduct)
        .then(() => {
          return res.redirect("/admin/products");
        })
      } else {
        return res.render("admin/product-create-form", {
          session: req.session,
          errors: errors.mapped(),
          old: req.body,
        });
      }
    },
    edit: (req, res) => {
            let productId = req.params.id;
            const CATEGORIA = Categoria.findAll();
            const SUB_CATEGORIA = Subcategoria.findAl();
            const SUCURSAL = Sucursal.findAll();
            const PRODUCTO = Producto.findByPk(productId);
            Promise.all([PRODUCTO, SUCURSAL, CATEGORIA, SUB_CATEGORIA])
            .then(([productToEdit, sucursales, categorias, subcategorias]) =>{
              res.render('admin/product-edit-form', {
                  productToEdit,
                  sucursales,
                  categorias,
                  subcategorias,
                  session:req.session
              })
            })
            .catch((error) => console.log(error))
    },
    update: (req, res) => {
      let errors = validationResult(req);

      
      if(req.fileValidatorError){
        errors.errors.push({
          value: "",
          msg: req.fileValidatorError,
          param: "image",
          location: "file",
        });
      }
      if (!req.file) {
        errors.errors.push({
          value: "",
          msg: "El producto debe tener una imagen",
          param: "image",
          location: "file",
        });
      }

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
		  let productId = req.params.id;

      Producto.destroy({
        where: {
       id: productId
      }})
      .then(() => {
        res.redirect('/admin');
      }) 
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
