import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart } from "../utils/cartSlice";
import "./style.css";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

function Cart() {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  // Total price considering quantity
    const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // Clear cart both in Redux and backend
  const handleClear = async () => {
    try {
      const response = await fetch("http://localhost:5300/api/cart", {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        dispatch(clearCart());
        alert("🗑️ Cart cleared successfully!");
      } else {
        alert(result.message || "Failed to clear cart");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert("❌ Failed to clear cart!");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="empty cart"
        />
        <h2>Your cart is empty!</h2>
        <p>Looks like you haven’t added anything yet.</p>
      </div>
    );
  }

  return (
    <div className="cart-wrapper">
      <h1 className="cart-title">🛍️ Your Shopping Cart</h1>

      <div className="cart-grid">
        {cartItems.map((item, index) => (
          <CartItem key={index} data={item} index={index} />
        ))}
      </div>

      <div className="cart-summary">
        <h2>Total: ₹{total}</h2>
        <button className="cart-clear" onClick={handleClear}>
          Clear Cart
        </button>
        <Link to="/checkout">
          <button className="checkout-btn">Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
