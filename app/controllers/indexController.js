const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = (products) => {
	fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8')
};

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const writejson = (users) => {
	fs.writeFileSync(usersFilePath, JSON.stringify(users), 'utf-8')
}; 


const controller ={
    index: (req, res)=>{
       res.render('index', {
        products,
        toThousand
       });
    },
    login:(req, res)=>{
        res.render('users/login')
    },
    register:(req, res)=>{
        res.render('users/register')
    },

    pAdmit:(req,res)=>{
        res.render("users/admitProducts" , {
            products
        })
    }
}

module.exports = controller;