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

                let tiempoDeVidaCookie = new Date(Date.now() + 60000);

                if(req.body.remember) {
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
        let userId = req.session.usuario.id;
        console.log(userId)

        if(errors.isEmpty()) {

            const {
                nombre,
                apellido,
                telefono,
                direccion,
                codigo_postal,
                provincia_id,
                localidad
            } = req.body;

            Usuario.update(
                {
                    nombre,
                    apellido,
                    telefono,
                    direccion,
                    codigo_postal,
                    provincia_id,
                    localidad
                }, {
                    where: {
                        id : userId
                    }
                }
            ).then((usuario) => {
                if(usuario){
                    req.session.usuario = usuario;
                    return res.redirect("/users/profile");
                }else {
                    throw new Error('ERRRORRRR AQUI')
                }
            })
        } else {
            const userInSessionId = req.session.usuario.id;

            Usuario.findByPk(userInSessionId)
            .then(usuario => {
                return res.render("users/userProfileEdit", {
                    usuario: usuario,
                    session: req.session,
                    errors: errors.mapped(),
                    old: req.body,
                })

            }).catch(error => console.log(error))
        }
    },
}
module.exports = controller 