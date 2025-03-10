const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    
    if (!authHeader) {
      console.error("❌ No Authorization header found.");
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Ensure token starts with "Bearer "
    if (!authHeader.startsWith("Bearer ")) {
      console.error("❌ Invalid token format.");
      return res.status(401).json({ message: "Invalid token format. Use 'Bearer <token>'" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is missing in .env file.");
      return res.status(500).json({ message: "Server error: JWT_SECRET missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.error("❌ User not found in database for ID:", decoded.id);
      return res.status(401).json({ message: "User not found. Invalid token." });
    }

    req.user = user; // ✅ Attach user data to request object
    console.log("🔑 Authenticated User:", req.user.email); // Debugging

    next();
  } catch (error) {
    console.error("❌ Token validation failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token. Please log in again." });
  }
};
