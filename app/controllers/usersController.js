const { Usuario , Sequelize, Sucursal} = require('../database/models');

const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const axios = require("axios");

const controller = {
    
    login:(req, res)=>{
        Sucursal.findAll()
        .then((sucursales) => {
            return res.render('users/login', {
                sucursales,
                session:req.session
            })

        }
        )
    },
    register:(req, res)=>{
        Sucursal.findAll()
        .then((sucursales) => {
            return res.render('users/register', {
                sucursales,
                session:req.session
            })
        })
    },
    crear: (req, res) => {
        let errors = validationResult(req);

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
                errors: errors.mapped(),
                session: req.session,
                old: req.body,
            })
        }
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);

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
            res.render("users/userProfile", {
                usuario: user,
                provinces: data.provincias,
                sucursales: SUCURSAL,
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
            const SUCURSAL = Sucursal.findAll();
            res.render("users/userProfileEdit", {
                usuario: user,
                provinces: data.provincias,
                sucursales: SUCURSAL,
                session: req.session
            })
        } catch (error) {
            console.log(error)
        }
    },
    updateProfile: (req, res) => {
        let errors = validationResult(req);
         if(errors.isEmpty()) {

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
                    avatar : req.file ?  req.file.filename : req.session.usuario.avatar,
                }, {
                    where: {
                        id : req.session.usuario.id
                    }
                }
            ).then(() => {
                return res.redirect("/");
            }).catch(error => console.log(error))

        } else {
            const userInSessionId = req.session.usuario.id;

            Usuario.findByPk(userInSessionId)
            .then(usuario => {
                return res.render("users/userProfileEdit", {
                    usuario,
                    session: req.session,
                    errors: errors.mapped(),
                    old: req.body,
                })

            })
        } 
    },
}
module.exports = controller 