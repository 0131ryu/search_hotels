const express = require("express");
const router = express.Router();
const productCtrl = require("./product.ctrl");

router.post("/image", productCtrl.process.ImgUpload);

module.exports = router;
