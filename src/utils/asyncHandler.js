import mongoose from "mongoose";

const asyncHandler = (requestHandler, useTransaction = false) => {
  return async (req, res, next) => {
    const session = useTransaction ? await mongoose.startSession() : null;

    try {
      if (session) session.startTransaction();

      await Promise.resolve(requestHandler(req, res, next, session));

      if (session) await session.commitTransaction();
    } catch (error) {
      if (session) await session.abortTransaction();
      next(error);
    } finally {
      if (session) session.endSession();
    }
  };
};

export { asyncHandler };
