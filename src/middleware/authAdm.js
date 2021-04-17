module.exports = (req, res, next) =>{
    if (req.session && req.session.user){
        console.log('-----------------------------------------',req.session.user.dataValues.admin)
        if (req.session.user.dataValues.admin == true){
            res.locals.admin = true;
            next();
        }
        else res.redirect('/');
    }
    next();
};