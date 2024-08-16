import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemText, Drawer, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// Replace with the path to your image
import SidebarImage from '../../assets/logo.jpg';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const handleSignOut = () => {
    // Clear authentication data
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("isAuthenticated");
    
    // Optionally redirect to the login page
    navigate("/login");
  };

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // Function to determine if a link is active
  const isActiveLink = (path) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 200,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 200,
          boxSizing: 'border-box',
          backgroundColor: 'white', // Background color
        },
      }}
    >
      {/* Image at the top of the sidebar */}
      <Box>
        <img
          src={SidebarImage}
          alt="Sidebar Image"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </Box>

      <List>
        <ListItem 
          button 
          component={Link} 
          to="/dashboard/home"
          sx={{ 
            backgroundColor: isActiveLink('/dashboard/home') ? 'dodgerblue' : 'transparent' 
          }}
        >
          <HomeIcon sx={{ marginRight: '10px' }} />
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem 
          button 
          style={{ marginTop: '20px' }} 
          component={Link} 
          to="/dashboard/products"
          sx={{ 
            backgroundColor: isActiveLink('/dashboard/products') ? 'dodgerblue' : 'transparent' 
          }}
        >
          <ShoppingCartIcon sx={{ marginRight: '10px' }} />
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem 
          button 
          style={{ marginTop: '20px' }} 
          component={Link} 
          to="/dashboard/customers"
          sx={{ 
            backgroundColor: isActiveLink('/dashboard/customers') ? 'dodgerblue' : 'transparent' 
          }}
        >
          <PeopleIcon sx={{ marginRight: '10px' }} />
          <ListItemText primary="Customers" />
        </ListItem>
        <ListItem 
          button 
          style={{ marginTop: '20px' }} 
          component={Link} 
          to="/dashboard/orders"
          sx={{ 
            backgroundColor: isActiveLink('/dashboard/orders') ? 'dodgerblue' : 'transparent' 
          }}
        >
          <AssignmentIcon sx={{ marginRight: '10px' }} />
          <ListItemText primary="Orders" />
        </ListItem>

        {/* Sign Out button */}
        {isAuthenticated ? (
          <ListItem 
            button 
            style={{ marginTop: '20px' }} 
            onClick={handleSignOut}
          >
            <ExitToAppIcon sx={{ marginRight: '10px' }} />
            <ListItemText primary="Sign Out" />
          </ListItem>
        ) : (
          <Link to="/signup">
            <button className="sign-up-button">Sign Up</button>
          </Link>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
