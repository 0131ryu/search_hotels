const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("서버 가동");
});

const config_conn = require("./config/key");

//로그인에 필요함
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

//connect to mongoose
const mongoose = require("mongoose");
mongoose
  .connect(config_conn.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// var db;

// const MongoClient = require("mongodb").MongoClient;
// MongoClient.connect(process.env.MONGODB_URL, function (err, client) {
//   if (err) return console.log(err);

//   db = client.db("Hotels");
// });

//body-parser
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

//라우팅
const homeRouter = require("./routes/home");
const blogRouter = require("./routes/blogs");
const authRouter = require("./routes/auth");

//set template engine
app.set("veiw engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: false }));

//method-override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

//경로 설정
app.use(express.static(`${__dirname}/src/public/`));

//로그인 설정
app.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
);

app.use(passport.initialize());
app.use(passport.session());

//router로 받아온 경로, 앱 세팅
app.use("/", homeRouter);
app.use("/", blogRouter);
app.use("/", authRouter);

// //로그인 한 사람만 mypage가 나와야 함 -> mypage 요청 시 DidLogin 함수 출력
// app.get("/mypage", DidLogin, function (req, res) {
//   console.log(req.user);
//   res.render("home/mypage.ejs", { 사용자: req.user });
// });

// function DidLogin(req, res, next) {
//   if (req.user) {
//     //로그인후 세션이 있으면 요청.user가 항상 있음
//     next(); //다음으로 통과
//   } else {
//     res.send("로그인이 필요합니다.");
//   }
// }

// //local strategy 방법
// passport.use(
//   new LocalStrategy(
//     {
//       //유저가 입력한 아이디/비번 항목이 뭔지 정의(name속성)
//       usernameField: "id",
//       passwordField: "pw",
//       session: true,
//       passReqToCallback: false,
//     },
//     function (입력한아이디, 입력한비번, done) {
//       //console.log(입력한아이디, 입력한비번);
//       db.collection("login").findOne(
//         { id: 입력한아이디 },
//         function (에러, 결과) {
//           if (에러) return done(에러);

//           if (!결과)
//             return done(null, false, { message: "존재하지않는 아이디요" });
//           if (입력한비번 == 결과.pw) {
//             return done(null, 결과);
//           } else {
//             return done(null, false, { message: "비번틀렸어요" });
//           }
//         }
//       );
//     }
//   )
// );

// //세션 데이터를 만들고 세션 아이디를 만들어 보내줌
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// //로그인한 유저의 개인정보를 DB에서 찾는 역할
// passport.deserializeUser(function (아이디, done) {
//   //DB에서 위에 있는 user.id로 유저를 찾고 유저 정보를 null 뒤의 {}에 넣음
//   db.collection("login").findOne({ id: 아이디 }, function (err, result) {
//     done(null, result);
//   });
// });

// app.get("/registForm", function (req, res) {
//   res.render("home/registForm.ejs");
// });

// //mypage 사용
// function DidLogin(req, res, next) {
//   if (req.user) {
//     //로그인후 세션이 있으면 요청.user가 항상 있음
//     next(); //다음으로 통과
//   } else {
//     res.send("로그인이 필요합니다.");
//   }
// }

// //mypage : 로그인 시 mypage 나옴
// app.get("/mypage", DidLogin, function (req, res) {
//   console.log(req.user);
//   res.render("home/mypage.ejs", { 사용자: req.user });
// });

// //회원가입
// app.use("/register", function (req, res) {
//   db.collection("login").insertOne(
//     { id: req.body.id, pw: req.body.pw },
//     function (err, result) {
//       res.redirect("/");
//     }
//   );
// });

// //채팅
// const { ObjectId } = require("mongodb");
// const { request } = require("http");
// const { create } = require("./config/stay");
// const { connection } = require("mongoose");

// app.get("/chat", DidLogin, function (req, res) {
//   db.collection("chatroom")
//     .find({ member: req.user._id })
//     .toArray()
//     .then((result) => {
//       res.render("chat.ejs", { data: result });
//     });
// });

// app.post("/chatroom", DidLogin, function (req, res) {
//   var saveChat = {
//     title: "userChat",
//     member: [ObjectId(req.body.lastUserid), req.user._id],
//     date: new Date(),
//   };
//   db.collection("chatroom")
//     .insertOne(saveChat)
//     .then((result) => {
//       //콜백대신 then
//       res.send("채팅방 만들기 성공");
//     });
// });

// app.post("/message", DidLogin, function (req, res) {
//   var saveChat = {
//     parent: req.body.parent,
//     userid: req.user._id,
//     content: req.body.content,
//     date: new Date(),
//   };
//   db.collection("message")
//     .insertOne(saveChat)
//     .then((result) => {
//       res.send(result);
//     });
// });

// //작동 코드 : nodemon app.js

module.exports = app;
