import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import './Dashboard.css'; // Import custom styles

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category: '',
    stock_quantity: '',
    functionality: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setProductForm({
      name: product.name,
      image_url:product.image_url,
      price: product.price,
      category: product.category,
      stock_quantity: product.stock_quantity,
      functionality: product.functionality
    });
    setEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setEditDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm({
      ...productForm,
      [name]: value
    });
  };

  const handleUpdate = () => {
    const token = localStorage.getItem("access_token");
    fetch(`http://127.0.0.1:5000/products/${selectedProduct.id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productForm)
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then(text => { throw new Error(text) });
      }
    })
    .then(() => {
      setProducts(products.map(product => 
        product.id === selectedProduct.id ? { ...product, ...productForm } : product
      ));
      handleCloseDialog();
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      setError("Failed to update product: " + error.message);
    });
  };

  const handleDelete = (productId) => {
    const token = localStorage.getItem("access_token");
    fetch(`http://127.0.0.1:5000/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })
    .then((response) => {
      if (response.ok) {
        console.log("Product deleted successfully");
        setProducts(products.filter(product => product.id !== productId));
      } else {
        return response.text().then(text => { throw new Error(text) });
      }
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
      setError("Failed to delete product: " + error.message);
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-container">
      <div className="header">
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <TextField
  label="Search"
  variant="outlined"
  value={searchTerm}
  onChange={handleSearchChange}
  className="search-bar"
  // Adjust width here
/>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          className="add-product-button"
        >
          Add Product
        </Button>
      </div>
      
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
            {filteredProducts.map((product) => (
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
                  <IconButton
                    onClick={() => handleEdit(product)}
                    sx={{ color: 'blue' }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(product.id)}
                    sx={{ color: 'red' }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={editDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            value={productForm.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            type="number"
            value={productForm.price}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Category"
            name="category"
            value={productForm.category}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Stock Quantity"
            name="stock_quantity"
            type="number"
            value={productForm.stock_quantity}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Functionality"
            name="functionality"
            value={productForm.functionality}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Products;
