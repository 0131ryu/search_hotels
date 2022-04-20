"use strict";
require("dotenv").config();
const mongoose = require("mongoose");
const connection = require("../../src/databases/db");
const Grid = require("gridfs-stream");
const fs = reqiore("fs");

let gfs;
connection();

const conn = mongoose.connection;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

//imageUpload
const imgUpload = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.send("not found");
    console.log(error);
  }
};

const imgUploadPost = (req, res) => {
  if (req.file === undefined) return res.send("you must select a file.");
  const imgUrl = `http://localhost:3000/file/${req.file.filename}`;
  return res.send(imgUrl);
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

module.exports = { imgUpload, imgUploadPost, imgDelete };
