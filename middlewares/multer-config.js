const multer = require("multer");

const mymeTypes = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(" ").join("_");
    const extention = mymeTypes[file.mimetype];
    cb(null, `${name + Date.now()}.${extention}`);
  },
});

module.exports = multer({ storage }).single("image");
