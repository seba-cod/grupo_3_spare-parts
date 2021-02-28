module.exports = {
    index: (req, res) => {
        console.log(req.session);
        res.render('index');
    },
    about: (req, res) => {
        res.render('about');
    },
    contact: (req, res) => {
        res.render('contact');
    }
};