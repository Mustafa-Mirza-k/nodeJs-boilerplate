import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../helper/response.decorator";
import { statusMessages } from "../utils/statusMessages";
import { ApiError } from "../utils/apiError";
import { ValidationError } from "sequelize";
import config from "../config";

export const errorHandler = (
  err: ApiError | ValidationError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorMessage: string = "";

  if (err instanceof ApiError) {
    return res.status(err?.statusCode).send(errorResponse(err));
  } else if (err instanceof ValidationError) {
    //sequelize validation errors
    let validationErrorItem = (err as ValidationError).errors[0];
    if (validationErrorItem.type == "unique violation") {
      if (validationErrorItem.path == "email") {
        errorMessage = statusMessages.email_already_registered;
      }
    } else {
      errorMessage = err.message;
    }
  } else {
    if (config.ENVIRONMENT == "production") {
      errorMessage = statusMessages.internal_server;
    } else {
      errorMessage = err.message;
    }
  }

  let error = new ApiError(errorMessage, 500, err);
  return res.status(500).send(errorResponse(error));
};
