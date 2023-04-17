const { Usuario , Sequelize} = require('../database/models');

const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const controller = {
    
    login:(req, res)=>{
        res.render('users/login', {
            session:req.session
        })
    },
    register:(req, res)=>{
        res.render('users/register', {
            session:req.session
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
                provincia_id: 1,
                localidad: ""
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

                let tiempoDeVidaCookie = new Date(Date.now() + 6000000);

                if(req.body.recordar) {
                    res.cookie(
                        "ArKnight", 
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
    profile: (req, res) => {
        let userInSessionId = req.session.usuario.id;

        Usuario.findByPk(userInSessionId)
        .then((usuario) => {
            res.render("users/userProfile", {
                usuario,
                session: req.session
            })
        })
        .catch(error => console.log(error))
    },
    editProfile: (req, res) => {
         let userInSessionId = req.session.usuario.id;

         Usuario.findByPk(userInSessionId)
         
         .then(usuario => {
             res.render("users/userProfileEdit",  {
                 usuario: usuario,
                 session: req.session
             } )
         })
    },
    updateProfile: (req, res) => {
        let errors = validationResult(req);
        //console.log(errors);
        if(errors.isEmpty()) {

            const {
                nombre,
                apellido,
                telefono,
                direccion,
                codigo_postal,
                provincia,
                localidad,
                avatar,
            } = req.body
            // console.log(               
            //         req.body.nombre,
            //         req.body.apellido,
            //         req.body.telefono,
            //         req.body.direccion,
            //         req.body.codigo_postal,
            //         req.body.provincia,
            //         req.body.localidad,
            //         req.body.avatar,
            // );



             Usuario.update({
                    nombre : nombre,
                    apellido : apellido,
                    telefono : telefono,
                    direccion : direccion,
                    codigo_postal : codigo_postal,
                    provincia : provincia,
                    localidad : localidad,
                    avatar : avatar,
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