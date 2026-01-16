import express from "express";
import authMiddleware from "../middleware/auth.js";
import { getAnalyticsHandler } from "../controllers/analyticsController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAnalyticsHandler);

export default router;
