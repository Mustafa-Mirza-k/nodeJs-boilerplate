import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
const secret = config.JWT_SECRET || "";

export const generateToken = (data: object, expiresIn: string): string => {
  return jwt.sign(data, secret, { expiresIn });
};

export const verifyToken = (token: string): JwtPayload | string | null => {
  return jwt.verify(token, secret);
};
