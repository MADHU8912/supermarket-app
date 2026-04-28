const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🧠 fake database
let orders = [];

// 🏠 home route
app.get("/", (req, res) => {
    res.send("Supermarket Backend Running");
});

// 🛒 order API
app.post("/api/order", (req, res) => {
    const order = {
        id: "ORD" + Date.now(),
        items: req.body,
        status: "PLACED"
    };

    orders.push(order);

    res.json(order);
});

// 👨‍💼 ADMIN API
app.get("/api/admin/orders", (req, res) => {
    res.json({
        totalOrders: orders.length,
        orders: orders
    });
});

// 🚀 server start
app.listen(3000, () => {
    console.log("Backend running on port 3000");
});