const express = require("express");
const router = express.Router();
const authCtrl = require("./auth.ctrl");

router.post("/auth/register", authCtrl.process.register);
router.post("/auth/login", authCtrl.process.login);

module.exports = router;
