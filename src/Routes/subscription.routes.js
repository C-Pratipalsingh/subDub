import { Router } from "express";
import {
  getAllSubscription,
  createSubscription,
  getSubscription,
  updateSubscription,
  deleteSubscription,
  cancelSubscription,
  getUpcomingRenewals,
} from "../controllers/subscription.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const subRouter = Router();

subRouter.use(verifyJWT);

subRouter.route("/").get(getAllSubscription).post(createSubscription);
subRouter
  .route("/:id")
  .get(getSubscription)
  .patch(updateSubscription)
  .delete(deleteSubscription);
subRouter.route("/:id/cancel").patch(cancelSubscription);
subRouter.route("/upcoming-renewals").get(getUpcomingRenewals);

export default subRouter;
