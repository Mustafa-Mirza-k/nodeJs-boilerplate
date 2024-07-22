import { NextFunction, Request, response, Response } from "express";
import repository from "../../repository";
import Users from "../models/users";
import { successResponse } from "../../helper/response.decorator";
import { statusMessages } from "../../utils/statusMessages";
import { ApiError } from "../../utils/apiError";
import { comparePassword } from "../../utils/security";
import { generateToken } from "../../helper/jwt.token";

const authController = {
  login: (req: Request, res: Response, next: NextFunction) => {
    return loginUser(req, res, next);
  },
  signup: (req: Request, res: Response, next: NextFunction) => {
    return signupUser(req, res, next);
  },
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let body = req.body;
    const data = (await repository.get<Users>(
      Users,
      {
        where: {
          email: body.email,
        },
      },
      true
    )) as Users;

    //account not found
    if (!data) {
      throw new ApiError(statusMessages.invalid_username_password, 401);
    }

    //password validation
    let password = body.password;
    const hashedPassword = data.password || "";
    const isValidPassword = await comparePassword(password, hashedPassword);

    if (!isValidPassword) {
      throw new ApiError(statusMessages.invalid_username_password, 401);
    }

    delete data.dataValues.password;

    const token = await generateToken(
      {
        id: data.dataValues.id,
        username: data.dataValues.username,
      },
      "1d"
    );

    const response = {
      id: data.dataValues.id,
      username: data.dataValues.username,
      email: data.dataValues.email,
      token,
    };

    return res.status(200).send(successResponse<typeof response>(response));
  } catch (e) {
    next(e);
  }
};

const signupUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    await repository.create<Users>(Users, body);
    return res
      .status(200)
      .send(successResponse<String>(statusMessages.account_created));
  } catch (e) {
    next(e);
  }
};

export default authController;
