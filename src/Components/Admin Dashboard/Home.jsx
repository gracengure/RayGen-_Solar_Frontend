// src/components/HomeWithCard.jsx
import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Avatar, Box, CardMedia, Badge } from '@mui/material';
import axios from 'axios';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// ProductCard Component
const ProductCard = ({ data }) => {
  return (
    <Card
      sx={{
        minWidth: 275,
        margin: '10px',
        textAlign: 'left',
        boxShadow: 3,
        borderRadius: 2,
        background: 'linear-gradient(to right, #e0f7fa, #b2ebf2)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        },
      }}
    >
      {/* Optional: Add a card media element if you want an image at the top */}
      
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Badge badgeContent="New" color="primary">
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mr: 2 }}>
              <ShoppingCartIcon />
            </Avatar>
          </Badge>
          <Box>
          <Typography variant="h5" component="div" sx={{ color: 'primary.main' }}>
              {data.content}
            </Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
              {data.title}
            </Typography>
            
            
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Home Component
const Home = () => {
  const [totalProducts, setTotalProducts] = useState(null);

  useEffect(() => {
    // Replace with your backend API endpoint
    axios.get('http://127.0.0.1:5000/api/products/total')
      .then(response => {
        setTotalProducts(response.data.total); // Adjust based on your API response structure
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  const cardData = {
    title: "Total Products",
    content: totalProducts !== null ? totalProducts : 'Loading...',
   
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={4}>
        <ProductCard data={cardData} />
      </Grid>
      {/* Add more cards if needed */}
    </Grid>
  );
};

export default Home;
