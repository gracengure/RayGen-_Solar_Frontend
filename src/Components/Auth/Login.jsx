
import React, { useState } from "react";
import { Grid, Typography, Button, IconButton, Box, Snackbar, TextField, InputAdornment, Checkbox, FormControlLabel } from "@mui/material";
import { ArrowBack as ArrowBackIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import ColorCode from "../../assets/WhatsApp Image 2024-08-07 at 07.38.21.jpg";
import Man from "../../assets/WhatsApp_Image_2024-08-07_at_07.38.21_2_-removebg-preview.png";
import LightCode from "../../assets/WhatsApp_Image_2024-08-07_at_07.38.21_1_-removebg-preview.png";

const SignInForm = ({ handleClose }) => {
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, rememberMe: e.target.checked });
  };

  const validateForm = () => {
    const errors = {};
    const passwordPattern = /^.{6,}$/;

    if (!formData.email.endsWith("@gmail.com")) {
      errors.email = "Email must be a @gmail.com";
    }
    if (!passwordPattern.test(formData.password)) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }
  
    const endpoint = "http://127.0.0.1:5000/login/email";
    const body = JSON.stringify({
      email: formData.email,
      password: formData.password,
      rememberMe: formData.rememberMe,
    });
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });
  
      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("access_token", result.token);
        localStorage.setItem("role", result.role);
        localStorage.setItem("id", result.id);
        setSuccessMessage("User signed in successfully!");
  
        // Determine navigation based on role
        if (result.role === "admin") {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } else {
        const errorResult = await response.json();
        setError(errorResult.error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      setErrorMessage("Error: " + error.message);
    }
  
    handleClose();
  };
  

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSnackbarClose = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <Box sx={{ padding: 4, width: "30%", borderRadius: "8px", position: "absolute", top: "50%", left: "50%", transform: "translate(10%, -50%)", marginRight: '20px' }}>
      <Typography variant="h5" style={{ marginBottom: "1rem", textAlign: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
        Welcome
      </Typography>
      {error && (
        <Typography color="error" style={{ marginBottom: "1rem" }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField label="Enter your email" variant="outlined" fullWidth margin="normal" name="email" value={formData.email} onChange={handleInputChange} error={Boolean(error.email)} helperText={error.email}
          InputProps={{ sx: { borderRadius: '20px' } }}
        />
        <TextField label="Password" type={passwordVisible ? "text" : "password"} variant="outlined" fullWidth margin="normal" name="password" value={formData.password} onChange={handleInputChange} error={Boolean(error.password)} helperText={error.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {passwordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              borderRadius: '20px'
            }
          }}
        />
        <FormControlLabel
          control={<Checkbox checked={formData.rememberMe} onChange={handleCheckboxChange} name="rememberMe" />}
          label="Remember Me"
          sx={{ display: "block", textAlign: "left", marginBottom: "1rem" }}
        />
        <Link to="/forgot-password" style={{ textDecoration: "none", color: "black", display: "block", textAlign: "right", marginBottom: "1rem" }}>
          Forgot your password?
        </Link>
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "1rem", backgroundColor: 'dodgerblue', borderRadius: '20px', height: '45px' }}>
          Log In
        </Button>
        <Typography variant="body2" style={{ textAlign: "center", marginTop: "1rem" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ textDecoration: "none", color: "dodgerblue" }}>
            Sign up
          </Link>
        </Typography>
      </form>
      <Snackbar
        open={!!successMessage || !!errorMessage}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={successMessage || errorMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        ContentProps={{
          style: { backgroundColor: successMessage ? "#4CAF50" : "#D32F2F", color: "white" },
        }}
      />
    </Box>
  );
};

const Login = () => {
  const [showForm, setShowForm] = useState(true);

  const handleOpen = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", backgroundColor: "#f0fff0" }}>
      {/* Background images */}
      <img src={ColorCode} alt="Color Code"style={{position: "absolute",top: 0,left: 0,width: "420px",height: "870px",objectFit: "cover",zIndex: 1,marginLeft: "20px",marginTop: "60px",}}/>
      <img src={Man} alt="Man" style={{ position: "absolute", bottom: "10px", left: "30px", width: "40%", zIndex: 2 }} />
      <img src={LightCode} alt="Light Code" style={{ position: "absolute", top: "15px", left: "20%", width: "10%", zIndex: 3 }} />

      {/* Render SignInForm */}
      {showForm && <SignInForm handleClose={handleClose} />}
    </div>
  );
};

export default Login;
