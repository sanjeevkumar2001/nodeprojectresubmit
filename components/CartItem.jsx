import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, removeItem } from "../utils/cartSlice";

function CartItem({ data }) {
  const dispatch = useDispatch();

  // Get latest quantity from Redux
  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === data.id)
  );

  const quantity = cartItem?.quantity || 1;

   const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id: data.id, quantity: newQuantity }));
  };
  const handleRemove = async () => {
    try {
      const response = await fetch(`http://localhost:5300/api/cart/${data.id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        dispatch(removeItem(data.id));
        alert("🗑️ Product removed from cart!");
      } else {
        alert(result.message || "Failed to remove product");
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="cart-item">
      <img src={data.image} alt={data.name} />
      <div className="cart-item-info">
        <h2>{data.name}</h2>
        <p className="cart-price">₹{data.price}</p>

        <div className="quantity-controls">
          <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
        </div>

        <button className="cart-remove" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
