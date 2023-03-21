const multer = require("multer");

const MIMI_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/images");
  },
  filename: function (req, file, cb) {
    console.log("multer");
    const name = file.originalname.split(" ").join("_");
    const extension = MIMI_TYPES[file.mimetype];
    cb(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage }).single("image");
