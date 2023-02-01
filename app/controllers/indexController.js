const controller ={
    index: (req, res)=>{
       res.render('index');
    },
    login:(req, res)=>{
        res.render('users/login')
    },
    register:(req, res)=>{
        res.render('users/register')
    },
    pDetail:(req, res)=>{
        res.render('products/productDetail')
    },
    pCard:(req, res)=>{
        res.render('products/productCard')
    }
}

module.exports = controller;