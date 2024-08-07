import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Button, Grid, Typography, Container, Box } from '@mui/material';
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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/user/profile', {
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
            address: data.address, // Make sure to include address in your backend response if needed
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
      const response = await fetch('http://127.0.0.1:5000/user/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          name: userInfo.name,
          address: userInfo.address,
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
      const response = await fetch('http://127.0.0.1:5000/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          currentPassword: userInfo.currentPassword,
          newPassword: userInfo.newPassword,
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
                    type="password"
                    name="currentPassword"
                    value={userInfo.currentPassword}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="New Password"
                    type="password"
                    name="newPassword"
                    value={userInfo.newPassword}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={userInfo.confirmPassword}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
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
