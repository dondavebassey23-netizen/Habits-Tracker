import express from "express";
import authMiddleware from "../middleware/auth.js";
import { markCompletionHandler, getStreakHandler } from "../controllers/completionController.js";
import { validateBody } from "../middleware/validate.js";
import { completionSchema } from "../validators/completionValidator.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateBody(completionSchema), markCompletionHandler);
router.get("/streak/:habitId", getStreakHandler);

export default router;
