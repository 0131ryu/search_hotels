"use strict";
require("dotenv").config();
const mongoose = require("mongoose");
const Stay = require("../../stay");

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to database successfully");
  }
});

var db;

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  "mongodb://admin:abc1234@cluster0-shard-00-00.ezoih.mongodb.net:27017,cluster0-shard-00-01.ezoih.mongodb.net:27017,cluster0-shard-00-02.ezoih.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-xs9rt3-shard-0&authSource=admin&retryWrites=true&w=majority",
  function (err, client) {
    if (err) return console.log(err);

    db = client.db("Hotels");
  }
);

const list = (req, res) => {
  Stay.find()
    .then((result) => {
      res.json(result);
      res.render("page/list.ejs", { posts: result });
    })
    .catch((err) => {
      res.send(err);
    });
  // db.collection("post")
  //   .find()
  //   .toArray(function (err, result) {
  //     if (err) {
  //       return res.status(200).send({ message: "성공입니다." });
  //     }
  //     //console.log(result);
  //     res.render("page/list.ejs", { posts: result });
  //   });
};

const write = (req, res) => {
  res.render("page/write.ejs");
};

const writeProcess = (req, res) => {
  //인스턴스 생성
  const stay = new Stay();

  stay.title = req.body.title;
  stay.detail = req.body.detail;
  stay.date = req.body.date;

  stay.save((err) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(201).send({
        success: true,
      });
    }
  });
  // db.collection("number").findOne(
  //   { name: "게시물번호" },
  //   function (err, result) {
  //     var allPostNum = result.postNum;

  //     db.collection("post").insertOne(
  //       {
  //         _id: allPostNum + 1,
  //         title: req.body.title,
  //         date: req.body.date,
  //         detail: req.body.detail,
  //       },
  //       function (err, result) {
  //         //Hotels의 post로 게시물 추가 시 number에도 숫자 변해야 함
  //         db.collection("number").updateOne(
  //           { name: "게시물번호" },
  //           { $inc: { postNum: 1 } },
  //           function (err, result) {
  //             if (err) {
  //               return console.log(err);
  //             }
  //           }
  //         );
  //         console.log("MongoDB로 저장 완료!");
  //       }
  //     );
  //   }
  // );
  // res.send("전송완료");
  // console.log(req.body);
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
      res.render("page/detail.ejs", { posts: result });
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
