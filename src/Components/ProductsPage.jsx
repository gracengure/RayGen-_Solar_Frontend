import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const groupByCategory = (products) => {
  return products.reduce((categories, product) => {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
    return categories;
  }, {});
};

const ProductsPage = ({ products = [], addToCart }) => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

  // Group products by category
  const categorizedProducts = groupByCategory(products);
  const categories = Object.keys(categorizedProducts);
  const [currentPage, setCurrentPage] = useState(0);

  const handleAddToCart = (productId) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      addToCart(productId);
      showSnackbar("Product has been added to cart");
    } else {
      navigate("/login");
    }
  };

  const showSnackbar = (message) => {
    setSnackbar({ visible: true, message });
    setTimeout(() => {
      setSnackbar({ visible: false, message: "" });
    }, 3000);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, categories.length - 1));
  };

  // Ensure the current category and productsToShow exist
  const currentCategory = categories[currentPage];
  const productsToShow = categorizedProducts[currentCategory] || [];

  return (
    <>
      <div className="product-container">
        {/* Render only if the category and products exist */}
        {currentCategory && (
          <div key={currentCategory} className="category-section">
              <h1 id={currentCategory}></h1>
            <h2 className="category-title">{currentCategory}</h2>
            <div className="product-list">
              {productsToShow.map((product) => (
                <div key={product.id} className="product-card">
                  <Link to={`/product/${product.id}`}>
                    <img
                      className="product-img"
                      src={product.image_url}
                      alt={product.name}
                    />
                  </Link>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-details">
                    <p className="product-price">Ksh {product.price}</p>
                    <button
                      className="add-to-cart-button"
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product.stock_quantity === 0}
                    >
                      <FontAwesomeIcon icon={faShoppingBasket} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Pagination Controls */}
      {categories.length > 0 && (
        <div className="pagination-controls">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className="arrow-button"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span className="page-number">{currentPage + 1}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === categories.length - 1}
            className="arrow-button"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}

      {snackbar.visible && (
        <div className="snackbar success">{snackbar.message}</div>
      )}
    </>
  );
};

export default ProductsPage;
