const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("🏪 Supermarket Backend Running");
});

// Sample products API
app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Rice", price: 60 },
    { id: 2, name: "Sugar", price: 40 }
  ]);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});