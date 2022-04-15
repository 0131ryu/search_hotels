"use strict";
require("dotenv").config();

const quests = {
  stayNum: Array(10)
    .fill()
    .map((v, i) => i + 1),
  childYesNo: ["네", "아니오"],
  seniorYesNo: ["네", "아니오"],
  bedType: ["싱글", "더블", "트윈"],
  stayCost: Array(200000)
    .fill()
    .map((v, i) => i + 1),
  mostType: ["근처 편의시설여부", "좋은 경치와 전망", "다중이용시설 여부"],
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
    const stayNum = parseInt(req.body.stayNum),
      childYesNo = [req.body.childYes, req.body.childNo],
      seniorYesNo = [req.body.seniorYes, req.body.seniorNo],
      bedType = [req.body.bedSingle, req.body.bedDouble, req.body.bedTwin],
      stayCost = parseInt(req.body.stayCost),
      mostType = [req.body.mostFac, req.body.mostView, req.body.mostMulti];

    if (stayNum >= 0 && stayCost >= 0) {
      if (
        quests.childYesNo[0] === childYesNo[0] ||
        quests.childYesNo[1] === childYesNo[1]
      )
        if (
          quests.seniorYesNo[0] === seniorYesNo[0] ||
          quests.seniorYesNo[1] === seniorYesNo[1]
        )
          if (
            quests.bedType[0] === bedType[0] ||
            quests.bedType[1] === bedType[1] ||
            quests.bedType[2] === bedType[2]
          )
            if (
              quests.mostType[0] === mostType[0] ||
              quests.mostType[1] === mostType[1] ||
              quests.mostType[2] === mostType[2]
            )
              return res.json({
                success: true,
              });
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
