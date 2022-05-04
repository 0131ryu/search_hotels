"use strict";

const createError = require("http-errors");
const AuthUser = require("../../models/authUser");
const { authSchema } = require("../../config/validataion_schema");

const register = async (req, res, next) => {
  try {
    // const { email, password } = req.body;
    // if (!email || !password) throw createError.BadRequest();
    const result = await authSchema.validateAsync(req.body);
    console.log(result);

    const doesExist = await AuthUser.findOne({ email: result.email });

    if (doesExist) {
      throw createError.Conflict(`${result.email} is already been registerd`);
    } else {
    }

    const authUser = new AuthUser(result);
    const saveAuthUser = await authUser.save();

    res.send(saveAuthUser);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
  // res.send("register route");
};

const login = async (req, res, next) => {
  res.send("login route");
};

const refreshToken = async (req, res, next) => {
  res.send("refresh-token route");
};

const logout = async (req, res, next) => {
  res.send("logout route");
};

module.exports = { register, login, refreshToken, logout };
