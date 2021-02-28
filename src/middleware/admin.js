module.exports = (req, res, next) =>{
    res.locals.admin = false;
    if (req.session.user.admin == true){
        res.locals.admin = true;
    }
next();
};