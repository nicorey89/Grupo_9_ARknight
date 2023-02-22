const { readJSON, writeJSON } = require('../data')

const users = readJSON('users.json');

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
            writeJSON(users);
            res.redirect("/users/login");
    },
/*     pAdmit:(req,res)=>{
     const products = readJSON("productos.json");
 
     let productId = req.params.id;
     let product = products.find(product => product.id == productId);
     
 
     return res.render("users/adminProducts", {
         product,
         toThousand,
         tittle : "administracion de productos"
       
    })} */
}


module.exports = controller