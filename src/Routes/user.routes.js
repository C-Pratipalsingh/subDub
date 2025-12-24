import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUserDetails,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/").get(verifyJWT, getAllUsers).post(createUser);
userRouter
  .route("/:id")
  .get(verifyJWT, getUser)
  .patch(verifyJWT, updateUserDetails)
  .delete(verifyJWT, deleteUser);

export default userRouter;
