import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, InputAdornment
} from '@mui/material';
import { Edit, Delete, Add, Search } from '@mui/icons-material';
import './Dashboard.css'; // Import custom styles

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category: '',
    stock_quantity: '',
    functionality: ''
  });
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    image_url:'',
    price: '',
    category: '',
    stock_quantity: '',
    functionality: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (category = '') => {
    try {
      const url = category ? `http://127.0.0.1:5000/products/category?category=${category}` : 'http://127.0.0.1:5000/products';
      const response = await fetch(url);
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

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setProductForm({
      name: product.name,
      image_url: product.image_url,
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

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm({
      ...productForm,
      [name]: value
    });
  };

  const handleNewProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductForm({
      ...newProductForm,
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
    const category = e.target.value;
    setSearchTerm(category);
    fetchProducts(category); // Fetch products based on the category search term
  };

  const handleAddProduct = () => {
    const token = localStorage.getItem("access_token");
    fetch('http://127.0.0.1:5000/products', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProductForm)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then(text => { throw new Error(text) });
        }
      })
      .then(() => {
        fetchProducts(); // Refetch the products list
        handleCloseAddDialog();
        setNewProductForm({
          name: '',
          image_url:'',
          price: '',
          category: '',
          stock_quantity: '',
          functionality: ''
        }); // Clear the form
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        setError("Failed to add product: " + error.message);
      });
  };

  return (
    <div className="products-container">
      <div className="header">
        <Typography variant="h4" sx={{ color: 'navy' }} gutterBottom>
          Products
        </Typography>
        <TextField
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
          placeholder="Search by Category ...."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{
            borderRadius: '70px',
            '& fieldset': {
              borderRadius: '70px',
              borderColor: 'navy', // Navy border color
            },
            '& input': {
              color: 'navy', // Placeholder text color
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'navy', // Border color of the text field
              },
              '&:hover fieldset': {
                borderColor: 'navy', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'navy', // Border color when focused
              },
            },
          }}
        />
        <Button
          variant="contained"
          className="add-product-button"
          onClick={() => setAddDialogOpen(true)}
          sx={{
            borderRadius: '20px',
            padding: '10px 20px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'navy',
          }}
        >
          Add Product <Add />
        </Button>
      </div>

      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="table-header-cell">Name</TableCell>
              <TableCell className="table-header-cell">Image</TableCell>
              <TableCell className="table-header-cell">Category</TableCell>
              <TableCell className="table-header-cell">Price</TableCell>
              <TableCell className="table-header-cell">Stock Quantity</TableCell>
              <TableCell className="table-header-cell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="table-row">
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="products-image"
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
            label="Image URL"
            name="image_url"
            value={productForm.image_url}
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
      <Dialog open={addDialogOpen} onClose={handleCloseAddDialog}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            value={newProductForm.name}
            onChange={handleNewProductInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Image URL"
            name="image_url"
            value={newProductForm.image_url}
            onChange={handleNewProductInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            type="number"
            value={newProductForm.price}
            onChange={handleNewProductInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Category"
            name="category"
            value={newProductForm.category}
            onChange={handleNewProductInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Stock Quantity"
            name="stock_quantity"
            type="number"
            value={newProductForm.stock_quantity}
            onChange={handleNewProductInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Functionality"
            name="functionality"
            value={newProductForm.functionality}
            onChange={handleNewProductInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddProduct}>Add Product</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Products;
