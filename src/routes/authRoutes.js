import express from "express";
import { register, login } from "../controllers/authController.js";
import { validateBody } from "../middleware/validate.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";
import { authLimiter } from "../middleware/rateLimiter.js";
import { verifyEmail } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", authLimiter, validateBody(registerSchema), register);
router.get("/verify-email/:token", verifyEmail);
router.post("/login", authLimiter, validateBody(loginSchema), login);

export default router;

