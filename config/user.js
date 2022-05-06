const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    maxlength: 50,
  },
  password: {
    type: String,
    maxlength: 50,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//user.save 전에 활동
userSchema.pre("save", function (next) {
  //비밀번호 가져오기
  var user = this;

  //비밀번호를 바꿀때만 암호화
  if (user.isModified("password")) {
    //비밀번호를 암호화시킨다
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

//auth.ctrl에 이용되는 메소드 만들기
userSchema.methods.comparePassword = function (plainPassword, cb) {
  //plainPassword : 12345 암호화된 비밀번호 : $2b$10$1QjUZEBNagxLavQ6kxLeu.ihUzWJ926HYNb9HHegfhLzrNEKVV2bi
  var user = this;
  bcrypt.compare(plainPassword, user.password, function (err, isMatch) {
    if (err) return cb(err), cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  //id 가져오기
  var user = this;

  //jsonwebtoken을 이용해서 토큰 생성하기
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  // user._id + 'secretToken' = token
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

module.exports = mongoose.model("User", userSchema);
