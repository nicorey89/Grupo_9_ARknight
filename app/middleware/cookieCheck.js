module.exports = (req, res, next) => {
    if(req.cookies.userAKnight && !req.session.user) {
        req.session.user = req.cookies.userAKnight;
        res.locals.user = req.session.user;
    }
    next();
}