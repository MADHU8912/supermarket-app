const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: Array,
  total: Number,

  // ✅ PAYMENT STATUS FIELD
  status: {
    type: String,
    default: "Pending" // Pending | Paid | Failed
  }
});

module.exports = mongoose.model("Order", orderSchema);