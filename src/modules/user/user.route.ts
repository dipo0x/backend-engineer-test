import { Router } from "express";
import * as  userController from "./user.controller";

const router: Router = Router();

router.post("/create-user", userController.registerUserHandler);
router.post("/login", userController.loginUserHandler);

export default router;