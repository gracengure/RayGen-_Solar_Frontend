import React ,{useState,useEffect} from 'react';
import ProductsPage from "./Components/ProductsPage";



import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Signup from './Components/Auth/Signup.jsx';
import Login from './Components/Auth/Login.jsx';


function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    
    fetch("http://127.0.0.1:5000/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error.message);
      });
  }, []);

  const addToCart = (productId) => {
    const product = products.find((p) => p.id === productId);

    if (product && product.stock_quantity > 0) {
      const existingItem = cartItems.find((item) => item.id === productId);

      if (existingItem) {
        const updatedCart = cartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCartItems(updatedCart);
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }

      const updatedProducts = products.map((p) =>
        p.id === productId ? { ...p, stock_quantity: p.stock_quantity - 1 } : p
      );
      setProducts(updatedProducts);
    }
  };

  useEffect(() => {
    const totalItems = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCount(totalItems);
  }, [cartItems]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      
    </Routes>
  );
}

export default App;