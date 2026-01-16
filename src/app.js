import express from "express";
import cors from "cors";

import router from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";

import { generalLimiter } from "./middleware/rateLimiter.js";
import "./jobs/reminderJob.js";
import userRoutes from "./routes/userRoutes.js";


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(generalLimiter);


// Routes
app.use("/api", router);
app.use("/api/users", userRoutes);





// Health check route
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Habit Tracker API is running 🚀" });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
