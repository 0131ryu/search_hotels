"use strict";
const UserStorage = require("../../models/UserStorage");
const User = require("../../models/User");
const passport = require("passport");

const content = [
  { a: "Hotel", b: "어떤 호텔을 찾으시나요?", c: "호텔" },
  { a: "Motel", b: "어떤 모텔을 찾으시나요?", c: "모텔" },
  { a: "Pension", b: "어떤 펜션을 찾으시나요?", c: "펜션" },
  { a: "Resort", b: "어떤 리조트를 찾으시나요?", c: "리조트" },
];

const output = {
  home: (req, res) => {
    res.render("home/index.ejs", { data: content });
  },
  login: (req, res) => {
    res.render("home/login.ejs");
  },
  register: (req, res) => {
    res.render("home/register.ejs");
  },
};

const process = {
  login: (req, res) => {
    const user = new User(req.body);
    const response = user.login();
    return res.json(response);
  },

  passportLogin: (req, res) => {
    passport.authenticate("local", {
      failureRedirect: "/fail", //인증 실패 시 /fail로 이동
    }),
      function (req, res) {
        //성공 시
        res.redirect("/");
      };
  },
};

module.exports = {
  output,
  process,
};
