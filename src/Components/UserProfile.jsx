import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Button, Grid, Typography, Container, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const OuterCard = styled(Card)(({ theme }) => ({
  maxWidth: 800, // Increased width for the outer card
  margin: theme.spacing(2),
  padding: theme.spacing(3), // Increase padding for better spacing
}));

const InnerCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px', // Visible border radius
  margin: theme.spacing(2, 0),
  padding: theme.spacing(2),
  border: `2px solid grey`, // Grey border color
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
}));

const TitleBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('https://raygen-solar-backend-jmfq.onrender.com/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo({
            name: data.name,
            address: data.address,
            phone: data.phone_number,
            email: data.email,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          });
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch user profile.');
        }
      } catch (error) {
        setError('Error fetching user profile.');
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async () => {
    try {
      const response = await fetch('https://raygen-solar-backend-jmfq.onrender.com/user/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          name: userInfo.name,
         
          phone: userInfo.phone,
          email: userInfo.email,
        }),
      });

      if (response.ok) {
        setSuccessMessage('Profile updated successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update profile.');
      }
    } catch (error) {
      setError('Error updating profile.');
    }
  };

  const handleChangePassword = async () => {
    if (userInfo.newPassword !== userInfo.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
  
    try {
      const response = await fetch('https://raygen-solar-backend-jmfq.onrender.com/user/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          currentPassword: userInfo.currentPassword,
          newPassword: userInfo.newPassword,
          confirmPassword: userInfo.confirmPassword, // Make sure this is also sent if needed
        }),
      });
  
      if (response.ok) {
        setSuccessMessage('Password changed successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to change password.');
      }
    } catch (error) {
      setError('Error changing password.');
    }
  };
  
  const togglePasswordVisibility = (field) => {
    switch (field) {
      case 'currentPassword':
        setShowCurrentPassword((prev) => !prev);
        break;
      case 'newPassword':
        setShowNewPassword((prev) => !prev);
        break;
      case 'confirmPassword':
        setShowConfirmPassword((prev) => !prev);
        break;
      default:
        break;
    }
  };

  return (
    <StyledContainer>
      <OuterCard>
        <CardContent>
          <TitleBox>
            <Typography variant="h4">
              RayGen Solutions
            </Typography>
          </TitleBox>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <InnerCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    User Information
                  </Typography>
                  <TextField
                    label="Name"
                    name="name"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    sx={{ marginBottom: 2 }} // Margin for spacing between fields
                  />
                  <TextField
                    label="Address"
                    name="address"
                    value={userInfo.address}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    sx={{ marginBottom: 2 }} // Margin for spacing between fields
                  />
                  <Typography variant="subtitle1" gutterBottom>
                    Contact Info
                  </Typography>
                  <TextField
                    label="Email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    sx={{ marginBottom: 2 }} // Margin for spacing between fields
                  />
                  <TextField
                    label="Phone"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleProfileUpdate}
                    sx={{ marginTop: 2 }}
                  >
                    Update Profile
                  </Button>
                </CardContent>
              </InnerCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <InnerCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Change Password
                  </Typography>
                  <TextField
                    label="Current Password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    name="currentPassword"
                    value={userInfo.currentPassword}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    sx={{ marginBottom: 2 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => togglePasswordVisibility('currentPassword')}>
                            {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="New Password"
                    type={showNewPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={userInfo.newPassword}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    sx={{ marginBottom: 2 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => togglePasswordVisibility('newPassword')}>
                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={userInfo.confirmPassword}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => togglePasswordVisibility('confirmPassword')}>
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleChangePassword}
                    sx={{ marginTop: 2 }}
                  >
                    Change Password
                  </Button>
                </CardContent>
              </InnerCard>
            </Grid>
          </Grid>
          {error && (
            <Typography color="error" style={{ marginTop: '1rem' }}>
              {error}
            </Typography>
          )}
          {successMessage && (
            <Typography color="success" style={{ marginTop: '1rem' }}>
              {successMessage}
            </Typography>
          )}
        </CardContent>
      </OuterCard>
    </StyledContainer>
  );
};

export default UserProfile;
