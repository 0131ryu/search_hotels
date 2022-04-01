"use strict";

// //로그인에 필요함
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const session = require("express-session");

var db;

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  "mongodb+srv://admin:abc1234@cluster0.ezoih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  function (err, client) {
    if (err) return console.log(err);

    db = client.db("Hotels");
  }
);

const users = {
  id: ["test", "me", "today"],
  pw: ["1234", "1234", "1111"],
};

const output = {
  home: (req, res) => {
    res.render("home/index.ejs");
  },
  login: (req, res) => {
    res.render("home/login.ejs");
  },
};

const process = {
  login: (req, res) => {
    const id = req.body.id,
      pw = req.body.pw;

    if (users.id.includes(id)) {
      const idx = users.id.indexOf(id);
      if (users.pw[idx] === pw) {
        return res.json({
          success: true,
        });
      }

      return res.json({
        success: false,
        msg: "로그인에 실패했습니다.",
      });
    }
  },
};
// const loginProcess = (req, res) => {
//   passport.authenticate("local", {
//     failureRedirect: "/fail", //인증 실패 시 /fail로 이동
//   }),
//     function (req, res) {
//       //성공 시
//       res.redirect("/");
//     };
// };

module.exports = {
  output,
  process,
  // loginProcess,
};
