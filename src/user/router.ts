import express from "express";
import { createUserController, authUserController, getProfileController } from "./controller/UserController.ts";

const router = express.Router();

router.post("/", createUserController);
router.post("/auth", authUserController);
router.get("/", getProfileController);

export default router;