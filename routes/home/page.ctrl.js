"use strict";
require("dotenv").config();
const mongoose = require("mongoose");
const Stay = require("../../config/stay");

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to database successfully");
  }
});

const list = (req, res) => {
  Stay.find()
    .then((result) => {
      res.render("page/list.ejs", { posts: result });
    })
    .catch((err) => {
      res.send(err);
    });
};

const write = (req, res) => {
  res.render("page/write.ejs");
};

const writeProcess = (req, res) => {
  //인스턴스 생성
  const stay = new Stay();

  stay.title = req.body.title;
  stay.type = req.body.type;
  stay.detail = req.body.detail;
  stay.date = req.body.date;

  stay.save((err) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.redirect("/list");
    }
  });
};

const deletePage = (req, res) => {
  Stay.remove({ _id: parseInt(req.body._id) })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
  // req.body._id = parseInt(req.body._id);
  // db.collection("post").deleteOne(req.body, function (err, result) {
  //   console.log("삭제 완료");
  // });
  // res.send("최종 삭제 완료");
};

const detailPage = (req, res) => {
  Stay.find({ _id: parseInt(req.params.id) }, function (err, result) {
    if (err) {
      return res.status(200).send({ message: "성공입니다." });
    }
    res.render("page/detail.ejs", { posts: result });
  });

  // db.collection("post").findOne(
  //   { _id: parseInt(req.params.id) },
  //   function (err, result) {
  //     if (err) {
  //       return res.status(200).send({ message: "성공입니다." });
  //     }
  //     //console.log(result);
  //     res.render("page/detail.ejs", { posts: result });
  //   }
  // );
};

const findEditPage = (req, res) => {
  Stay.findOne({ _id: parseInt(req.params.id) }, function (err, result) {
    console.log(result);
    res.render("page/edit.ejs", { posts: result });
  });

  // db.collection("post").findOne(
  //   { _id: parseInt(req.params.id) },
  //   function (err, result) {
  //     console.log(result);
  //     res.render("page/edit.ejs", { post: result });
  //   }
  // );
};

const editPage = (req, res) => {
  Stay.updateOne(
    { _id: parseInt(req.params.id) },
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
  // db.collection("post").updateOne(
  //   { _id: parseInt(req.body.id) },
  //   {
  //     $set: {
  //       title: req.body.title,
  //       date: req.body.date,
  //       detail: req.body.detail,
  //     },
  //   },
  //   function (err, result) {
  //     console.log("수정 완료");
  //     res.redirect("/list");
  //   }
  // );
};

const uploadPage = (req, res) => {
  res.render("upload.ejs");
};

const searchPage = (req, res) => {
  const searchCondition = [
    {
      $search: {
        index: "typeSearch",
        text: {
          query: req.query.value,
          path: ["type", "title", "detail"],
        },
      },
    },
  ];

  Stay.aggregate(searchCondition, function (err, result) {
    console.log(result);
    res.render("page/search.ejs", { posts: result });
  });

  // console.log(req.query.value);

  // db.collection("post")
  //   .aggregate(searchReq)
  //   .toArray((err, result) => {
  //     console.log(result);
  //     res.render("page/search.ejs", { posts: result });
  //   });
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
  searchPage,
};
