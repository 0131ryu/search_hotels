"use strict";
const express = require("express");
const router = express.Router();

const upload = require("../../src/public/js/home/upload");
const uploadCtrl = require("./upload.ctrl");

router.get("/file/:filename", uploadCtrl.imgUpload);

router.post("/upload", upload.single("file"), uploadCtrl.imgUploadPost);

router.delete("/file/:filename", uploadCtrl.imgDelete);

module.exports = router;
