const mongoose = require("mongoose");
const sequencing = require("./sequencing");

const questSchema = mongoose.Schema({
  _id: Number,
  people: {
    type: Number,
    maxlength: 50,
  },
  haveChild: {
    type: Boolean,
  },
  haveSenior: {
    type: Boolean,
  },
  bed: {
    type: String,
    maxlength: 50,
  },
  costLimit: {
    type: Number,
  },
  priority: {
    type: String,
    maxlength: 50,
  },
});

//staySchema.plugin(autoIncrement);
questSchema.pre("save", function (next) {
  let doc = this;
  sequencing
    .getSequenceNextValue("quest_id")
    .then((counter) => {
      console.log("quest_number", counter);
      if (!counter) {
        sequencing
          .insertCounter("quest_id")
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

module.exports = mongoose.model("Quest", questSchema);
