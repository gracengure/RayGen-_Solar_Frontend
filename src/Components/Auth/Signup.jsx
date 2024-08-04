import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Grid, Typography, TextField, Button, IconButton, Box, InputAdornment, Snackbar } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Visibility, VisibilityOff } from '@mui/icons-material';
// import emailIcon from './Assets/email-icn.svg';
import image from '../../assets/Screenshot from 2024-07-31 09-23-45.png'

const styles = {
  signUpOption: { display: "flex", alignItems: 'center', justifyContent: 'center', padding: "15px", width: '250px', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', cursor: "pointer", margin: '0 auto', },
  signUpImage: { width: '100%', height: 'auto', borderRadius: '8px' },
  container: { minHeight: '100vh', backgroundColor: 'white' },
  backButton: { marginBottom: '1rem' },
  formContainer: { padding: 4, width: '100%', bgcolor: 'background.paper', borderRadius: '8px' },
  signUpWrapper: { marginTop: '20px', textAlign: 'center', display: 'flex',  flexDirection: 'column',  alignItems: 'center',  justifyContent: 'center', height: '100%',},
};

const SignUp = () => {
  const navigate = useNavigate(); 
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // role: '',
    phone_number: '',
    password: '',
    repeatPassword: '',
    showPassword: false,
    showRepeatPassword: false,
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    // role: false,
    phone_number: false,
    password: false,
    repeatPassword: false,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: false });
    }
  };

  const handleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleShowRepeatPassword = () => {
    setFormData({ ...formData, showRepeatPassword: !formData.showRepeatPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['name', 'email', 'phone_number', 'password', 'repeatPassword'];
    let hasError = false;
    const newFormErrors = { ...formErrors };

    // Check if all required fields are filled
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newFormErrors[field] = true;
        hasError = true;
      } else {
        newFormErrors[field] = false;
      }
    });

    // Check if passwords match
    if (formData.password !== formData.repeatPassword) {
      setErrorMessage("Passwords do not match!");
      newFormErrors.password = true;
      newFormErrors.repeatPassword = true;
      hasError = true;
    }

    // Check password length
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long!");
      newFormErrors.password = true;
      hasError = true;
    }

    // Check email format
    if (!formData.email.endsWith("@gmail.com")) {
      setErrorMessage("Email must be a valid Gmail address!");
      newFormErrors.email = true;
      hasError = true;
    }

    // Check if name starts with a capital letter
    if (!/^[A-Z]/.test(formData.name)) {
      setErrorMessage("Name must start with a capital letter!");
      newFormErrors.name = true;
      hasError = true;
    }

    // Check if phone number includes a country code
    if (!/^\+\d+/.test(formData.phone_number)) {
      setErrorMessage("Phone number must include a country code!");
      newFormErrors.phone_number = true;
      hasError = true;
    }

    setFormErrors(newFormErrors);

    if (hasError) {
      return;
    }

    // Create user object
    const user = {
      name: formData.name,
      password: formData.password,
      // role: formData.role,
      email: formData.email,
      phone_number: formData.phone_number
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
    
      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('access_token', result.access_token);
        setSuccessMessage('User signed up successfully!');
        handleClose(); 
        navigate('/login', { replace: true });
    } else if (response.status === 409) {
        setErrorMessage('Email already exists. Please use a different email.');
      } else {
        throw new Error('Sign up failed: ${response.statusText}');
      }      
    } catch (error) {
        setErrorMessage('Error: ${error.message}');
      }
  };

  const handleSnackbarClose = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleOpen = () => {
    setShowSignInForm(true);
  };

  const handleClose = () => {
    setShowSignInForm(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={styles.container}>
      <Grid item xs={12} sm={6}>
        <img src={image} alt="Auth" style={styles.signUpImage} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <div style={styles.signUpWrapper}>
          <IconButton onClick={() => navigate(-1)} sx={styles.backButton}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" gutterBottom>Sign Up</Typography>
          {showSignInForm ? (
            <Box sx={styles.formContainer}>
              <form onSubmit={handleSubmit}>
                <TextField label="Name" variant="outlined" fullWidth margin="normal" name="name" value={formData.name} onChange={handleInputChange} required error={formErrors.name} autoComplete="name" />
                <TextField label="Email" variant="outlined" fullWidth margin="normal" name="email" value={formData.email} onChange={handleInputChange} required error={formErrors.email} autoComplete="email" />
                {/* <TextField label="Role" variant="outlined" fullWidth margin="normal" name="role" value={formData.role} onChange={handleInputChange} required error={formErrors.role} autoComplete="organization-title" /> */}
                <TextField label="Phone Number" variant="outlined" fullWidth margin="normal" name="phone_number" value={formData.phone_number} onChange={handleInputChange} required error={formErrors.phone_number} autoComplete="tel"/>
                <TextField label="Password" variant="outlined" fullWidth margin="normal" name="password" type={formData.showPassword ? "text" : "password"} value={formData.password} onChange={handleInputChange} required error={formErrors.password} autoComplete="new-password" 
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                          {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField label="Repeat Password" variant="outlined" fullWidth margin="normal" name="repeatPassword" type={formData.showRepeatPassword ? "text" : "password"} value={formData.repeatPassword} onChange={handleInputChange} required error={formErrors.repeatPassword} autoComplete="new-password" 
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowRepeatPassword}>
                          {formData.showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Button variant="contained" color="primary" fullWidth type="submit" style={{ marginTop: '16px' }}>
                  Sign Up
                </Button>
              </form>
            </Box>
          ) : (
            <div>
              <Typography variant="h6" style={{ marginBottom: '15px' }}>Continue with email</Typography>
              <div style={styles.signUpOption} onClick={handleOpen}>
                {/* <img src={emailIcon} alt="Email Icon" style={{ marginRight: "8px" }} /> */}
                <Typography variant="body1">Sign up with email</Typography>
              </div>
            </div>
          )}
          <Typography variant="body2" style={{ marginTop: '15px' }}>
            Already have an account? <Button onClick={() => navigate('/login')} color="primary">Login</Button>
          </Typography>
          <Snackbar open={Boolean(successMessage || errorMessage)} autoHideDuration={6000} onClose={handleSnackbarClose} message={successMessage || errorMessage}
            ContentProps={{
              style: {
                backgroundColor: successMessage ? 'green' : 'red',
              },
            }}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default SignUp;