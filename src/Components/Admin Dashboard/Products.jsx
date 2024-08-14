import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, InputAdornment, Snackbar, Alert, CircularProgress
} from '@mui/material';
import { Edit, Delete, Add, Search } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const HeaderContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const TableHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.grey[200],
  boxShadow: `0 0 10px ${theme.palette.primary.main}`, // Glow effect
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: `0 0 15px ${theme.palette.primary.main}`, // Glow effect on hover
  },
}));

const ProductImage = styled('img')(({ theme }) => ({
  width: 100,
  height: 100,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  boxShadow: `0 0 8px ${theme.palette.primary.main}`, // Glow effect
}));

const GlowingTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'primary.main',
    },
    '&:hover fieldset': {
      borderColor: 'primary.main',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'primary.main',
      boxShadow: `0 0 8px ${theme.palette.primary.main}`, // Glow effect on focus
    },
  },
}));

const GlowingButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: '10px 20px',
  backgroundColor: 'primary.main',
  color: 'white',
  boxShadow: `0 0 10px ${theme.palette.primary.main}`, // Glow effect
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: 'primary.dark',
    boxShadow: `0 0 15px ${theme.palette.primary.main}`, // Glow effect on hover
  },
}));

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
    functionality: '',
    image_url: ''
  });
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    image_url: '',
    price: '',
    category: '',
    stock_quantity: '',
    functionality: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (category = '') => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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
        setSnackbarMessage('Product updated successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        setSnackbarMessage("Failed to update product: " + error.message);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleDelete = async (productId) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`http://127.0.0.1:5000/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (response.ok) {
        setProducts(products.filter(product => product.id !== productId));
        setSnackbarMessage('Product deleted successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to delete product');
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setSnackbarMessage("Failed to delete product: " + error.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
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
          image_url: '',
          price: '',
          category: '',
          stock_quantity: '',
          functionality: ''
        }); // Clear the form
        setSnackbarMessage('Product added successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        setSnackbarMessage("Failed to add product: " + error.message);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  return (
    <div className="products-container">
      <HeaderContainer>
        <Typography variant="h4" color="primary" gutterBottom>
          Products
        </Typography>
        <GlowingTextField
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by Category ...."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <GlowingButton
          variant="contained"
          onClick={() => setAddDialogOpen(true)}
        >
          Add Product <Add />
        </GlowingButton>
      </HeaderContainer>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {error && <Typography color="error">{error}</Typography>}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell>Image</TableHeaderCell>
                  <TableHeaderCell>Category</TableHeaderCell>
                  <TableHeaderCell>Price</TableHeaderCell>
                  <TableHeaderCell>Stock Quantity</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <ProductImage src={product.image_url} alt={product.name} />
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>Ksh {product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock_quantity}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleEdit(product)}
                        sx={{ color: 'primary.main' }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(product.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

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
            label="Category"
            name="category"
            value={productForm.category}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            value={productForm.price}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Stock Quantity"
            name="stock_quantity"
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
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addDialogOpen} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Product</DialogTitle>
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
            label="Category"
            name="category"
            value={newProductForm.category}
            onChange={handleNewProductInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            value={newProductForm.price}
            onChange={handleNewProductInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Stock Quantity"
            name="stock_quantity"
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
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddProduct} color="primary">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Products;
