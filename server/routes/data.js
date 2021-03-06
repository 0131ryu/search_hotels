const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Data } = require("../models/review/Data");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploadReview/");
  },

  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  // 가져온 이미지를 저장을 해주면 된다.
  upload(req, res, (err) => {
    if (err) {
      return req.json({ success: false, err });
    }

    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

//client로 가져온 정보 저장
router.post("/", (req, res) => {
  //받아온 정보를 DB에 저장함
  const data = new Data(req.body);

  data.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

//DB에 저장한 정보 가져오기
router.post("/list", (req, res) => {
  //Start, End 제어
  let end = req.body.end ? parseInt(req.body.end) : 100;
  let start = req.body.start ? parseInt(req.body.start) : 0;
  let item = req.body.searchItem;

  let findData = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      // console.log("key", key);

      if (key === "price") {
        findData[key] = {
          //Datas의 price Array기준
          $gte: req.body.filters[key][0], //>= 크거나 같음
          $lte: req.body.filters[key][1], //<= 작거나 같음
        };
      } else {
        findData[key] = req.body.filters[key];
      }
    }
  }

  console.log(findData);

  if (item) {
    Data.find(findData)
      .find({ $text: { $search: item } })
      .populate("title")
      .skip(start)
      .limit(end)
      .exec((err, dataInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, dataInfo, limitImage: dataInfo.length });
      });
  } else {
    Data.find(findData)
      .populate("title")
      .skip(start)
      .limit(end)
      .exec((err, dataInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, dataInfo, limitImage: dataInfo.length });
      });
  }
});

// axios.get(`api/data/dataId?id`)
router.get("/data_id", (req, res) => {
  let type = req.query.type;
  let dataId = req.query.id;

  Data.find({ _id: dataId })
    .populate("title")
    .exec((err, data) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, data });
    });
});

module.exports = router;
