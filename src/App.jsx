import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import products from "./db/data";
import Recommended from "./Recommended/Recommended";
import Sidebars from "./Sidebar/Sidebars";
import Card from "./components/Card";
import "./index.css";
import CartPage from "./components/CartPage";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([])

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      console.log("Current cart:", prevCart); // Log the current state of the cart
      if (!Array.isArray(prevCart)) {
        console.error("prevCart is not an array:", prevCart);
        return [product];
      }
      return [...prevCart, product];
    });
    toast.success(`${product.title} has been added to your cart!`);
  };
  

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }

    return filteredProducts.map(
      ({ img, title, star, reviews, prevPrice, newPrice }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
          addToCart={() => addToCart({ img, title, star, reviews, prevPrice, newPrice })}
        />
      )
    );
  }

  const result = filteredData(products, selectedCategory, query);

  return (
    <Router>
      <Sidebars handleChange={handleChange} />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleClick} />
  
      <Routes> {/* Change this line */}
        <Route path="/cart" element={<CartPage cart={cart} />} /> {/* Update this line */}
        <Route path="/" element={<Products result={result} />} /> {/* Update this line */}
      </Routes> {/* Change this line */}
      
      <ToastContainer position="bottom-left" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
    </Router>
  );
  
}

export default App;