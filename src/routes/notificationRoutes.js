import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  getNotificationsHandler,
  markAsReadHandler,
} from "../controllers/notificationController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getNotificationsHandler);
router.patch("/:id/read", markAsReadHandler);

export default router;

