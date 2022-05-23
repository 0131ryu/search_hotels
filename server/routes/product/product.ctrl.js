"use strict";
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

const process = {
  ImgUpload: (req, res) => {
    upload(req, res, (err) => {
      console.log("filePath", res.req.file.path);
      console.log("fileName", res.req.file.filename);
      if (err) {
        return res.json({ success: false, err });
      }
      return res.json({
        success: true,
        filePath: res.req.file.path,
        fileName: res.req.file.filename,
      });
    });
  },
};

module.exports = {
  process,
};
