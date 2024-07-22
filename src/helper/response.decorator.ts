import config from "../config";
import { ApiError } from "../utils/apiError";

export const successResponse = <T>(response: T | null) => {
  let message = {
    data: response,
    status: true,
    error: null,
  };
  return message;
};

export const errorResponse = (error: ApiError) => {
  let message = {
    data: null,
    status: false,
    error: error.message,
  };
  console.error("-----------------Error log Start---------------------------");
  console.log("TIMESTAMP: " + new Date().toISOString());
  console.error("ERROR:");
  console.error(error);
  console.error("-----------------Error log End-----------------------------");
  return message;
};

export const serverStartLog = (port: number) => {
  console.log("-----------------------------------------------------------");
  console.log("Server has been started");
  console.log("-----------------------------------------------------------");
  console.log("Date: ", new Date().toISOString());
  console.log("Port: ", port);
  console.log("Environment: ", config.ENVIRONMENT);
  console.log("-----------------------------------------------------------");
};
