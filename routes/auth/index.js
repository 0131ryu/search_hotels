const express = require("express");
const router = express.Router();
const authCtrl = require("./auth.ctrl");
const { verifyAccessToken } = require("../../src/databases/jwt");

router.post("/register", authCtrl.register);

router.post("/login", authCtrl.login);

router.post("/refresh-token", authCtrl.refreshToken);

router.delete("/logout", authCtrl.logout);

router.get("/", verifyAccessToken, authCtrl.authorization);

module.exports = router;
