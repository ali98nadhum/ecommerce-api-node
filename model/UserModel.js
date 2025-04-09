const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 25,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: [8, "password must be at least 8 characters"],
  },

  isVerifird:{
    type: Boolean,
    default: false,
  },

  role: {
    type: String,
    enum: ["superAdmin", "admin", "user"],
    default: "user",
  },

  phone: String,

  verificationToken: String,

  verificationTokenExpires: Date,
});

const UserModel = mongoose.model("UserModel", UserSchema);

module.exports = {
  UserModel,
};
