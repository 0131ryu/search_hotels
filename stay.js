const mongoose = require("mongoose");

const staySchema = mongoose.Schema({
  title: {
    type: String,
    maxlength: 50,
  },
  detail: {
    type: String,
    maxlength: 50,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("Stay", staySchema);
