const fs = require('fs');
const path = require('path');

const { readJSON, writeJSON } = require('../data')

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const controller = {

    login:(req, res)=>{
          res.render('users/login')
    },
    register:(req, res)=>{
          res.render('users/register')
    },
    crear: (req, res) => {
        let lastId = users[users.length - 1].id
        let newUser = {
            id: lastId + 1,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
            }
            users.push(newUser);
            writeJson(users);
            res.redirect("/users/login");
    },
    pAdmit:(req,res)=>{
          //res.render('products/productDetail')
     const products = readJSON("productos.json") 

     //const product = products.find(product => product.id === +req.params.id) 
 
     let productId = req.params.id
     let product = products.find(product => product.id == productId)
     
 
     return res.render("users/adminProducts", {
         product,
         toThousand,
         tittle : "administracion de productos"
       
    })}
}


module.exports = controller