const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();

// ✅ Correctly Configure CORS Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Allow frontend origin
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow specific HTTP methods
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow these headers
    res.header("Access-Control-Allow-Credentials", "true"); // Allow cookies & credentials
    if (req.method === "OPTIONS") {
        return res.sendStatus(200); // Handle preflight requests
    }
    next();
});

app.use(express.json()); // Middleware to parse JSON

// ✅ Example API Routes

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.post('/api/auth/login', (req, res) => {
    res.json({ message: "Login successful" });
});
app.post('/api/auth/register', (req, res) => {
    res.json({ message: "Registration successful" });
});

// ✅ MongoDB Connection with Better Error Handling
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("❌ MongoDB URI is missing in .env file");
    process.exit(1); // Stop server if URI is missing
}

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
