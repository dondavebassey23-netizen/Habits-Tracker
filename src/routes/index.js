import express from "express";
import authRoutes from "./authRoutes.js";
import habitRoutes from "./habitRoutes.js";
import completionRoutes from "./completionRoutes.js";
import analyticsRoutes from "./analyticsRoutes.js";
import notificationRoutes from "./notificationRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/habits", habitRoutes);
router.use("/completions", completionRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/notifications", notificationRoutes);

export default router;

