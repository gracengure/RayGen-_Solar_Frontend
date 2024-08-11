import React, { useState } from 'react';
import { Button, Typography, Grid, CssBaseline, Paper, Box, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { MuiOtpInput } from 'mui-one-time-password-input';
import axios from 'axios';
import ColorCode from "../../assets/WhatsApp Image 2024-08-07 at 07.38.21.jpg";
import Man from "../../assets/WhatsApp_Image_2024-08-07_at_07.38.21_2_-removebg-preview.png";
import LightCode from "../../assets/WhatsApp_Image_2024-08-07_at_07.38.21_1_-removebg-preview.png";


const Verification = () => {
    const [code, setOtp] = useState('');
    const [email, setEmail] = useState(localStorage.getItem('email') || ''); 
    const token = localStorage.getItem('token');

    const handleChange = (newValue) => {
      setOtp(newValue);
    };

    const navigate = useNavigate();

    const handleVerify = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/verify', 
                { email, code }, 
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
              );
            if (response.data.message) {
                navigate('/login');
            } else {
                alert('Verification failed. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying user:', error);
            alert('An error occurred. Please try again later.');
        }
    };    

    return (
      <Grid container component="main" sx={{ position: 'relative', height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={{ position: 'relative' }}>
          <Box>
              <img 
                src={ColorCode} 
                alt="Color Code"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "500px",
                  height: "510px",
                  objectFit: "cover",
                  zIndex: 1,
                  marginLeft: "20px",
                  marginTop: "60px",
                  borderRadius: '50%'
                }}
              />
              <img 
                src={Man}
                alt="Man" 
                style={{
                  position: "absolute", 
                  bottom: "70px", 
                  left: "90px", 
                  width: "60%", 
                  zIndex: 2 
                }}
              />
              <img 
                src={LightCode}
                alt="Light Code" 
                style={{
                  position: "absolute", 
                  top: "20px", 
                  left: "40%", 
                  width: "15%", 
                  zIndex: 3 
                }}
              />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              textAlign: 'center',
              color: 'white',
              padding: '20px',
            }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginLeft: '50px', marginBottom: '25px' }}>
              {/* Uncomment the below Typography components if needed */}
              {/* 
              <Typography variant="h4" component="span" sx={{ width: '310px', height: '35px', margin: '0 172.7px 13.4px 0', fontFamily: 'Muli', fontSize: '49px', fontWeight: 800, fontStretch: 'normal', fontStyle: 'normal', lineHeight: '0.96', letterSpacing: '-0.98px', textAlign: 'left', color: '#fff' }}>
                Consider This
              </Typography>
              <Typography variant="h6" component="span" sx={{ fontFamily: 'Muli', fontSize: '24px', fontWeight: 400, fontStretch: 'normal', fontStyle: 'normal', letterSpacing: 'normal', textAlign: 'left', color: '#fff', }}>
                A place to gather, share & organize your<br></br> Thoughts.
              </Typography> 
              */}
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
          <Box sx={{my: 8,mx: 4,display: 'flex',flexDirection: 'column',pl:'20%',pr:'10%',pt:'10%'}}>
            {/* <img src="/images/sweeton.png" alt="Logo" style={{ marginBottom: '20px', width: '308px', height: '77px' }} /> */}
            <Typography component="h1" variant="h5" sx={{ textAlign: 'left' }}>
              Verification
            </Typography>
            <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: 2 }}>
              Key verification code sent to your email
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'start', mt: 2 }}>
              <MuiOtpInput 
                className='verification_input' 
                value={code} 
                onChange={handleChange} 
                length={6} 
                separator={<span>-</span>}  
                containerStyle={{ display: 'flex', justifyContent: 'start', marginTop: 2 }}  
                isDisabled={false}
              />
            </Box>
            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              sx={{
                width: '397px',
                height: '17px',
                margin: '20px 0 28px',
                padding: '17px 175px',
                borderRadius: '5px',
                mt: 3,
                mb: 2,
                backgroundColor: 'dodgerblue',
                boxShadow: 'none',
                color: 'white',
                '&:hover': {  backgroundColor: 'dodgerblue', }
              }} 
              onClick={handleVerify}
            >
              Verify
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2" sx={{ textDecoration: 'none' }}>
                  {"Didn't receive code? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    );
};

export default Verification;