import cors from "cors";
const bodyParser = require("body-parser");
import express from "express";
const app = express();
app.use(
  cors({
    origin: [
      "http://192.168.0.213:3000",
      "http://192.168.0.213:3002",
      "http://localhost:3001",
      "http://localhost:3000",
      "http://localhost:3002",
      "http://192.168.0.240:3000",
    ],
  })
);
// Use bodyParser.json() to set the JSON payload limit
app.use(bodyParser.json({ limit: "50mb" }));

// Use bodyParser.urlencoded() to set the URL-encoded payload limit
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));

export default app;
