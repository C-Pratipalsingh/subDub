import aj from "../config/arcjet.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const arcjetMiddleware = asyncHandler(async (req, _, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw new apiError(429, "Rate limit reached || Too many request!!");
      } else if (decision.reason.isBot()) {
        throw new apiError(403, "No bots allowed!!");
      } else {
        throw new apiError(403, "Forbidden!!");
      }
    }
    next();
  } catch (error) {
    throw new apiError(400, error?.message || "Arcjet middleware error");
    next(error);
  }
});

export default arcjetMiddleware;
