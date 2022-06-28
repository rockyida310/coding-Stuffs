const mongoose = require("mongoose");
const Joi = require('joi');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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
    profilePicture: {
      type: String,
      default:"",
    },
    active: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("user",userSchema);

const validate = (user) => {
  const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(15).required(),
  });
  return schema.validate(user);
}

module.exports = {User,validate};