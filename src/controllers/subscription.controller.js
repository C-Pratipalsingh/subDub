import Subscription from "../models/subscription.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";

export const createSubscription = asyncHandler(async (req, res) => {
  const { name, price, frequency, category, paymentMethod, startDate } =
    req.body || {};

  if (
    [name, price, frequency, category, paymentMethod, startDate].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new apiError(400, "All fields are required!!");
  }

  const subscription = await Subscription.create({
    name,
    price,
    frequency,
    category,
    paymentMethod,
    startDate,
    owner: req.user._id,
  });

  if (!subscription) throw new apiError(500, "Error creating subscription!!");

  return res
    .status(201)
    .json(
      new apiResponse(201, subscription, "Subscription created successfully!!")
    );
});
export const getSubscription = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  if (!id || !mongoose.isValidObjectId(id))
    throw new apiError(400, "Valid subscription id is required!!");

  const subscription = await Subscription.findById(id)
    .populate("owner", "name email")
    .lean();

  if (!subscription) throw new apiError(400, "Error fetching subscription!!");

  return res
    .status(200)
    .json(
      new apiResponse(200, subscription, "Subscription fetched successfully!!")
    );
});
export const getAllSubscription = asyncHandler(async (req, res) => {
  const subscriptions = await Subscription.find({
    user: req.user._id,
  }).populate("owner", "name email");

  if (!subscriptions) throw new apiError(500, "Error fetching subscriptions!!");

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        subscriptions,
        "User Subscriptions fetched successfully!!"
      )
    );
});
export const updateSubscription = asyncHandler(async (req, res) => {
  const subId = req.params?.id;
  const allowedUpdates = [
    "name",
    "price",
    "currency",
    "frequency",
    "category",
    "paymentMethod",
    "renewalDate",
    "status",
  ];
  const updates = {};

  if (!id || !mongoose.isValidObjectId(id))
    throw new apiError(400, "Valid subscription id is required!!");

  for (const key of allowedUpdates) {
    if (req.body[key] !== undefined) {
      updates[key] = req.body[key];
    }
  }

  const subscription = await Subscription.findOneAndUpdate(
    { _id: subId, owner: req.user._id },
    {
      $set: updates,
    },
    { new: true }
  );

  if (!subscription) throw new apiError(404, "Subscription not found!!");

  return res
    .status(200)
    .json(
      new apiResponse(200, subscription, "Subscription updated successfully!!")
    );
});
export const deleteSubscription = asyncHandler(async (req, res) => {
  const subId = req.params?.id;

  if (!subId || !mongoose.isValidObjectId(subId))
    throw new apiError(400, "Valid subscription id is required!!");

  const deletedSubscription = await Subscription.findOneAndDelete({
    _id: subId,
    owner: req.user._id,
  }).lean();

  if (!deletedSubscription)
    throw new apiError(500, "Subscription not found!! OR Unauthorized!!");

  return res
    .status(200)
    .json(new apiResponse(204, {}, "Subscription deleted successfully!!"));
});
export const cancelSubscription = asyncHandler(async (req, res) => {
  const subId = req.params?.id;

  if (!subId || !mongoose.isValidObjectId(subId))
    throw new apiError(400, "Valid subscription id is required!!");

  const canceledSubscription = await Subscription.findOneAndUpdate(
    { _id: subId, owner: req.user._id },
    { $set: { status: "inactive" } },
    { new: true }
  ).lean();

  if (!canceledSubscription)
    throw new apiError(500, "Subscription not found!! OR Unauthorized!!");

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Subscription cancelled successfully!!"));
});
export const getUpcomingRenewals = asyncHandler(async (req, res) => {
  const now = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(now.getDate() + 7);

  const renewals = await Subscription.find({
    owner: req.user._id,
    status: "active",
    renewalDate: { $gte: now, $lte: nextWeek },
  });

  if (!renewals)
    throw new apiError(400, "Unauthorized!! OR No renewals found!!");

  return res
    .status(200)
    .json(
      new apiResponse(200, renewals, "Upcoming renewals found successfully!!")
    );
});
