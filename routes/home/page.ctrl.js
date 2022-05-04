"use strict";
require("dotenv").config();
const connection = require("../../src/databases/db");
const Stay = require("../../config/stay");
const multer = require("multer");

// let gfs;

connection();

//list.ejs 이미지 저장
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "src/public/uploads/list/image");
  },

  //add back the extenstion
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

const list = async (req, res) => {
  let stay = await Stay.find().sort({ timeCreated: "desc" });
  res.render("page/list.ejs", { posts: stay });
};

const write = (req, res) => {
  res.render("page/write.ejs");
};

const writeProcess = async (req, res) => {
  let stay = new Stay({
    title: req.body.title,
    type: req.body.type,
    stayNum: req.body.stayNum,
    stayChild: req.body.stayChild,
    staySenior: req.body.staySenior,
    stayBed: req.body.stayBed,
    stayCost: req.body.stayCost,
    stayMost: req.body.stayMost,
    detail: req.body.detail,
    date: req.body.date,
    img1: req.files[0].filename,
    img2: req.files[1].filename,
    img3: req.files[2].filename,
  });

  console.log(req.files);
  console.log(req.files[0].filename);
  console.log(stay.staySenior);

  try {
    stay = await stay.save();
    res.redirect("/list");
  } catch (error) {
    return res.redirect("/write");
  }

  // stay.save((err) => {
  //   if (err) {
  //     return res.status(400).send(err);
  //   } else {
  //     return res.redirect("/list");
  //   }
  // });
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

// //imageUpload
// const imgUpload = async (req, res) => {
//   try {
//     const file = await photos.gfs.files.findOne({
//       filename: req.params.filename,
//     });
//     const readStream = photos.gfs.createReadStream(file.filename);
//     readStream.pipe(res);
//   } catch (error) {
//     res.send("not found");
//   }
// };

// const imgDelete = async (req, res) => {
//   try {
//     await photos.gfs.files.deleteOne({ filename: req.params.filename });
//     res.send("success");
//   } catch (error) {
//     console.log(error);
//     res.send("An error occured");
//   }
// };

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
  searchPage,
  upload,
};
