const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      console.error("❌ No token found in request headers.");
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const tokenValue = token.replace("Bearer ", "");
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.error("❌ User not found in database for ID:", decoded.id);
      return res.status(401).json({ message: "User not found. Invalid token." });
    }

    req.user = user; // ✅ Now we are sure `req.user` is valid
    console.log("🔑 Authenticated User ID:", req.user.id); // Debugging

    next();
  } catch (error) {
    console.error("❌ Invalid Token:", error.message);
    res.status(401).json({ message: "Invalid token. Please log in again." });
  }
};
