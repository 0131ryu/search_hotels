const mongoose = require("mongoose");
const sequencing = require("./sequencing");
const slug = require("mongoose-slug-generator");
const domPurifier = require("dompurify");
const { JSDOM } = require("jsdom");
const htmlPurify = domPurifier(new JSDOM().window);

//initailize slug
mongoose.plugin(slug);
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
    default: () => Date.now(),
  },
  snippet: {
    type: String,
  },
  img1: {
    type: String,
    default: "winter.jpg",
  },
  img2: {
    type: String,
    default: "winter.jpg",
  },
  img3: {
    type: String,
    default: "winter.jpg",
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

staySchema.pre("validate", function (next) {
  //check if there is a desciption
  if (this.detail) {
    this.detail = htmlPurify.sanitize(this.detail);
    // this.snippet = stripHtml(this.description.substring(0, 200)).result;
  }

  next();
});

module.exports = mongoose.model("Stay", staySchema);
