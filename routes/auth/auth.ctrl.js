"use strict";
const User = require("../../config/user");

const register = (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
};

module.exports = {
  register,
};
