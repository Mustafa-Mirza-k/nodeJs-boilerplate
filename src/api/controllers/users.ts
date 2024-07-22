import { NextFunction, Request, Response } from "express";
import repository from "../../repository";
import Users from "../models/users";
import { successResponse } from "../../helper/response.decorator";
import { statusMessages } from "../../utils/statusMessages";
import { ApiError } from "../../utils/apiError";

const userController = {
  create: (req: Request, res: Response, next: NextFunction) => {
    return createUser(req, res, next);
  },
  getAll: (req: Request, res: Response, next: NextFunction) => {
    return getAllUser(req, res, next);
  },
  get: (req: Request, res: Response, next: NextFunction) => {
    return getUser(req, res, next);
  },
  delete: (req: Request, res: Response, next: NextFunction) => {
    return deleteUser(req, res, next);
  },
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let body = req.body;
    const data = await repository.create<Users>(Users, body);
    return res.status(201).send(successResponse<Users[] | Users>(data));
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await repository.get<Users>(Users, {}, false);
    return res.status(200).send(successResponse<Users[] | Users>(data));
  } catch (e) {
    next(e);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = await repository.get<Users>(
      Users,
      {
        where: {
          id,
        },
      },
      true
    );
    return res.status(200).send(successResponse<Users[] | Users>(data));
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const record = await repository.delete<Users>(Users, {
      id,
    });
    if (!record) {
      throw new ApiError(statusMessages.record_not_found, 404);
    }
    return res
      .status(200)
      .send(successResponse<String>(statusMessages.deleted_successfully));
  } catch (e) {
    next(e);
  }
};

export default userController;
