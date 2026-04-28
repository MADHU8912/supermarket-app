import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders/analytics")
      .then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h1>📊 Admin Analytics Dashboard</h1>

      <h3>Total Sales: ₹{data.totalSales}</h3>
      <h3>Total Orders: {data.totalOrders}</h3>
      <h3>Paid Orders: {data.paidOrders}</h3>
      <h3>Pending Orders: {data.pendingOrders}</h3>
    </div>
  );
}

export default Dashboard;