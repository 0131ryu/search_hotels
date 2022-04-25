"use strict";
const express = require("express");
const router = express.Router();

const blogCtrl = require("./blog.ctrl");

router.get("/blogs", blogCtrl.blogsList);
router.get("/blogs/new", blogCtrl.blogsNew);
router.get("/:slug", blogCtrl.slugFind);
router.post("/blogs", upload.single("image"), blogCtrl.uploadImage);

module.exports = router;
