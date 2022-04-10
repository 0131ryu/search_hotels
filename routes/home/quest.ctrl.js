"use strict";
require("dotenv").config();
const mongoose = require("mongoose");
const Quest = require("../../config/quest");

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to database successfully");
  }
});

const output = {
  list: (req, res) => {
    Quest.find()
      .then((result) => {
        res.render("page/list.ejs", { posts: result });
      })
      .catch((err) => {
        res.send(err);
      });
  },
  quest: (req, res) => {
    res.render("home/quest.ejs");
  },
};

module.exports = {
  output,
};
