
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Grid, Typography, TextField, Button, IconButton, Box, InputAdornment, Snackbar } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import image from '../../assets/Screenshot from 2024-07-31 09-23-45.png';

const styles = {
  signUpOption: { display: "flex", alignItems: 'center', justifyContent: 'center', padding: "15px", width: '250px', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', cursor: "pointer", margin: '0 auto', },
  signUpImage: { width: '100%', height: 'auto', borderRadius: '8px' },
  container: { minHeight: '100vh', backgroundColor: 'white' },
  backButton: { marginBottom: '1rem' },
  formContainer: { padding: 4, width: '100%', bgcolor: 'background.paper', borderRadius: '8px' },
  signUpWrapper: { marginTop: '20px', textAlign: 'center', display: 'flex',  flexDirection: 'column',  alignItems: 'center',  justifyContent: 'center', height: '100%',},
};

// Define validation schema with Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Z]/, "Name must start with a capital letter!")
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .matches(/@gmail\.com$/, 'Email must be a valid Gmail address!')
    .required('Email is required'),
  phone_number: Yup.string()
    .matches(/^\+\d+/, 'Phone number must include a country code!')
    .required('Phone number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long!')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/, 'Password must include letters, numbers, and at least one special character (!@#$%^&*)')
    .required('Password is required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match!')
    .required('Repeat password is required')
});

const SignUp = () => {
  const navigate = useNavigate(); 
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = async (values) => {
    const user = {
        name: values.name,
        password: values.password,
        email: values.email,
        phone_number: values.phone_number
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            const result = await response.json();
            localStorage.setItem('access_token', result.access_token);
            localStorage.setItem('email', values.email); 
            setSuccessMessage('User signed up successfully! An email with a verification code has been sent.');
            navigate('/verify', { replace: true });
        } else if (response.status === 409) {
            setErrorMessage('Email already exists. Please use a different email.');
        } else {
            throw new Error(`Sign up failed: ${response.statusText}`);
        }      
    } catch (error) {
        setErrorMessage(`Error: ${error.message}`);
    }
  };

  const handleSnackbarClose = () => {
    setSuccessMessage('');
    setErrorMessage('');
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
          <Formik
            initialValues={{
              name: '',
              email: '',
              phone_number: '',
              password: '',
              repeatPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Box sx={styles.formContainer}>
                <Form>
                  <Field
                    as={TextField}
                    label="Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={touched.name && Boolean(errors.name)}
                    helperText={<ErrorMessage name="name" />}
                  />
                  <Field
                    as={TextField}
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    helperText={<ErrorMessage name="email" />}
                  />
                  <Field
                    as={TextField}
                    label="Phone Number"
                    name="phone_number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone_number}
                    error={touched.phone_number && Boolean(errors.phone_number)}
                    helperText={<ErrorMessage name="phone_number" />}
                  />
                  <Field
                    as={TextField}
                    label="Password"
                    name="password"
                    type={values.showPassword ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    helperText={<ErrorMessage name="password" />}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => handleChange({ target: { name: 'showPassword', value: !values.showPassword } })}>
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <Field
                    as={TextField}
                    label="Repeat Password"
                    name="repeatPassword"
                    type={values.showRepeatPassword ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.repeatPassword}
                    error={touched.repeatPassword && Boolean(errors.repeatPassword)}
                    helperText={<ErrorMessage name="repeatPassword" />}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => handleChange({ target: { name: 'showRepeatPassword', value: !values.showRepeatPassword } })}>
                            {values.showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <Button variant="contained" color="primary" fullWidth type="submit" style={{ marginTop: '16px' }}>
                    Sign Up
                  </Button>
                </Form>
              </Box>
            )}
          </Formik>
          <Typography variant="body2" style={{ marginTop: '15px' }}>
            Already have an account? <Button onClick={() => navigate('/login')} color="primary">Login</Button>
          </Typography>
          <Snackbar 
            open={Boolean(successMessage || errorMessage)} 
            autoHideDuration={6000} 
            onClose={handleSnackbarClose} 
            message={successMessage || errorMessage}
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
