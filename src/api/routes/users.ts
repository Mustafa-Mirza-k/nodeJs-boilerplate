import { Router } from "express";
import userController from "../controllers/users";
import validationHandler from "../../middlewares/validation";
import userSchema from "../../validators/users";

const router = Router();

router.post("/", validationHandler(userSchema), userController.create);
router.get("/:id", userController.get);
router.get("/", userController.getAll);
router.delete("/:id", userController.delete);

export default router;
