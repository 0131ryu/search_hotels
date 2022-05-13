const mongoose = require("mongoose");

const questCounterSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    required: true,
  },
});

const questCounter = mongoose.model("questCounter", questCounterSchema);

const questGetSequenceNextValue = (seqName) => {
  return new Promise((resolve, reject) => {
    questCounter.findByIdAndUpdate(
      { _id: seqName },
      { $inc: { seq: 1 } },
      (error, counter) => {
        if (error) {
          reject(error);
        }
        if (counter) {
          resolve(counter.seq + 1);
        } else {
          resolve(null);
        }
      }
    );
  });
};

const questInsertCounter = (seqName) => {
  const newQuestCounter = new Counter({ _id: seqName, seq: 1 });
  return new Promise((resolve, reject) => {
    newQuestCounter
      .save()
      .then((data) => {
        resolve(data.seq);
      })
      .catch((err) => reject(error));
  });
};

module.exports = {
  questCounter,
  questGetSequenceNextValue,
  questInsertCounter,
};
