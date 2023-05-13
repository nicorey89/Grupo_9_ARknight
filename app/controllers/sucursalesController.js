const {Sequelize, Sucursal, Categoria} = require ('../database/models');
const {Op} = Sequelize;

const controller = {
    index: (req,res) => {
        const sucursalID= req.params.id;
        const SUCURSALES = Sucursal.findAll();
        const SUCURSAL = Sucursal.findByPk(sucursalID);
        const CATEGORIAS = Categoria.findAll();
        Promise.all([SUCURSALES, SUCURSAL,CATEGORIAS])
        .then(([sucursales, sucursal,categorias]) => {
            return res.render("sucursales", {
                sucursales,
                sucursal,
                session: req.session,
                categorias
            })
        })
        .catch((error) => console.log(error))
    },
    detail: (req,res) => {
        const sucursalID= req.params.id;
        const SUCURSALES = Sucursal.findAll();
        const SUCURSAL = Sucursal.findByPk(sucursalID);
        const CATEGORIAS = Categoria.findAll();
        Promise.all([SUCURSALES, SUCURSAL, CATEGORIAS])
        .then(([sucursales, sucursal, categorias]) => {
            return res.render("sucursal", {
                sucursales,
                categorias,
                sucursal,
                session: req.session
            })
        })
        .catch((error) => console.log(error))
    },
}

module.exports = controller;