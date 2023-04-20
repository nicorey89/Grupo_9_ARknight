module.exports = (req, res, next) => {
    if(req.cookies.userARKnight && !req.session.usuario) {
        req.session.usuario = req.cookies.userARKnight;
        res.locals.usuario = req.session.usuario;
    }
    next();
}