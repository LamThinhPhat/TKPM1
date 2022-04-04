const multer = require('multer');
const path = require('path');

module.exports = multer({
    storage: multer.diskStorage({

        destination: function(req, file, callback) {
            callback(null, 'public/images');
          },
          filename: function (req, file, callback) {
            callback(null, Date.now()+file.originalname)
          }
    }),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".JPG"
            && ext !== ".JPEG" && ext !== ".PNG") {
            cb(new Error("File type isn't supported."), false);
            return;
        }
        cb(null, true);
    }

});