import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";

// Load env variables
dotenv.config();

// Connect Database
connectDB();

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running `);
});
