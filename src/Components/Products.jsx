import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: '',
        stockQuantity: '',
        imageUrl: '',
        functionality: '',
    });

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            const response = await fetch('/products');
            const data = await response.json();
            setProducts(data);
        };
        fetchData();
    }, []);

    const handleSearch = async (event) => {
        setSearch(event.target.value);
        const response = await fetch(`/products?name=${event.target.value}`);
        const data = await response.json();
        setProducts(data);
    };

    const handleAddProduct = async () => {
        await fetch('/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        });
        setOpenAddDialog(false);
        // Refresh products list
        const response = await fetch('/products');
        const data = await response.json();
        setProducts(data);
    };

    const handleEditProduct = (productId) => {
        // Navigate to edit product page or open modal
    };

    const handleDeleteProduct = async (productId) => {
        await fetch(`/products/${productId}`, { method: 'DELETE' });
        setProducts(products.filter(product => product.id !== productId));
    };

    return (
        <div className="products">
            <div className="products-header">
                <h1>Products</h1>
                <TextField 
                    label="Search product ..."
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={handleSearch}
                />
                <Button variant="contained" color="primary" onClick={() => setOpenAddDialog(true)}>Add product</Button>
            </div>
            <TableContainer component={Paper}>
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
                                        src={product.imageUrl || 'default-image-url.jpg'} 
                                        alt={product.name} 
                                        style={{ width: '100px', height: 'auto' }} 
                                    />
                                </TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.stockQuantity}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEditProduct(product.id)}>Edit</Button>
                                    <Button onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="number"
                        fullWidth
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        >
                            <MenuItem value="Solar Panel Light">Solar Panel Light</MenuItem>
                            <MenuItem value="Solar Wall Light">Solar Wall Light</MenuItem>
                            <MenuItem value="Solar Street Light">Solar Street Light</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        label="Stock Quantity"
                        type="number"
                        fullWidth
                        value={newProduct.stockQuantity}
                        onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Image URL"
                        fullWidth
                        value={newProduct.imageUrl}
                        onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Functionality"
                        fullWidth
                        value={newProduct.functionality}
                        onChange={(e) => setNewProduct({ ...newProduct, functionality: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddProduct}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Products;
