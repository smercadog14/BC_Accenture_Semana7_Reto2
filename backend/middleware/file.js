const multer = require("multer");
const moment = require("moment");
const directory = "./uploads/";
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, directory);
  },
  filename: (req, file, cb) => {
    filename = moment().unix() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!req.body.name || !req.body.description) file = "";
    if (file == "") return cb(null, false);
    else cb(null, true);
  },
});

module.exports = upload;
