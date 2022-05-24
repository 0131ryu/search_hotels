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
    seasons: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      default: 0,
    },

    //시간 자동 업데이트
  },
  { timestamps: true }
);

dataSchema.index(
  {
    title: "text",
    description: "text",
  },
  {
    weight: {
      title: 5,
      description: 1,
    },
  }
);

const Data = mongoose.model("Data", dataSchema);

module.exports = { Data };
