import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
const secret = config.JWT_SECRET || "";

export const generateToken = (id: string, expiresIn: string) => {
  return jwt.sign({ id }, secret, { expiresIn });
};

export const verifyToken = (token: string): JwtPayload | string | null => {
  return jwt.verify(token, secret);
};
