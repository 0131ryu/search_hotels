const express = require("express");
const router = express.Router();
const authCtrl = require("./auth.ctrl");
const { auth } = require("../../middleware/auth/auth");

router.post("/register", authCtrl.process.register);
router.post("/login", authCtrl.process.login);
router.get("/auth", auth, authCtrl.process.auth);
router.get("/logout", auth, authCtrl.process.logout);
router.get("/home", authCtrl.process.home);

module.exports = router;
