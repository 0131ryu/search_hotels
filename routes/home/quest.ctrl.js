"use strict";
require("dotenv").config();

const quests = {
  stayNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  childYes: "네",
  childNo: "아니오",
  seniorYes: "네",
  seniorNo: "아니오",
  bedSingle: "싱글",
  bedDouble: "더블",
  bedTwin: "트윈",
  stayCost: Array(200000)
    .fill()
    .map((v, i) => i + 1),
  mostFac: "근처 편의시설여부",
  mostView: "좋은 경치와 전망",
  mostMulti: "다중이용시설 여부",
};

const output = {
  list: (req, res) => {
    Quest.find()
      .then((result) => {
        res.render("page/list.ejs", { posts: result });
      })
      .catch((err) => {
        res.send(err);
      });
  },
  quest: (req, res) => {
    res.render("home/quest.ejs");
  },
};

const process = {
  searchStay: (req, res) => {
    const stayNum = req.body.stayNum,
      childYes = req.body.childYes,
      childNo = req.body.childNo,
      seniorYes = req.body.seniorYes,
      seniorNo = req.body.seniorNo,
      bedSingle = req.body.bedSingle,
      bedDouble = req.body.bedDouble,
      bedTwin = req.body.bedTwin,
      stayCost = req.body.stayCost,
      mostFac = req.body.mostFac,
      mostView = req.body.mostView,
      mostMulti = req.body.mostMulti;

    // console.log(stayCost);
    if (parseInt(stayNum) > 0 && parseInt(stayCost) >= 0) {
      if (
        quests.stayNum[0] === parseInt(stayNum) ||
        quests.stayNum[1] === parseInt(stayNum) ||
        quests.stayNum[2] === parseInt(stayNum) ||
        quests.stayNum[3] === parseInt(stayNum) ||
        quests.stayNum[5] === parseInt(stayNum)
      ) {
        if (quests.childYes === childYes || quests.childNo === childNo) {
          return res.json({
            success: true,
          });
        }
        if (quests.seniorYes === seniorYes || quests.seniorNo === seniorNo) {
          return res.json({
            success: true,
          });
        }
        if (quests.stayCost >= 50000 && quests.stayCost <= 200000) {
          return res.json({
            success: true,
          });
        }
        if (
          quests.bedSingle === bedSingle ||
          quests.bedDouble === bedDouble ||
          quest.bedTwin === questBtn.bedTwin
        ) {
          return res.json({
            success: true,
          });
        }
        if (
          quests.mostFac[stayNumIdx] === mostFac ||
          quests.mostView[stayNumIdx] === mostView ||
          quests.mostMulti[stayNumIdx] === mostMulti
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
};
