"use strict";
require("dotenv").config();
const mongoose = require("mongoose");
const connection = require("../../src/databases/db");
const Grid = require("gridfs-stream");

let gfs;
connection();

const conn = mongoose.connection;
conn.once("open", () => {
  // gridfsBucket = new mongoose.mongo.GridFSBucket(conection.db, {
  //   bucketName: "uploads",
  // });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

//imageUpload
const imgUpload = (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, files) => {
    if (!files || files.length == 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }
    return res.json(files);
  });
};

const imgShow = (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length == 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }
    if (file.contentType === "image/jpeg" || file.contentType === "img/png") {
      const readStream = gfs.createReadStream(file.filename);
      // const readStream = gridfsBucket.openDownloadStream(file.filename);
      readStream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  });
};

const imgUploadPost = (req, res) => {
  res.json({ file: req.file });
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

const filesGet = (req, res) => {
  gfs.files.find().toArray((error, files) => {
    if (!files || files.length == 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }
    return res.json(files);
  });
};

module.exports = { imgUpload, imgShow, imgUploadPost, imgDelete, filesGet };
