import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h1>🏪 Supermarket</h1>
      {products.map(p => (
        <div key={p._id}>
          {p.name} - ₹{p.price}
        </div>
      ))}
    </div>
  );
}

export default App;