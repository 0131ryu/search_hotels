"use strict";

const output = {
  quest: (req, res) => {
    res.render("home/quest.ejs");
  },
};

module.exports = {
  output,
};
