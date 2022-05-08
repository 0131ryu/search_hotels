const express = require("express");
const router = express.Router();
const authCtrl = require("./auth.ctrl");
const auth = require("../../src/public/js/auth");

router.post("/api/user/register", authCtrl.process.register);
router.post("/api/user/login", authCtrl.process.login);
router.get("/api/user/auth", auth, authCtrl.process.auth);
module.exports = router;
