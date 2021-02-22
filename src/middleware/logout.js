module.exports = (req, res, next) =>{
    if (res.locals.user && req.session.user){
        res.clearCookie('rememberToken')
    }
    next();
};