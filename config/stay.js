const mongoose = require("mongoose");
const sequencing = require("./sequencing");

const staySchema = mongoose.Schema({
  _id: Number,
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
