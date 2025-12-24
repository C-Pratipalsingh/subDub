import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 2 * 1000,
  limit: 1,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: "Too many requests, please try again later!!",
  statusCode: 429,
});

export default limiter;
