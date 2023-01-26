const controller ={
    index: (req, res, next)=>{
       res.render('index');
    },
    login:(req, res)=>{
        res.render('login')
    },
    register:(req, res)=>{
        res.render('register')
    },
    pDetail:(req, res)=>{
        res.render('productDetail')
    },
    pCard:(req, res)=>{
        res.render('productCard')
    }
}

module.exports = controller