const express = require("express");
const router = express.Router();
const authCtrl = require("./auth.ctrl");

router.post("/auth/register", authCtrl.register);

module.exports = router;
