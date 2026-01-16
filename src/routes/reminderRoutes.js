import express from "express";
import authMiddleware from "../middleware/auth.js";
import { getTodayReminders } from "../controllers/reminderController.js";
import reminderRoutes from "./reminderRoutes.js";

const router = express.Router();

router.use(authMiddleware);

router.use("/reminders", reminderRoutes)

router.get("/", getTodayReminders);

export default router;