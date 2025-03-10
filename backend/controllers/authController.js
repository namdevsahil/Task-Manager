const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("🔹 Register Request:", req.body); // Debugging log

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email: email.trim() });
    if (user) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password.trim(), salt);

    user = new User({ name: name.trim(), email: email.trim(), password: hashedPassword });
    await user.save();

    console.log("✅ User Registered:", user); // Log user details

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Server Error in Register:", error);
    res.status(500).json({ message: "Server Error. Please try again later." });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔹 Login Request:", req.body); // Debugging log

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email: email.trim() });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      console.log("❌ Incorrect password for:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!process.env.JWT_SECRET) {
      console.log("❌ JWT_SECRET is missing in .env file");
      return res.status(500).json({ message: "Server Error: JWT_SECRET missing" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ Login successful:", email);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });

  } catch (error) {
    console.error("❌ Server Error in Login:", error);
    res.status(500).json({ message: "Server Error. Please try again later." });
  }
};
