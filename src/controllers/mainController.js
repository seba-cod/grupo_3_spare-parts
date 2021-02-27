module.exports = {
    index: (req, res) => {
        console.log('---------shows session on index----------')
        console.log(req.session);
        console.log('---------shows session on index----------')
        res.render('index');
    },
    about: (req, res) => {
        res.render('about');
    },
    contact: (req, res) => {
        res.render('contact');
    }
};