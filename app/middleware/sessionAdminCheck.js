module.exports = (req, res, next) => {
    console.log(req.session.user);
    if(!req.session.user) return res.redirect("/users/login");
    if(req.session.user.rol !== "ADMIN") return res.redirect("/");
    next();
}