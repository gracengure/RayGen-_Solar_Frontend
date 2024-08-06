import React, { useState, useEffect } from "react";
import StarRating from "./StarRating"; // Ensure you import the StarRating component

function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/products/${productId}/reviews`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) =>
        console.error("Error fetching product reviews:", error)
      );
  }, [productId]);

  if (reviews.length === 0) {
    return <div>No reviews available for this product.</div>;
  }

  return (
    <div className="reviews-container">
      <h3>Reviews:</h3>
      {reviews.map((review) => (
        <div key={review.id} className="review">
          <p><strong>{review.comments}</strong></p>
          <p>
            <StarRating rating={review.rating} />
          </p>
          <p>{new Date(review.review_date).toLocaleDateString()} by {review.user_name}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;