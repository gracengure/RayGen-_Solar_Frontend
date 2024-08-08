import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import './Dashboard.css'; // Import custom styles

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          setError('Failed to fetch products.');
        }
      } catch (err) {
        setError('Error fetching products.');
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    // Handle edit action
    console.log('Edit product with ID:', id);
  };

  const handleDelete = (id) => {
    // Handle delete action
    console.log('Delete product with ID:', id);
  };

  return (
    <div className="products-container">
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="product-image"
                  />
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>Ksh {product.price.toFixed(2)}</TableCell>
                <TableCell className="stock-quantity">{product.stock_quantity}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(product.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Products;
