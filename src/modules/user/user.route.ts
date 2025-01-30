import { Router } from "express";
import * as userController from "./user.controller";

const router: Router = Router();

router.post("/create-user", userController.registerUser);
router.post("/login", userController.loginUser);

export default router;