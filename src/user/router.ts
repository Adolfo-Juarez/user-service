import express from "express";
import { createUserController, authUserController } from "./controller/UserController.ts";

const router = express.Router();

router.post("/", createUserController);
router.post("/auth", authUserController);

export default router;