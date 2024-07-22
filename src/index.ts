require("dotenv").config();
import app from "./config/express";
import http from "http";
import { serverStartLog } from "./helper/response.decorator";
import { errorHandler } from "./middlewares/error";
import config from "./config";

app.use("/api/v1", require("../src/api/routes"));
app.use(errorHandler);


const server = http.createServer(app);
const PORT = parseInt(config.PORT || "3000");

//handle any uncaught exceptions preventing the server from crashing
process.on("uncaughtException", function (err) {
  console.log("Caught exception: " + err);
});

server.listen(PORT, () => serverStartLog(PORT));
