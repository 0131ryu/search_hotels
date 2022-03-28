"use strict";

const express = require("express");
const db = require("../config/db");

//로그인에 필요함
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

app.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
);

app.use(passport.initialize());
app.use(passport.session());

class UserStorage {}
