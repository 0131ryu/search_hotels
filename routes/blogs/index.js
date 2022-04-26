"use strict";
const express = require("express");
const router = express.Router();

const blogCtrl = require("./blog.ctrl");

// blogs 메인
router.get("/blogs", blogCtrl.blogsList);

router.get("/blogs/new", blogCtrl.blogsNew);
router.post("/blogs/new/write", blogCtrl.NewblogPost);
router.get("/blogs/new/:slug", blogCtrl.findforSlug);
// router.get("/:slug", blogCtrl.slugFind);
// router.post("/blogs", upload.single("image"), blogCtrl.uploadImage);

module.exports = router;
