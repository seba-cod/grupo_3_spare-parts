module.exports = {
    index: (req, res) => {
        res.render('index');
    },
    login: (req,res) =>{
        res.render('login');
    },
    header: (req, res) => {
        res.render('header');
    }
    // about: (req, res) => {
    //     res.render(path.resolve('./src/views/about.ejs'));
    // },

};