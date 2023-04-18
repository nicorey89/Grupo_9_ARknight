const { Producto, Sequelize, sequelize } = require ('../database/models');
const {Op} = Sequelize;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller ={
    index: (req, res) => {
        Producto.findAll({
            include: [{association: "imagen"}]
        })
        .then(producto=> {
            return res.render("index", {
                sliderTitle: "Productos en oferta",
                sliderProducts: producto,
                products : producto,
                session: req.session,
                toThousand 
            })
        })
        .catch(error => console.log(error));
    },
    search: (req,res) => {
        const loQueBuscoElUsuario = req.query.search;

        console.log(loQueBuscoElUsuario);

        Producto.findAll({
            where: {
              titulo: {
                [Op.like]: `%${loQueBuscoElUsuario}%` ,
              },
            }
        }, {include: [{association: "imagen"}]})
        .then((loQueBuscoElUsuario) => {
           if (loQueBuscoElUsuario != 0) {
                //return res.send(loQueBuscoElUsuario);
               res.render('products/search', {
                  products : loQueBuscoElUsuario,
                  toThousand,
                  session:req.session
                   })
           }else {
            throw new Error('NO SE ENCONTRO EL PRODUCTO')
           }
            }).catch(error => console.log(error))
    }
    
}

module.exports = controller;