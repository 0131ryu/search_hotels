const mongoose = require("mongoose");
const sequencing = require("./sequencing");

const staySchema = mongoose.Schema({
  _id: Number,
  title: {
    type: String,
    maxlength: 50,
  },
  type: {
    type: String,
    maxlength: 20,
  },
  stayNum: {
    type: Number,
    maxlength: 20,
  },
  stayChild: {
    type: String,
    maxlength: 20,
  },
  staySenior: {
    type: String,
    maxlength: 20,
  },
  stayBed: {
    type: String,
    maxlength: 20,
  },
  stayCost: {
    type: Number,
    maxlength: 20,
  },
  stayMost: {
    type: String,
    maxlength: 20,
  },
  detail: {
    type: String,
    maxlength: 50,
  },
  date: {
    type: Date,
  },
});

//staySchema.plugin(autoIncrement);
staySchema.pre("save", function (next) {
  let doc = this;
  sequencing
    .getSequenceNextValue("stay_id")
    .then((counter) => {
      console.log("abcdef", counter);
      if (!counter) {
        sequencing
          .insertCounter("stay_id")
          .then((counter) => {
            doc._id = counter;
            console.log(doc);
            next();
          })
          .catch((error) => next(error));
      } else {
        doc._id = counter;
        next();
      }
    })
    .catch((error) => next(error));
});

module.exports = mongoose.model("Stay", staySchema);
