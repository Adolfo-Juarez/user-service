import express from "express";
import { createUserController, authUserController, getProfileController, sendRecoveryPasswordController } from "./controller/UserController.ts";

const router = express.Router();

router.post("/", createUserController);
router.post("/auth", authUserController);
router.get("/", getProfileController);
router.post("/recovery", sendRecoveryPasswordController);

export default router;