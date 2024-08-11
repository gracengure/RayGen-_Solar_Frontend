import React ,{useState,useEffect} from 'react';
import ProductsPage from "./Components/ProductsPage";
import HomePage from './Components/HomePage';
import Footer from "./Footer"
import About from "./About"
import Dashboard  from "./Components/Admin Dashboard/Dashboard";
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
    <>
    <HomePage cartCount={cartCount} />
    <ProductsPage
    products={products}
    addToCart={addToCart}
    
  />
  <About/>
  <Footer/>
  
 <Dashboard/>

  </>
  );
}

export default App;
