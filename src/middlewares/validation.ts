import { Response, NextFunction, Request } from "express";
import { ApiError } from "../utils/apiError";
import { Schema } from "joi";
import { statusMessages } from "../utils/statusMessages";

const validationHandler = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      let errorDetails = error.details[0];
      let path = errorDetails.path;
      let type = errorDetails.type;
      // set required field missing error
      if (type == "any.required") {
        const errorMessage = statusMessages.required_field_missing + path;
        const validationError = new ApiError(errorMessage, 404, error);
        next(validationError);
      }

      const validationError = new ApiError(error.message, 403, error);
      next(validationError);
    } else {
      next();
    }
  };
};

export default validationHandler;
