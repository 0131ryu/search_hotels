const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
      maxlength: 50,
    },
    images: {
      type: Array,
      default: [],
    },
    season: {
      type: Number,
      default: 1,
    },

    //시간 자동 업데이트
  },
  { timestamps: true }
);

const Data = mongoose.model("Data", dataSchema);

module.exports = { Data };
