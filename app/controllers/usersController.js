const { Usuario , Sequelize, Sucursal, Categoria, Subcategoria} = require('../database/models');
const fs = require('fs');
const path = require('path')

const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const axios = require("axios");

const controller = {
    
    login:(req, res)=>{
        const CATEGORIAS = Categoria.findAll({include: [{ association: "Subcategorias" }]});
        const SUCURSAL = Sucursal.findAll();
        Promise.all([CATEGORIAS, SUCURSAL])
        .then(([categorias, sucursales]) => {
            return res.render('users/login', {
                categorias,
                sucursales,
                session:req.session
            })

        })
    },
    register:(req, res)=>{
        const CATEGORIAS = Categoria.findAll({include: [{ association: "Subcategorias" }]});
        const SUCURSAL = Sucursal.findAll();
        Promise.all([CATEGORIAS, SUCURSAL])
        .then(([categorias, sucursales]) => {
            return res.render('users/register', {
                categorias,
                sucursales,
                session:req.session
            })

        })
    },
    crear: (req, res) => {
        let errors = validationResult(req);
        const CATEGORIAS = Categoria.findAll({include: [{ association: "Subcategorias" }]});
        const SUCURSAL = Sucursal.findAll();

        if(req.fileValidatorError){
            errors.errors.push({
              value: "",
              msg: req.fileValidatorError,
              param: "image",
              location: "file",
            });
          }

        if (errors.isEmpty()) {
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
                localidad: "",
                }

            Usuario.create(newUser)
            .then(() => {
               return res.redirect("/users/login");
            })
            .catch(error => console.log(error))
              
        } else {
            return res.render("users/register", {
                categorias: CATEGORIAS,
                sucursales: SUCURSAL,
                errors: errors.mapped(),
                session: req.session,
                old: req.body,
            })
        }
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);
        const CATEGORIAS = Categoria.findAll({include: [{ association: "Subcategorias" }]});
        const SUCURSAL = Sucursal.findAll();

        if (errors.isEmpty()) {
            Usuario.findOne({
                where: {
                    email: req.body.email,
                }
            })
            .then((usuario)  => {
                req.session.usuario = {
                    id: usuario.id,
                    name: usuario.nombre,
                    avatar: usuario.avatar,
                    rol: usuario.rol
                }

                let tiempoDeVidaCookie = new Date(Date.now() + 60000);

                if(req.body.recordar) {
                    res.cookie(
                        "userARKnight", 
                        req.session.usuario, 
                        {
                            expires: tiempoDeVidaCookie,
                            httpOnly: true
                        })
                }
    
                res.locals.usuario = req.session.usuario;
    
                res.redirect("/");
            })
            .catch(error => console.log(error))
        } else {
            return res.render("users/login", {
                categorias: CATEGORIAS,
                sucursales: SUCURSAL,
                errors: errors.mapped(),
                session: req.session
            })
        }
    },
    logout: (req, res) => {

        req.session.destroy();
        if(req.cookies.userARKnight){
            res.cookie("userARKnight", "", {maxAge: -1})
        }

        res.redirect("/");
      
    },    
    profile: async (req, res) => {
        let userInSessionId = req.session.usuario.id;
        try {
            const user = await Usuario.findByPk(userInSessionId);
            const { data } = await axios.get("https://apis.datos.gob.ar/georef/api/provincias?campos=nombre,id")
            const SUCURSAL = await Sucursal.findAll();
            const CATEGORIAS = await Categoria.findAll();
            res.render("users/userProfile", {
                usuario: user,
                provinces: data.provincias,
                sucursales: SUCURSAL,
                categorias: CATEGORIAS,
                session: req.session
            })
        } catch (error) {
            console.log(error)
        }
    },
    editProfile: async (req, res) => {
        let userInSessionId = req.session.usuario.id;
        try {
            const user = await Usuario.findByPk(userInSessionId);
            const { data } = await axios.get("https://apis.datos.gob.ar/georef/api/provincias?campos=nombre,id")
            const SUCURSAL = await Sucursal.findAll();
            const CATEGORIAS = await Categoria.findAll();
            return res.render("users/userProfileEdit", {
                usuario: user,
                provinces: data.provincias,
                sucursales: SUCURSAL,
                categorias: CATEGORIAS,
                session: req.session
            })
        } catch (error) {
            console.log(error)
        }
    },
    updateProfile: async (req, res) => {
        let errors = validationResult(req);
      

        // if(req.fileValidatorError){
        //     errors.errors.push({
        //       value: "",
        //       msg: req.fileValidatorError,
        //       param: "image",
        //       location: "file",
        //     });
        //   }

         if(errors.isEmpty()) {
            Usuario.findByPk(req.session.usuario.id)
            .then((usuario) => {
                if (req.file.filename) {
                    if (fs.existsSync(path.join(__dirname, "../public/images/avatar", usuario.avatar)
                      ) &&
                      usuario.avatar !== "default-image.png"
                    ){
                        fs.unlinkSync(path.join(__dirname, "../public/images/avatar", usuario.avatar)
                      );    
                       console.log('Se eliminOOOOOOOOOOOOOOOOOO');
                    }
                  }
           }).catch(rejects => console.log(rejects.value)) 
           
            const {
                nombre,
                apellido,
                telefono,
                direccion,
                codigo_postal,
                provincia,
                localidad,
            } = req.body

           
             Usuario.update({
                    nombre : nombre,
                    apellido : apellido,
                    telefono : telefono,
                    direccion : direccion,
                    codigo_postal : codigo_postal,
                    provincia : provincia,
                    localidad : localidad,
                    avatar : req.file ? req.file.filename : req.session.usuario.avatar
                }, {
                    where: {
                        id : req.session.usuario.id
                    }
                }
            ).then(() => {
                return res.redirect("/");
            }).catch(error => console.log(error))

        } else {
            try {
                const { data } = await axios.get("https://apis.datos.gob.ar/georef/api/provincias?campos=nombre,id");
                const CATEGORIAS = await Categoria.findAll({include: [{ association: "Subcategorias" }]});
                const SUBCATEGORIAS = await Subcategoria.findAll({
                    include: [{ association: "productos" }, { association: "categoria" }],
                  });
                const SUCURSAL = await Sucursal.findAll();
                const USUARIO =  await Usuario.findByPk(req.session.usuario.id)
                return res.render("users/userProfileEdit", {
                        provinces : data.provincias, 
                        categorias : CATEGORIAS,
                        subcategorias :SUBCATEGORIAS,
                        sucursales : SUCURSAL,
                        usuario : USUARIO,
                        session : req.session,
                        errors: errors.mapped(),
                        old: req.body
                })
            } catch (error) {
                 return console.warn(error.value);
            }
        } 
    },
}
module.exports = controller 