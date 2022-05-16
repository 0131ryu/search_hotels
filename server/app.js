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

//라우팅
const authRouter = require("./routes/auth");

app.use("/", authRouter);

module.exports = app;