const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/images/avatar"))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_avatar_${path.extname(file.originalname)}`)
    }
});

const maxSize = 1 * 1024 * 1024 //1MB

module.exports = multer({
    storage,
    fileFilter: (req, file, callback) => {
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)){
            req.fileValidatorError = "Solo se permiten imágenes jpg|jpeg|png"
            return callback(null, false, req.fileValidatorError)
        }
        callback(null, true)
    }, 
    limits: {
        fileSize: maxSize,
    }
});
