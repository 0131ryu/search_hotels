const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// const db = require("./config/db");

//라우팅
const home = require("./routes/home");

//views
app.set("veiw engine", "ejs");
app.set("views", "./views");

//method-override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

//static - css 적용
const path = require("path");
app.use("static", express.static(path.join(__dirname, "static")));

//로그인에 필요함
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

app.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
);

app.use(passport.initialize());
app.use(passport.session());

//router로 받아온 경로
app.use("/", home);
app.use("/login", home);

app.use("/list", home);
app.use("/write", home);
app.use("/write_process", home);
app.use("/delete", home);
app.use("/detail/:id", home);
app.use("/edit/:id", home);
app.use("/edit", home);

//로그인
app.get("/login", function (req, res) {
  res.render("home/login.ejs");
});

//passport: 로그인 기능 쉽게 구현 도와줌
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/fail", //인증 실패 시 /fail로 이동
  }),
  function (req, res) {
    //성공 시
    res.redirect("/");
  }
);

//로그인 한 사람만 mypage가 나와야 함 -> mypage 요청 시 DidLogin 함수 출력
app.get("/mypage", DidLogin, function (req, res) {
  console.log(req.user);
  res.render("home/mypage.ejs", { 사용자: req.user });
});

function DidLogin(req, res, next) {
  if (req.user) {
    //로그인후 세션이 있으면 요청.user가 항상 있음
    next(); //다음으로 통과
  } else {
    res.send("로그인이 필요합니다.");
  }
}

//local strategy 방법
passport.use(
  new LocalStrategy(
    {
      //유저가 입력한 아이디/비번 항목이 뭔지 정의(name속성)
      usernameField: "id",
      passwordField: "pw",
      session: true,
      passReqToCallback: false,
    },
    function (입력한아이디, 입력한비번, done) {
      //console.log(입력한아이디, 입력한비번);
      db.collection("login").findOne(
        { id: 입력한아이디 },
        function (에러, 결과) {
          if (에러) return done(에러);

          if (!결과)
            return done(null, false, { message: "존재하지않는 아이디요" });
          if (입력한비번 == 결과.pw) {
            return done(null, 결과);
          } else {
            return done(null, false, { message: "비번틀렸어요" });
          }
        }
      );
    }
  )
);

//세션 데이터를 만들고 세션 아이디를 만들어 보내줌
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//로그인한 유저의 개인정보를 DB에서 찾는 역할
passport.deserializeUser(function (아이디, done) {
  //DB에서 위에 있는 user.id로 유저를 찾고 유저 정보를 null 뒤의 {}에 넣음
  db.collection("login").findOne({ id: 아이디 }, function (err, result) {
    done(null, result);
  });
});

app.get("/registForm", function (req, res) {
  res.render("page/registForm.ejs");
});

//회원가입하기
app.post("/register", function (req, res) {
  db.collection("login").insertOne(
    { id: req.body.id, pw: req.body.pw },
    function (err, result) {
      res.redirect("/login");
    }
  );
});

//mypage 사용
function DidLogin(req, res, next) {
  if (req.user) {
    //로그인후 세션이 있으면 요청.user가 항상 있음
    next(); //다음으로 통과
  } else {
    res.send("로그인이 필요합니다.");
  }
}

//mypage : 로그인 시 mypage 나옴
app.get("/mypage", DidLogin, function (req, res) {
  console.log(req.user);
  res.render("home/mypage.ejs", { 사용자: req.user });
});

//회원가입
app.use("/register", function (req, res) {
  db.collection("login").insertOne(
    { id: req.body.id, pw: req.body.pw },
    function (err, result) {
      res.redirect("/");
    }
  );
});

app.get("/search", (req, res) => {
  var searchReq = [
    {
      $search: {
        index: "titleSearch",
        text: {
          query: req.query.value,
          path: ["title", "date", "detail"], // 제목날짜 둘다 찾고 싶으면 ['제목', '날짜']
        },
      },
    },

    { $project: { title: 1, _id: 0, score: { $meta: "searchScore" } } }, //검색 결과에 필터넣기(score는 검색어와 관련해 얼마나 연관있는지)
  ];
  db.collection("post")
    .aggregate(searchReq)
    .toArray((err, result) => {
      console.log(result);
      res.render("page/search.ejs", { posts: result });
    });
});

app.get("/upload", function (req, res) {
  res.render("upload.ejs");
});

//multer 사용법
let multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/image");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //파일명 : file.originalname
  },
});

var upload = multer({ storage: storage });

app.post("/upload", upload.single("hotels"), function (req, res) {
  res.send("업로드완료");
});

//업로드한 이미지 보여주기
//url 파라미터 문법 = :
app.get("/image/:imageName", function (req, res) {
  res.sendFile(__dirname + "/public/image/" + req.params.imageName);
});

//채팅
const { ObjectId } = require("mongodb");
const { request } = require("http");

app.get("/chat", DidLogin, function (req, res) {
  db.collection("chatroom")
    .find({ member: req.user._id })
    .toArray()
    .then((result) => {
      res.render("chat.ejs", { data: result });
    });
});

app.post("/chatroom", DidLogin, function (req, res) {
  var saveChat = {
    title: "userChat",
    member: [ObjectId(req.body.lastUserid), req.user._id],
    date: new Date(),
  };
  db.collection("chatroom")
    .insertOne(saveChat)
    .then((result) => {
      //콜백대신 then
      res.send("채팅방 만들기 성공");
    });
});

app.post("/message", DidLogin, function (req, res) {
  var saveChat = {
    parent: req.body.parent,
    userid: req.user._id,
    content: req.body.content,
    date: new Date(),
  };
  db.collection("message")
    .insertOne(saveChat)
    .then((result) => {
      res.send(result);
    });
});

//작동 코드 : nodemon app.js

module.exports = app;
