import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES,
} from "../config/env.js";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 50,
      required: [true, "Username is required!!"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
      required: [true, "User Email is required!!"],
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "Password is required!!"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    ACCESS_TOKEN_SECRET || "secret",
    {
      expiresIn: ACCESS_TOKEN_EXPIRES || "15m",
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    REFRESH_TOKEN_SECRET || "secret",
    {
      expiresIn: REFRESH_TOKEN_EXPIRES || "1h",
    }
  );
};

const User = mongoose.model("User", userSchema);

export default User;
