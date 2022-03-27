"use strict";
const express = require("express");
const router = express.Router();

//메인
router.get("/", function (req, res) {
  res.render("home/index.ejs");
});

//로그인
router.get("/login", function (req, res) {
  res.render("home/login.ejs");
});
module.exports = router;
