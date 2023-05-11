const { Producto, Sequelize, Usuario, Categoria, Subcategoria, Sucursal} = require ('../database/models');
const fs = require('fs')
const { validationResult } = require("express-validator")

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index:(req, res)=>{
      const CATEGORIAS = Categoria.findAll();
      const SUCURSAL = Sucursal.findAll();
      Promise.all([SUCURSAL, CATEGORIAS])
      .then(([sucursales, categorias]) =>{
        return res.render('admin/admin',{
            session:req.session,
            sucursales,
            categorias
        })
      })
    },
     listar: (req,res)=>{
      const SUCURSAL = Sucursal.findAll();
      const PRODUCTO = Producto.findAll();
      const CATEGORIAS = Categoria.findAll();
      Promise.all([PRODUCTO, SUCURSAL, CATEGORIAS])
      .then(([productos, sucursales, categorias]) => {
        if(productos){
          res.render("admin/products2" , {
            products : productos,
            sucursales,
            categorias,
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
      const CATEGORIAS = Categoria.findAll();
      Promise.all([USUARIOS, SUCURSAL, CATEGORIAS])
      .then(([usuarios, sucursales, categorias]) => {
        if(usuarios){
          res.render("admin/users-admin" , {
              users : usuarios,
              sucursales,
              categorias,
              session : req.session
          })
        }else{
          throw new Error('Error aquiiii')
        }
      })
    },
    create: (req, res) => {
      const CATEGORIAS = Categoria.findAll({include: [{ association: "Subcategorias" }]});
      const SUCURSAL = Sucursal.findAll();
      const SUBCATEGORIAS = Subcategoria.findAll({
        include: [{ association: "productos" }, { association: "categoria" }],
  });
      Promise.all([SUCURSAL, CATEGORIAS, SUBCATEGORIAS])
      .then(([sucursales, categorias, subcategorias]) => {
        return res.render("admin/product-create-form", {
          sucursales,
          categorias,
          subcategorys: subcategorias,
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
            const CATEGORIAS = Categoria.findAll({include: [{ association: "Subcategorias" }]});
            const SUCURSAL = Sucursal.findAll();
            const PRODUCTO = Producto.findByPk(productId);
            const SUBCATEGORIAS = Subcategoria.findAll({
              include: [{ association: "productos" }, { association: "categoria" }],
        });
            Promise.all([PRODUCTO, SUCURSAL, CATEGORIAS, SUBCATEGORIAS])
            .then(([productToEdit, sucursales, categorias, subcategorias]) =>{
              res.render('admin/product-edit-form', {
                  productToEdit,
                  sucursales,
                  categorias,
                  subcategorys: subcategorias,
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
              subCategory_id: subCategoria,
              descripcion: descripcion,
              imagen : req.file ? req.file.filename : "default-image.png",
             },{
              where:{
                id: req.params.id
              }
             })
            .then((producto) => {
                if(producto){
                  if (req.file-length === 0) {
                    return res.redirect("/admin/products");
                  } else {
                    const MATCH = fs.existsSync(`../public/images/products/${req.file.filename}`)
                    if (MATCH) {
                      try {
                        fs.unlinkSync(`../public/images/products/${req.file.filename}`)
                      } catch (error) {
                        console.log(error)
                        throw new Error(error)                      
                      }
                    }else{
                      return console.log('No se encontro')
                    }
                  }
                }
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
