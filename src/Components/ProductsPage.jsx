import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const groupByCategory = (products) => {
  return products.reduce((categories, product) => {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
    return categories;
  }, {});
};

const ProductsPage = ({ products, addToCart }) => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

  const handleAddToCart = (productId) => {
    addToCart(productId);
    showSnackbar("Product has been added to cart");

    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      showSnackbar("Please log in to proceed with checkout.");
    }
  };

  // Function to show the snackbar with a message
  const showSnackbar = (message) => {
    setSnackbar({ visible: true, message });
    setTimeout(() => {
      setSnackbar({ visible: false, message: "" });
    }, 3000);
  };

  const categorizedProducts = groupByCategory(products);

  return (
    <div className="product-container">
      {Object.keys(categorizedProducts).map((category) => (
        <div key={category} className="category-section">
          <h1 id={category}></h1>
          <h2 className="category-title">{category}</h2>
          <div className="product-list">
            {categorizedProducts[category].map((product) => (
              <div key={product.id} className="product-card">
                <h3 className="product-name">{product.name}</h3>
                <Link to={`/product/${product.id}`}>
                  <img
                    className="product-img"
                    src={product.image_url}
                    alt={product.name}
                  />
                </Link>
                <div className="product-details">
                  <p>Price: Ksh {product.price}</p>
                  <p>In Stock: {product.stock_quantity}</p>
                  <button
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(product.id)}
                    disabled={product.stock_quantity === 0}
                  >
                    {product.stock_quantity > 0
                      ? "Add to Cart"
                      : "Out of Stock"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {snackbar.visible && (
        <div className="snackbar success">{snackbar.message}</div>
      )}
    </div>
  );
};

export default ProductsPage;
