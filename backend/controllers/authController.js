const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("🔹 Register Request:", req.body); // Debugging log

    let user = await User.findOne({ email });
    if (user) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    console.log("✅ User Registered:", user); // Log user details

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Server Error in Register:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// Login User

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔹 Login Request:", req.body); // Debugging log

    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Incorrect password for:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if JWT_SECRET is missing
    if (!process.env.JWT_SECRET) {
      console.log("❌ JWT_SECRET is missing in .env file");
      return res.status(500).json({ message: "Server Error: JWT_SECRET missing" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ Login successful:", email);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });

  } catch (error) {
    console.error("❌ Server Error in Login:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
