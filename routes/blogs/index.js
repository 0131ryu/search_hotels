"use strict";
const express = require("express");
const router = express.Router();

const blogCtrl = require("./blog.ctrl");

router.get("/blogs", blogCtrl.blogsList);
router.get("/blogs/new", blogCtrl.blogsNew);

module.exports = router;
