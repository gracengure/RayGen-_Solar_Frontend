import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Reviews from "./Reviews";


function ProductsSpecs() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="product-specs-card">
        <div className="product-specs-header">
          <img
            src={product.image_url}
            alt={product.name}
            className="product-image"
          />
          <div className="details-container">
            <h2 className="product-name">{product.name}</h2>
            <div className="property-spec">
              <span className="spec-label">Functionality:</span>
              <span className="spec-value">{product.functionality}</span>
            </div>
            <div className="property-spec">
              <span className="spec-label">Category:</span>
              <span className="spec-value">{product.category}</span>
            </div>
            <div className="property-spec">
              <span className="spec-label">Price:</span>
              <span className="spec-value">Ksh {product.price}</span>
            </div>
            <div className="property-spec">
              <span className="spec-label">Stock Quantity:</span>
              <span className="spec-value">{product.stock_quantity}</span>
            </div>
          </div>
        </div>
        <div className="reviews-container">
          <Reviews productId={productId} />
        </div>
      </div>
    </div>
  );
}

export default ProductsSpecs;
