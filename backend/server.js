const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');  // Import HTTP for Socket.io
const { Server } = require('socket.io'); // Import Socket.io
require('dotenv').config();

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow frontend
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

// ✅ CORS Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json()); // Middleware to parse JSON

// ✅ WebSocket Connection
io.on("connection", (socket) => {
    console.log("⚡ New client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
    });
});

// ✅ API Routes with WebSocket Support
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes")(io); // Pass io to routes

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("❌ MongoDB URI is missing in .env file");
    process.exit(1);
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

// ✅ Start Server with WebSockets
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
