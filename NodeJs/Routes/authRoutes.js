const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userModel } = require("../Model/products.model");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await userModel.create({
      name,
      email,
      password: hashedPassword
    });

    res.json({ success: true, message: "User registered", user });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Incorrect password" });

    
      console.log("JWT_SECRET:", process.env.JWT_SECRET);
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ success: true, token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Login error" });
  }
});

module.exports = router;
