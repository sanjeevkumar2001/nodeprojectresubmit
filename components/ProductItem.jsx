import "./style.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";


function ProductItem({ data }) {
  const dispatch = useDispatch();

  async function handleClick(item) {
    // 1️⃣ Add item to Redux (local cart state)
    dispatch(addItem(item));
    // 2️⃣ Send item to backend (MongoDB)
    try {
      const response = await fetch("http://localhost:5300/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });

      const result = await response.json();
     

      if (result.success) {
        alert("✅ Product added to cart!");
      } else {
        alert(`⚠️ ${result.message}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("❌ Failed to add item to cart!");
    }
  }

  return (
    <div className="product-card2">
      <img src={data.image} alt={data.name} />
      <h1>{data.name}</h1>
      <p className="price">₹{data.price}</p>

      <Link to={`/products/${data.id}`}>View More Details</Link>

      <button onClick={() => handleClick(data)}>Add to Cart</button>
    </div>
  );
}

export default ProductItem;
