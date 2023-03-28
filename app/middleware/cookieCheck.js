module.exports = (req, res, next) => {
    if(req.cookies.userARKnight && !req.session.user) {
        req.session.user = req.cookies.userARKnight;
        res.locals.user = req.session.user;
    }
    next();
}