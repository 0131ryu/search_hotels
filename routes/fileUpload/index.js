"use strict";
const express = require("express");
const router = express.Router();

const upload = require("../../src/public/js/home/upload");
const uploadCtrl = require("./upload.ctrl");

router.get("/file/:filename", uploadCtrl.imgUpload);

router.post("/upload", upload.single("file"), (req, res) => {
  if (req.file === undefined) return res.send("you must select a file.");
  const imgUrl = `http://localhost:3000/file/${req.file.filename}`;
  return res.send(imgUrl);
});

router.delete("/file/:filename", uploadCtrl.imgDelete);

module.exports = router;
