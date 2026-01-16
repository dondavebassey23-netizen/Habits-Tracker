import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  createHabitHandler,
  getHabitsHandler,
  updateHabitHandler,
  deleteHabitHandler,
} from "../controllers/habitController.js";
import { validateBody } from "../middleware/validate.js";
import { createHabitSchema, updateHabitSchema } from "../validators/habitValidator.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateBody(createHabitSchema), createHabitHandler);
router.get("/", getHabitsHandler);
router.put("/:id", validateBody(updateHabitSchema), updateHabitHandler);
router.delete("/:id", deleteHabitHandler);

export default router;

