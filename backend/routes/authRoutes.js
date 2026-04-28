const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });

  if (!admin) return res.json({ message: "User not found" });

  const match = await bcrypt.compare(password, admin.password);

  if (!match) return res.json({ message: "Invalid password" });

  const token = jwt.sign({ id: admin._id }, "SECRET_KEY", {
    expiresIn: "1h"
  });

  res.json({ token });
});

module.exports = router;