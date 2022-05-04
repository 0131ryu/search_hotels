const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthUserSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AuthUser = mongoose.model("authUser", AuthUserSchema);

module.exports = AuthUser;
