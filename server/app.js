const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const config_conn = require("./config/key");
const mongoose = require("mongoose");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("서버 가동");
});

mongoose
  .connect(config_conn.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//body-parser
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/api/home", (req, res) => {
  res.send("안녕하세요 홈입니다.");
});

app.use("/api/user", require("./routes/user"));
app.use("/api/product", require("./routes/product"));
app.use("/uploads", express.static("uploads"));

app.use("/api/data", require("./routes/data"));
app.use("/uploadReview", express.static("uploadReview"));

module.exports = app;
