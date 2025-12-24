import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";

export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body || {};

  if ([name, email, password].some((field) => field?.trim() === ""))
    throw new apiError(400, "All fields are required!!");

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new apiError(409, "User already exists!!");

  const userData = await User.create({
    name,
    email,
    password,
  });

  if (!userData) throw new apiError(500, "Error creating user!!");

  const createdUser = userData.toObject();
  delete createdUser.password;

  return res
    .status(201)
    .json(new apiResponse(201, createdUser, "User created successfully!!"));
}, true);

export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  if (!(email && password))
    throw new apiError(400, "Email and Password are required!!");

  const user = await User.findOne({ email });
  if (!user) throw new apiError(404, "User not found!!");

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new apiError(401, "Invalid user credentials!!");

  const refreshToken = await user.generateRefreshToken();
  const accessToken = await user.generateAccessToken();

  const userData = user.toObject();
  delete userData.password;

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { user: userData, refreshToken, accessToken },
        "User signed-In successfully!!"
      )
    );
});

export const signOut = asyncHandler(async (req, res) => {});
