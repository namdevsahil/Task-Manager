const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

// Routes
router.post("/register", register);
router.post("/login", login);



// Example test router
router.get("/test", (req, res) => {
    res.send("Auth route is working!");
});

module.exports = router;