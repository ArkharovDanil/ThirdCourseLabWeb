const multer = require("multer");

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'music/');
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    }
})

const types = ['audio/mpeg'];

const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports = multer({storage, fileFilter});