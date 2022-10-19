const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
        var err = new Error();
        err.code = "only png,jpg & jpeg image uploaded";
        return cb(err.code);
      } else {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
      }
    },
  }),
}).single("profile_pic");

module.exports = upload;

// const path    = require('path');
// const multer  = require('multer');

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'upload/')
//     },
//     filename: function (req, file, cb) {
//         let ext = path.extname(file.originalname)
//       cb(null,Date.now() + ext)
//     }
//   })

//   var upload = multer({
//        storage: storage,
//        fileFilter: function(req, file , callback) {
//            if(file.mimetype == "image/png" ||
//            file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")
//            {
//                callback(null,true)
//            }
//            else{
//                console.log("Only jpg and png file supported!!!");
//                callback(null, false);
//            }
//        }

//        }

//     })

//     module.exports = upload
