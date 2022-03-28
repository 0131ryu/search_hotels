"use strict";
const express = require("express");
const router = express.Router();
const db = require("../../config/db");

//메인
router.get("/", function (req, res) {
  res.render("home/index.ejs");
});

//로그인
router.get("/login", function (req, res) {
  res.render("home/login.ejs");
});

//글 목록
router.get("/list", function (req, res) {
  db.collection("post").find(
    { _id: parseInt(req.params.id) },
    function (err, result) {
      if (err) {
        return res.status(200).send({ message: "성공입니다." });
      }
      //console.log(result);
      res.render("page/list.ejs", { posts: result });
    }
  );
  //res.render("page/list.ejs");
});

//글 쓰기 작성 화면
router.get("/write", function (req, res) {
  res.render("page/write.ejs");
});

//글 작성 과정
router.post("/write_process", function (req, res) {
  db.collection("number").findOne(
    { name: "게시물번호" },
    function (err, result) {
      var allPostNum = result.postNum;
      //console.log(allPostNum);
      //글 작성 후 mongoDB 내 Hotels의 posts로 보낼 것
      db.collection("post").insertOne(
        {
          _id: allPostNum + 1,
          title: req.body.title,
          date: req.body.date,
          detail: req.body.detail,
        },
        function (err, result) {
          //Hotels의 post로 게시물 추가 시 number에도 숫자 변해야 함
          db.collection("number").updateOne(
            { name: "게시물번호" },
            { $inc: { postNum: 1 } },
            function (err, result) {
              if (err) {
                return console.log(err);
              }
            }
          );
          console.log("MongoDB로 저장 완료!");
        }
      );
    }
  );
  res.send("전송완료");
  console.log(req.body);
});

//글 삭제하기
router.delete("/delete", function (req, res) {
  req.body._id = parseInt(req.body._id);
  db.collection("post").deleteOne(req.body, function (err, result) {
    console.log("삭제 완료");
  });
  res.send("최종 삭제 완료");
});

//상세페이지
router.get("detail/:id", function (req, res) {
  db.collection("post").findOne(
    { _id: parseInt(req.params.id) },
    function (err, result) {
      if (err) {
        return res.status(200).send({ message: "성공입니다." });
      }
      //console.log(result);
      res.render("hotels/detail.ejs", { posts: result });
    }
  );
});

//수정 페이지
router.get("/edit/:id", function (req, res) {
  db.collection("post").findOne(
    { _id: parseInt(req.params.id) },
    function (err, result) {
      console.log(result);
      res.render("page/edit.ejs", { post: result });
    }
  );
});

router.put("/edit", function (req, res) {
  db.collection("post").updateOne(
    { _id: parseInt(req.body.id) },
    {
      $set: {
        title: req.body.title,
        date: req.body.date,
        detail: req.body.detail,
      },
    },
    function (err, result) {
      console.log("수정 완료");
      res.redirect("/list");
    }
  );
});

module.exports = router;
