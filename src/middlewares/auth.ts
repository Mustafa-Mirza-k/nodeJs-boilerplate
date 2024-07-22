// import jwt from "jsonwebtoken";
const dotenv = require("dotenv");
dotenv.config();

import { Response, NextFunction, Request } from "express";
import { verifyToken } from "../helper/jwt.token";
import { ApiError } from "../utils/apiError";
import { user } from "../types";
import { statusMessages } from "../utils/statusMessages";

const authHandler = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  let error = new ApiError(statusMessages.unauthorized, 401);
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Bearer <token>

    const user = verifyToken(token);

    if (user) {
      req.currentUser = user as user;
      next();
    } else {
      next(error);
    }
  } else {
    next(error);
  }
};

export default authHandler;
