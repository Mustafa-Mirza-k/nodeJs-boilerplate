import authHandler from "../../middlewares/auth";
import usersRoutes from "./users";
import authRoutes from "./auth";
var router = require("express").Router();

// Insert routes below
router.use("/", authRoutes);
router.use("/user", authHandler, usersRoutes);

module.exports = router;
