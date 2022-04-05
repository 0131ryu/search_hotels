"use strict";

// //로그인에 필요함
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const session = require("express-session");

const users = {
  id: ["test", "me", "today"],
  pw: ["1234", "1234", "1111"],
};

const content = [
  { a: "Hotel", b: "어떤 호텔을 찾으시나요?" },
  { a: "Motel", b: "어떤 모텔을 찾으시나요?" },
  { a: "Pension", b: "어떤 펜션을 찾으시나요?" },
  { a: "Resort", b: "어떤 리조트를 찾으시나요?" },
];

const output = {
  home: (req, res) => {
    res.render("home/index.ejs", { data: content });
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
