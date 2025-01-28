import { Router } from "express";
import * as  userController from "./user.controller";

const router: Router = Router();

router.post("/create-user", userController.registerUserHandler);

export default router;