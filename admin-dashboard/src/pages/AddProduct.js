import { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: ""
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    await axios.post("http://localhost:5000/api/products/add", product);
    alert("Product Added Successfully");
  };

  return (
    <div>
      <h2>➕ Add Product</h2>

      <input name="name" placeholder="Name" onChange={handleChange} /><br />
      <input name="price" placeholder="Price" onChange={handleChange} /><br />
      <input name="category" placeholder="Category" onChange={handleChange} /><br />
      <input name="stock" placeholder="Stock" onChange={handleChange} /><br />

      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default AddProduct;