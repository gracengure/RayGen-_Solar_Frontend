import React from 'react';

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {Array(fullStars)
        .fill()
        .map((_, index) => (
          <span key={index} className="star">&#9733;</span>
        ))}
      {halfStar && <span className="star">&#9733;</span>}
      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <span key={index} className="star">&#9734;</span>
        ))}
    </div>
  );
}

export default StarRating;