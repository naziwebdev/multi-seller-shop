const multer = require("multer");
const fs = require("fs");
const path = require("path");

exports.multerStorage = (destination, validFormat = /png|jpg|jpeg|webp/) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      const unique = Date.now() * Math.floor(Math.random() * 10e9);
      const ext = path.extname(file.originalname);

      cb(null, `${unique}${ext}`);
    },
  });

  const fileFilter = function (req, file, cb) {
    if (validFormat.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("file format in invalid !"));
    }
  };

  const uploader = multer({
    storage,
    limits: { fileSize: 512_000_000 },
    fileFilter,
  });

  return uploader;
};
