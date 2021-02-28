module.exports = (req, res, next) =>{
    if (req.session & req.session.user){
        if (req.session.user.admin == true){
            next();
        }
        else res.redirect('/');
    }
    next();
};