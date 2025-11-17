import { useParams, Link } from "react-router-dom";
import useFetch from "../utils/useFetch";
import { useEffect, useState } from "react";
import "./style.css"; 
import NotFound from "./Notfound";

function ProductDetail() {
  const { data, err, loading } = useFetch("http://localhost:5300/api/product");
  const [products, setProducts] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false); // to manage add-to-cart state
  const params = useParams();

  useEffect(() => {
    if (data) setProducts(data); // data.products if API returns {products: [...]}
  }, [data]);

  if (err) return <NotFound message={err} />;
  if (loading) return <p className="loading">Loading...</p>;

  const productId = parseInt(params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) return <p className="error">Product not found!</p>;

  // Add to Cart function
 const handleAddToCart = async () => {
  setLoadingCart(true);
  try {
    const response = await fetch("http://localhost:5300/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: product.id }) // Send the product id
    });

    const result = await response.json();

    if (result.success) {
      alert(result.message); // "Product added to cart" or "Product quantity updated in cart"
    } else {
      alert("Failed to add to cart: " + result.message);
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    alert("Something went wrong!");
  } finally {
    setLoadingCart(false);
  }
};



  return (
    <div className="product-detail-container">
      <div className="product-card1">
        <img src={product.image} alt={product.name} className="product-image1" />
        <h1 className="product-title">{product.name}</h1>
        <p className="product-category">{product.category}</p>
        <p className="product-price">₹{product.price}</p>
        <p className="product-rating">⭐ {product.rating}</p>
        <p className="product-description">{product.description}</p>

        <button onClick={handleAddToCart} disabled={loadingCart}>
          {loadingCart ? "Adding..." : "Add to Cart"}
        </button>

        <div className="detail-buttons">
          <Link to="/products">
            <button>Back to Product Collections</button>
          </Link>
          <Link to="/">
            <button>Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
