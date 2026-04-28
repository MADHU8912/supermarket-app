import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders")
      .then(res => setOrders(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/orders/${id}`, { status });
    alert("Status Updated");
  };

  return (
    <div>
      <h2>📦 Orders</h2>

      {orders.map(order => (
        <div key={order._id} style={{ border: "1px solid black", margin: 10 }}>
          <p>Total: ₹{order.total}</p>
          <p>Status: {order.status}</p>

          <button onClick={() => updateStatus(order._id, "Shipped")}>
            Mark Shipped
          </button>

          <button onClick={() => updateStatus(order._id, "Delivered")}>
            Mark Delivered
          </button>
        </div>
      ))}
    </div>
  );
}

export default Orders;