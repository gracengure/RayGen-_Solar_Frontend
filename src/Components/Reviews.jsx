import React, { useState, useEffect } from "react";
import StarRating from "./StarRating"; // Ensure you import the StarRating component
import Modal from "./Modal"; // Import the Modal component
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    comments: "",
    rating: 1,
  });
  const [userName, setUserName] = useState(""); // Assuming userName is required for the review
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('token')); // Fetch JWT from localStorage

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:5000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      },
      body: JSON.stringify({
        product_id: productId,
        comments: newReview.comments,
        rating: newReview.rating,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setReviews((prevReviews) => [
          ...prevReviews,
          {
            id: data.new_review_id,
            comments: newReview.comments,
            rating: newReview.rating,
            review_date: new Date().toISOString().split('T')[0], // Set current date
            user_name: userName, // Assuming you want to display the user name
          },
        ]);
        setNewReview({
          comments: "",
          rating: 1,
        });
        setUserName("");
        setIsModalOpen(false); // Close the modal after submission
      })
      .catch((error) =>
        console.error("Error creating review:", error)
      );
  };

  const handleDelete = (reviewId) => {
    fetch(`http://127.0.0.1:5000/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${jwtToken}`
      },
    })
      .then((response) => {
        if (response.ok) {
          setReviews((prevReviews) =>
            prevReviews.filter((review) => review.id !== reviewId)
          );
        } else {
          console.error("Failed to delete review");
        }
      })
      .catch((error) => console.error("Error deleting review:", error));
  };

  return (
    <div className="reviews-container">
      <Typography variant="h5">Reviews:</Typography>
      {reviews.length === 0 ? (
        <Typography>No reviews available for this product.</Typography>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="review" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Typography variant="body1"><strong>{review.comments}</strong></Typography>
              <Typography>
                <StarRating rating={review.rating} />
              </Typography>
              <Typography variant="body2">{new Date(review.review_date).toLocaleDateString()} by {review.user_name}</Typography>
            </div>
            <IconButton onClick={() => handleDelete(review.id)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </div>
        ))
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsModalOpen(true)}
      >
        Create Review
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Typography variant="h6">Leave a review:</Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Comment"
              name="comments"
              value={newReview.comments}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
              required
            />
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel>Rating</InputLabel>
              <Select
                name="rating"
                value={newReview.rating}
                onChange={handleInputChange}
                required
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <MenuItem key={rating} value={rating}>
                    {rating} Star{rating > 1 ? 's' : ''}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <TextField
              label="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              fullWidth
              required
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Submit Review
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default Reviews;
