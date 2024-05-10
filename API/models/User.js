const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
     unique: true,
    },
    photo_user: {
      data: Buffer,
      contentType: String ,   
     },
    email: {
      type: String,
      required: true,
     // unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], 
      default: "user", 
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("User", UserSchema);
