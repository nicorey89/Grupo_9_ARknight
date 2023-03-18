const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJSON=(products)=> {
	fs.writeFileSync(productsFilePath ,JSON.stringify(products),(encoding = "utf-8") ) }

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller ={
    index: (req, res)=>{
       res.render('index', {
        products,
        toThousand,
        sliderTitle: "PRODUCTOS EN OFERTAS",
        sliderProducts: products,
        session:req.session
        
       });
    },
    
}

module.exports = controller;