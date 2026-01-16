import express from "express";
import authMiddleware from "../middleware/auth.js";
import { updateReminderTime } from "../controllers/userController.js";

const router = express.Router();

router.use(authMiddleware);

router.patch("/reminder-time", updateReminderTime);

export default router;
