const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type:Number,
      default: 0,
    },
    user_type:{
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//role:0 => student/contributor  1=>Govt.
//user_type:(0=>student) (1=>contributor)
module.exports = mongoose.model("Users", userSchema);
