const express = require("express");
const connectDB = require("./config/db.js"); // Import DB connection function
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes.js");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
connectDB(); // CALL this function to actually connect!

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
