const express = require("express");
const router = express.Router();

// GET CART
router.get("/", (req, res) => {
  res.json({ message: "Cart API working" });
});

module.exports = router;