import React, { useState } from "react";
import { Grid, Typography, TextField, Button, IconButton, Box, Snackbar, InputAdornment,} from "@mui/material";
import { ArrowBack as ArrowBackIcon, Visibility, VisibilityOff} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import mobileIcon from "../../assets/mobileicon.svg";
import emailIcon from "../../assets/email-icn.svg";
import image from "../../assets/Screenshot from 2024-07-31 09-23-45.png";

const SignInOptions = ({ handleOpen }) => {
  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: "20px" }}>
        Let's log you in
      </Typography>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <div onClick={() => handleOpen("phone")} style={{ display: "flex", alignItems: "center", padding: "15px", width: "250px", boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px", cursor: "pointer",}}>
            <img src={mobileIcon} height={"30px"} alt="" />
            <Typography style={{ color: "#032541", marginLeft: "10px" }}>
              Log In with phone
            </Typography>
          </div>
        </Grid>
        <Grid item>
          <div onClick={() => handleOpen("email")} style={{ display: "flex", alignItems: "center", padding: "15px", width: "250px", boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",cursor: "pointer", }}>
            <img src={emailIcon} height={"30px"} alt="" />
            <Typography style={{ color: "#032541", marginLeft: "10px" }}>
              Log In with email
            </Typography>
          </div>
        </Grid>
        {/* <Grid item>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Typography style={{textAlign: "center",marginTop: "10px",cursor: "pointer",color: "#007BFF",}}>
              Don't have an account? Sign up
            </Typography>
          </Link>
        </Grid> */}
      </Grid>
    </div>
  );
};

const SignInForm = ({ signInWithEmail, signInWithPhone, handleClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    // const emailPattern = /^[A-Z][a-z]*$/;
    const phonePattern = /^\+\d{1,3}\d{7,14}$/;
    const passwordPattern = /^.{6,}$/;

    if (signInWithEmail) {
      if (!formData.email.endsWith("@gmail.com")) {
        errors.email = "Email must be a @gmail.com";
      }
      if (!passwordPattern.test(formData.password)) {
        errors.password = "Password must be at least 6 characters long";
      }
    } else if (signInWithPhone) {
      if (!phonePattern.test(formData.phone)) {
        errors.phone = "Phone number must include a country code";
      }
      if (!passwordPattern.test(formData.password)) {
        errors.password = "Password must be at least 6 characters long";
      }
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

    let endpoint;
    let body;

    if (signInWithEmail) {
      endpoint = "http://127.0.0.1:5000/login/email";
      body = JSON.stringify({
        email: formData.email,
        password: formData.password,
      });
    } else if (signInWithPhone) {
      endpoint = "http://127.0.0.1:5000/login/phone";
      body = JSON.stringify({
        phone: formData.phone,
        password: formData.password,
      });
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("access_token", result.token);
        localStorage.setItem("role", result.role);
        localStorage.setItem("id", result.id);
        setSuccessMessage("User signed in successfully!");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 3000);
      } else {
        const errorResult = await response.json();
        setError(
          errorResult.error || "Login failed. Please check your credentials."
        );
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
    <Box
      sx={{ padding: 4, width: "100%", bgcolor: "background.paper", borderRadius: "8px",}}
    >
      <IconButton onClick={handleClose} style={{ marginBottom: "1rem" }}>
        <ArrowBackIcon />
      </IconButton>
      <h2>Log In</h2>
      {error && (
        <Typography color="error" style={{ marginBottom: "1rem" }}>
          {error}
        </Typography>
      )}
      {signInWithEmail && (
        <form onSubmit={handleSubmit}>
          <TextField label="Email" variant="outlined" fullWidth margin="normal" name="email" value={formData.email} onChange={handleInputChange} error={Boolean(error.email)} helperText={error.email}/>
          <TextField label="Password" type={passwordVisible ? "text" : "password"} variant="outlined" fullWidth margin="normal" name="password" value={formData.password} onChange={handleInputChange} error={Boolean(error.password)} helperText={error.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "1rem" }}>
            Log In with Email
          </Button>
        </form>
      )}
      {signInWithPhone && (
        <form onSubmit={handleSubmit}>
          <TextField label="Phone" variant="outlined" fullWidth margin="normal" name="phone" value={formData.phone} onChange={handleInputChange} error={Boolean(error.phone)} helperText={error.phone}/>
          <TextField label="Password" type={passwordVisible ? "text" : "password"} variant="outlined" fullWidth margin="normal" name="password" value={formData.password} onChange={handleInputChange} error={Boolean(error.password)} helperText={error.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "1rem" }}>
            Log In with Phone
          </Button>
        </form>
      )}
      <Snackbar open={!!successMessage || !!errorMessage} autoHideDuration={6000} onClose={handleSnackbarClose} message={successMessage || errorMessage} anchorOrigin={{ vertical: "top", horizontal: "center" }}
        ContentProps={{
          style: {
            backgroundColor: successMessage ? "#4CAF50" : "#D32F2F",
            color: "white",
          },
        }}
      />
    </Box>
  );
};

const Login = () => {
  const [signInWithEmail, setSignInWithEmail] = useState(false);
  const [signInWithPhone, setSignInWithPhone] = useState(false);

  const handleOpen = (type) => {
    if (type === "email") {
      setSignInWithEmail(true);
      setSignInWithPhone(false);
    } else if (type === "phone") {
      setSignInWithEmail(false);
      setSignInWithPhone(true);
    }
  };

  const handleClose = () => {
    setSignInWithEmail(false);
    setSignInWithPhone(false);
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <div style={{ flex: 1 }}>
        <img src={image} alt="" style={{ height: "100%", width: "100%", objectFit: "cover" }}/>
      </div>
      <div
        style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white",}}
      >
        {!signInWithEmail && !signInWithPhone && (
          <SignInOptions handleOpen={handleOpen} />
        )}
        {(signInWithEmail || signInWithPhone) && (
          <SignInForm signInWithEmail={signInWithEmail} signInWithPhone={signInWithPhone} handleClose={handleClose}/>
        )}
      </div>
    </div>
  );
};

export default Login;
