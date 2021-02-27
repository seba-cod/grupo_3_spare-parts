const multer = require('multer');
const storage = multer.diskStorage ({
    destination: (req,file, cb) => {
        cb(null, './public/images/avatars')
    },
    filename: (req, file,cb) => {
        let fileName = 'user-' + Date.now() + path.extname(file.originalname)
        cb(null, fileName)
    }
});
const upload = multer ({ storage });
module.exports = upload;