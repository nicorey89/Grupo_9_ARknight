const { readJSON, writeJSON } = require('../data')
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");


const users = readJSON('users.json');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
        let lastId = users[users.length - 1].id
        let newUser = {
            id: lastId + 1,
            name: req.body.name,
            last_name: "",
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 12),
            avatar: req.file ? req.file.filename : "default-image.png",
            rol: "USER",
            tel: "",
            address: "",
            postal_code: "",
            province: "",
            city: ""
            }
            users.push(newUser);
            writeJSON('users.json',users);
            res.redirect("/users/login");
    },
     pAdmit:(req,res)=>{
     const products = readJSON("productos.json");
 
     let productId = req.params.id;
     let product = products.find(product => product.id == productId);
     
 
     return res.render("users/adminProducts", {
         product,
         toThousand,
         tittle : "administracion de productos",
         session: req.session
       
    })} ,


    processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            let user = users.find(user => user.email === req.body.email);

            req.session.user = {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                rol: user.rol
            }

            let tiempoDeVidaCookie = new Date(Date.now() + 600000);

            if(req.body.remember) {
                res.cookie(
                    "userARKnight", 
                    req.session.user, 
                    {
                        expires: tiempoDeVidaCookie,
                        httpOnly: true
                    })
            }

            res.locals.user = req.session.user;

            res.redirect("/");
        } else {
            return res.render("users/login", {
                errors: errors.mapped(),
                session: req.session
            })
        }
    },
    logout: (req, res) => {

        req.session.destroy();
        if(req.cookies.userAKnight){
            res.cookie("userARKnight", "", {maxAge: -1})
        }

        res.redirect("/");
      

   
    },
    profile: (req, res) => {
         let userInSessionId = req.session.user.id;

        let userInSession = users.find(user => user.id === userInSessionId); 

        res.render("users/userProfile" , {
            user: userInSession,
            session: req.session
        } )
    },
    editProfile: (req, res) => {
         let userInSessionId = req.session.user.id;

        let userInSession = users.find(user => user.id === userInSessionId); 

        res.render("users/userProfileEdit",  {
            user: userInSession,
            session: req.session
        } )
    },
    updateProfile: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()) {

            let userId = req.session.user.id;
            let user = users.find(user => user.id === userId);

            const {
                name,
                last_name,
                tel,
                address,
                postal_code,
                province,
                city
            } = req.body;

            user.name = name;
            user.last_name = last_name;
            user.tel = tel;
            user.address = address;
            user.postal_code = postal_code;
            user.province = province;
            user.city = city;
            user.avatar = req.file ? req.file.filename : user.avatar;

            writeJSON("users.json", users )

            delete user.password;

            req.session.user = user;

            return res.redirect("/users/profile");
        } else {
            const userInSessionId = req.session.user.id;
            const userInSession = users.find(user => user.id === userInSessionId);

            return res.render("users/userProfileEdit", {
                user: userInSession,
                session: req.session,
                errors: errors.mapped(),
            })
        }

        

    },
}


module.exports = controller 