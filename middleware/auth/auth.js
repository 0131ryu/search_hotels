const user = require("../../models/home/user");

let auth = (req, res, next) => {
  //인증 처리하는 곳

  //클라이언트 쿠키에서 토큰 가져옴
  let token = req.cookies.x_auth;

  //토큰을 복호화 한 후 유저를 찾는다
  user.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
  });

  req.token = token;
  req.user = user;
  next();
  //
};

module.exports = { auth };
