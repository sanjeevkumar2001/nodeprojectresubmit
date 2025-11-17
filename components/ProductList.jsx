import useFetch from "../utils/useFetch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css"
import ProductItem from "./ProductItem";
import NotFound from "./Notfound";

// product list displays the list of products available in our own api , that we created usiong mocji website

function ProductList() {
  const { data, err, loading } = useFetch('http://localhost:5300/api/product');
  const [book, setBook] = useState([]);
  const[input,setinput] = useState("");

  useEffect(() => {
    if (data) {
      setBook(data);
    }
  }, [data]);

    if (err) return <NotFound message={err}/>;
  if (loading) return <p>Loading... {loading}</p>;

  function handleClick(){
        const filteredbooks = book.filter(book => book.name.toLowerCase().includes(input.toLowerCase()))
       
        setBook(filteredbooks);
        setinput("")
        
  }
  function handleClick1(){
    setBook(data.products)
  }

  return (
  <>
     <h1 className="product-list-heading">Products Collections</h1>
     <div className="product-search">
       < input type="text" onChange={(e) => setinput(e.target.value)} value={input}/>
     <button  onClick={handleClick}>Search by Product Name</button>
   
       <button onClick={handleClick1}>Back to Product collections after filtering</button>
   
     </div>
     
     <div className="product-list">

  {book
    
    .map(product => (
      <ProductItem  key ={product.id}data={product}></ProductItem>
    ))}

     
  </div>
  
  </>
   

  );
}

export default ProductList;
