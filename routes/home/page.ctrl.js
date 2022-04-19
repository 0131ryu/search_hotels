"use strict";
require("dotenv").config();
const connection = require("../../src/databases/db");
const Stay = require("../../config/stay");

const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

let gfs;

connection();

const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
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
  stay.stayNum = req.body.stayNum;
  stay.stayChild = req.body.stayChild;
  stay.staySenior = req.body.staySenior;
  stay.stayBed = req.body.stayBed;
  stay.stayCost = req.body.stayCost;
  stay.stayMost = req.body.stayMost;
  stay.detail = req.body.detail;
  stay.date = req.body.date;

  console.log(
    stay.stayNum,
    stay.stayChild,
    stay.staySenior,
    stay.stayBed,
    stay.stayCost,
    stay.stayMost
  );

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
};

const detailPage = (req, res) => {
  Stay.find({ _id: parseInt(req.params.id) }, function (err, result) {
    if (err) {
      return res.status(200).send({ message: "성공입니다." });
    }
    res.render("page/detail.ejs", { posts: result });
  });
};

const findEditPage = (req, res) => {
  Stay.findOne({ _id: parseInt(req.params.id) }, function (err, result) {
    console.log(result);
    res.render("page/edit.ejs", { posts: result });
  });
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
};

const uploadPage = (req, res) => {
  res.render("upload.ejs");
};

//imageUpload
const imgUpload = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.send("not found");
  }
};

const imgDelete = async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("An error occured");
  }
};

const searchPage = (req, res) => {
  const searchCondition = [
    {
      $search: {
        index: "titleSearch",
        text: {
          query: req.query.value,
          path: [
            "stayNum",
            "stayBed",
            "stayCost",
            "stayMost",
            "type",
            "title",
            "detail",
          ],
        },
      },
    },
  ];

  Stay.aggregate(searchCondition, function (err, result) {
    console.log(result);
    res.render("page/search.ejs", { posts: result });
  });
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
  imgUpload,
  imgDelete,
  searchPage,
};
