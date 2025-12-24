import User from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  return res
    .status(200)
    .json(new apiResponse(200, {users, count: users.length}, "All users fetched successfully!!"));
});

export const createUser = asyncHandler(async (req, res) => {});

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params?.id).select("-password");

  if (!user) throw new apiError(404, "User not found!!");

  return res
    .status(200)
    .json(new apiResponse(200, user, "User fetched successfully!!"));
});

export const updateUserDetails = asyncHandler(async (req, res) => {});

export const deleteUser = asyncHandler(async (req, res) => {});
