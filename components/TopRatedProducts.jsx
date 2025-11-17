import useFetch from "../utils/useFetch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css"
import NotFound from "./Notfound";


// Top rated products with more rating greater than or equal to  4.5, and we created the api using mockio website and we 
// created our own api and using useFetch we fetch the data from api .
function TopRatedProducts() {

 


  const { data, err, loading } = useFetch('http://localhost:5300/api/product');
  const [book, setBook] = useState([]);

  useEffect(() => {
    if (data) {
      setBook(data);
    }
  }, [data]);

  if (err) return <NotFound message={err}/>;
  if (loading) return <p>Loading... {loading}</p>;

  return (
  <>
     <h1 className="product-list-heading">Top Products</h1>
<div className="product-list">
  
  {book
    .filter(product => product.rating >= 4.5)
    .map(product => (
      
      
      <div key={product.id} className="product-card">
        <Link to={`/products/${product.id}`}>
         <img src={product.image} alt={product.name} />
        <h1>{product.name}</h1>
        <p className="category">{product.category}</p>
        <p className="price">₹{product.price}</p>
        <p className="rating">⭐ {product.rating}</p>
        
        </Link>
        
      </div>
    ))}
</div>
  </>
   

  );
}

export default TopRatedProducts;
