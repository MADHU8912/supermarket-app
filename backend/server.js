const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// IMPORT ROUTES
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

// REGISTER ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Supermarket Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});