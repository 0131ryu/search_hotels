const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/home/Product");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
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
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/products", (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  //filter 추가
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      // console.log("key", key);

      if (key === "price") {
        findArgs[key] = {
          //Datas의 price Array기준
          $gte: req.body.filters[key][0], //>= 크거나 같음
          $lte: req.body.filters[key][1], //<= 작거나 같음
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .populate("writer")
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res
        .status(200)
        .json({ success: true, productInfo, postSize: productInfo.length });
    });

  console.log("findArgs", findArgs);
});

module.exports = router;
