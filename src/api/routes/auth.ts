import { Router } from "express";
import validationHandler from "../../middlewares/validation";
import userSchema from "../../validators/users";
import authController from "../controllers/auth";
import authSchema from "../../validators/auth";

const router = Router();

router.post("/login", validationHandler(authSchema), authController.login);
router.post("/signup", validationHandler(userSchema), authController.signup);

export default router;
