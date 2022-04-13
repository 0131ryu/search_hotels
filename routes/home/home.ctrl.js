"use strict";
const UserStorage = require("../../models/UserStorage");
const User = require("../../models/User");
const Answer = require("../../models/Answer");

const answers = {
  stayNum: [1, 2, 3, 4, 5],
  childYes: "네",
  childNo: "아니오",
  mostFac: "근처 편의시설여부",
  mostView: "좋은 경치와 전망",
  mostMulti: "다중이용시설 여부",
};

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
};

const process = {
  login: (req, res) => {
    const user = new User(req.body);
    const response = user.login();
    return res.json(response);
  },
};

const test = {
  home: (req, res) => {
    res.render("home/test.ejs", { data: content });
  },
  mode: (req, res) => {
    // const answer = new Answer(req.body);
    // const response = answer.mode();
    // return res.json(response);
    const stayNum = req.body.stayNum,
      childYes = req.body.childYes,
      childNo = req.body.childNo,
      mostFac = req.body.mostFac,
      mostView = req.body.mostView,
      mostMulti = req.body.mostMulti;

    //console.log(stayNum, childYes, childNo, mostFac, mostView, mostMulti);

    //(answers.stayNum.includes(stayNum)
    // const stayNumIdx = answers.stayNum.indexOf(stayNum);
    console.log(answers.stayNum[0]);
    console.log(stayNum);

    if (parseInt(stayNum) > 0) {
      if (
        answers.stayNum[0] === parseInt(stayNum) ||
        answers.stayNum[1] === parseInt(stayNum) ||
        answers.stayNum[2] === parseInt(stayNum) ||
        answers.stayNum[3] === parseInt(stayNum) ||
        answers.stayNum[5] === parseInt(stayNum)
      ) {
        if (
          answers.childYes === childYes ||
          answers.childNo[stayNumIdx] === childNo
        ) {
          return res.json({
            success: true,
          });
        }
        if (
          answers.mostFac[stayNumIdx] === mostFac ||
          answers.mostView[stayNumIdx] === mostView ||
          answers.mostMulti[stayNumIdx] === mostMulti
        ) {
          return res.json({
            success: true,
          });
        }
      }
    }
    return res.json({
      success: false,
      msg: "입력해주신 값에 문제가 있습니다.",
    });
  },
};
module.exports = {
  output,
  process,
  test,
};
