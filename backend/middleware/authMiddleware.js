const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    const tokenValue = token.replace("Bearer ", "");
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");
    console.log("🔑 Authenticated User ID:", req.user.id); // Debugging

    next();
  } catch (error) {
    console.error("❌ Invalid Token:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
