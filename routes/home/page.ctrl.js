"use strict";

// const db = require("../../config/db"); -> 연결 오류

var db;

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  "mongodb+srv://admin:abc1234@cluster0.ezoih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  function (err, client) {
    if (err) return console.log(err);

    db = client.db("Hotels");
  }
);

const list = (req, res) => {
  db.collection("post")
    .find()
    .toArray(function (err, result) {
      if (err) {
        return res.status(200).send({ message: "성공입니다." });
      }
      //console.log(result);
      res.render("page/list.ejs", { posts: result });
    });
};

const write = (req, res) => {
  res.render("page/write.ejs");
};

const writeProcess = (req, res) => {
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
};

const deletePage = (req, res) => {
  req.body._id = parseInt(req.body._id);
  db.collection("post").deleteOne(req.body, function (err, result) {
    console.log("삭제 완료");
  });
  res.send("최종 삭제 완료");
};

const detailPage = (req, res) => {
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
};

const findEditPage = (req, res) => {
  db.collection("post").findOne(
    { _id: parseInt(req.params.id) },
    function (err, result) {
      console.log(result);
      res.render("page/edit.ejs", { post: result });
    }
  );
};

const editPage = (req, res) => {
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
};

const uploadPage = (req, res) => {
  res.render("upload.ejs");
};
module.exports = {
  list,
  write,
  writeProcess,
  deletePage,
  detailPage,
  findEditPage,
  editPage,
  uploadPage,
};
