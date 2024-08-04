import React from "react";

const ProductsPage = ({ products, addToCart }) => {
  return (
    <div className="product-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3 className="product-name">{product.name}</h3>
          <img
            className="product-img"
            src={product.image_url}
            alt={product.name}
          />
          <div className="product-details">
            <p>{product.category}</p>
            <p>${product.price}</p>
            <p>In Stock: {product.stock_quantity}</p>
            <button
              onClick={() => addToCart(product.id)}
              disabled={product.stock_quantity === 0}
            >
              {product.stock_quantity > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
