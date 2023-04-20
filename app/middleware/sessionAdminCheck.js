module.exports = (req, res, next) => {

    if(!req.session.usuario) return res.redirect("/users/login");
    if(req.session.usuario.rol !== 1 ) return res.redirect("/");
    next();
}