import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Home = () => {
  // Sample data for the line graph
  const salesData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4780 },
    { month: 'May', sales: 5890 },
    { month: 'Jun', sales: 4390 },
    { month: 'Jul', sales: 4490 },
  ];
  const cardStyles = {
    backgroundColor: '#f5f5f5', // Light grey background color
    color: '#333', // Text color
    padding: '20px', // Padding inside the card
    borderRadius: '8px', // Rounded corners
    boxShadow: '0 3px 5px rgba(0,0,0,0.1)', // Subtle shadow for depth
  };
  return (
    <Grid container spacing={3}>
      {/* Card for Products */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={cardStyles}>
          <CardContent>
            <Typography variant="h5" component="div">
              Products
            </Typography>
            <Typography variant="h4">
              120
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Card for Sales */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ ...cardStyles, backgroundColor: '#e0f7fa' }}> {/* Light cyan background */}
          <CardContent>
            <Typography variant="h5" component="div">
              Sales
            </Typography>
            <Typography variant="h4">
              $45,000
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Card for Customers */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ ...cardStyles, backgroundColor: '#fff3e0' }}> {/* Light orange background */}
          <CardContent>
            <Typography variant="h5" component="div">
              Customers
            </Typography>
            <Typography variant="h4">
              350
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Card for Orders */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ ...cardStyles, backgroundColor: '#e1bee7' }}> {/* Light purple background */}
          <CardContent>
            <Typography variant="h5" component="div">
              Orders
            </Typography>
            <Typography variant="h4">
              80
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Line Graph for Sales Tracking */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Sales Overview
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Home;
