app.post("/api/order", (req, res) => {
    const order = {
        id: "ORD" + Date.now(),
        items: req.body,
        status: "PLACED"
    };

    orders.push(order);

    res.json({
        message: "Order placed successfully",
        order
    });
});