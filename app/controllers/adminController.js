const { Producto, Sequelize, Usuario, Categoria, Subcategoria } = require ('../database/models');

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
        include: [{association: "imagen"}]
    })
    .then(products => {
        return res.render('admin/products2', {
            sliderTitle: "Productos en oferta",
            sliderProducts: products,
            products,
            session: req.session,
            toThousand 
        })
    })
    .catch(error => console.log(error));
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
      const CATEGORIES_PROMISE = Categoria.findAll();
      const SUBCATEGORIES_PROMISE = Subcategoria.findAll();
  
      Promise.all([CATEGORIES_PROMISE, SUBCATEGORIES_PROMISE])
        .then(([categories, subcategories]) => {
          return res.render("admin/product-create-form", {
            session: req.session,
            categories,
            subcategories,
          });
        })
        .catch((error) => console.log(error));
    },
    store: (req, res) => {
      let errors = validationResult(req);

    if (errors.isEmpty()) {
      let { titulo, modelo, precio, cuotas, descripcion, descuento, subCategory_id } = req.body;

      let newProduct = {
        titulo,
        modelo,
        precio,
        cuotas,
        descuento,
        subCategory_id,
        descripcion,
      };

      Producto.create(newProduct)
        .then((product) => {
          if (!req.file) {
            Imagen.create({
              image: "default-image.png",
              product_id: product.id,
            }).then(() => {
              return res.redirect("/admin/products");
            });
          } else {
            Imagen.create({
              image: req.file.filename,
              product_id: product.id,
            }).then(() => {
              return res.redirect("/admin/products");
            });
          }
        })
        .catch((error) => console.log(error));
    } else {
      const CATEGORIES_PROMISE = Categoria.findAll();
      const SUBCATEGORIES_PROMISE = Subcategoria.findAll();

      Promise.all([CATEGORIES_PROMISE, SUBCATEGORIES_PROMISE])
        .then(([categories, subcategories]) => {
          return res.render("admin/product-create-form", {
            session: req.session,
            categories,
            subcategories,
            errors: errors.mapped(),
            old: req.body,
          });
        })
        .catch((error) => console.log(error));
    }
    },
    edit: (req, res) => {
      const productId = req.params.id;
      const PRODUCT_PROMISE = Producto.findByPk(productId);
      const CATEGORIES_PROMISE = Categoria.findAll();
      const SUBCATEGORIES_PROMISE = Subcategoria.findAll();
  
      Promise.all([PRODUCT_PROMISE, CATEGORIES_PROMISE, SUBCATEGORIES_PROMISE])
      .then(([productToEdit, categories, subcategories]) => {
        res.render('admin/product-edit-form', {
          categories,
          subcategories,
          productToEdit,
          session: req.session,
        });
      })
      .catch(error => console.log(error))
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
