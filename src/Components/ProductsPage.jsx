import React from "react";
import { Link } from "react-router-dom";
// Helper function to group products by category
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
  // Group products by category
  const categorizedProducts = groupByCategory(products);

  return (
    <div className="product-container">
      {Object.keys(categorizedProducts).map((category) => (
        <div
          key={category}
          id={category.toLowerCase().replace(/\s+/g, '-')} // Create an id for the section
          className="category-section"
        >
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
                    onClick={() => addToCart(product.id)}
                    disabled={product.stock_quantity === 0}
                  >
                    {product.stock_quantity > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
