import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { styled } from "@mui/system";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import InventoryIcon from '@mui/icons-material/Inventory';
// Styled Card Wrapper
const CardWrapper = styled(Card)(({ theme, color }) => ({
  minWidth: 275,
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  textAlign: "center",
  borderLeft: `4px solid ${color}`,
}));

// Sample data for the chart
const salesData = {
  monthly: [
    { name: "Jan", totalSales: 1000, onlineSales: 500, inStoreSales: 500 },
    { name: "Feb", totalSales: 1200, onlineSales: 600, inStoreSales: 600 },
    { name: "Mar", totalSales: 1500, onlineSales: 700, inStoreSales: 800 },
    { name: "Apr", totalSales: 1300, onlineSales: 600, inStoreSales: 700 },
    { name: "May", totalSales: 1600, onlineSales: 800, inStoreSales: 800 },
    { name: "Jun", totalSales: 1400, onlineSales: 700, inStoreSales: 700 },
    { name: "Jul", totalSales: 1700, onlineSales: 900, inStoreSales: 800 },
  ],
  weekly: [
    { name: "Week 1", totalSales: 300, onlineSales: 150, inStoreSales: 150 },
    { name: "Week 2", totalSales: 350, onlineSales: 175, inStoreSales: 175 },
    { name: "Week 3", totalSales: 400, onlineSales: 200, inStoreSales: 200 },
    { name: "Week 4", totalSales: 450, onlineSales: 225, inStoreSales: 225 },
  ],
};

const SalesTrackingGraph = () => {
  const [timeFrame, setTimeFrame] = useState('monthly');
  const [metric, setMetric] = useState('totalSales');
  
  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };

  const handleMetricChange = (event) => {
    setMetric(event.target.value);
  };

  return (
    <CardWrapper color="#f44336">
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          Sales Tracking
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" marginBottom={2}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Time Frame</InputLabel>
            <Select
              value={timeFrame}
              onChange={handleTimeFrameChange}
              label="Time Frame"
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Metric</InputLabel>
            <Select
              value={metric}
              onChange={handleMetricChange}
              label="Metric"
            >
              <MenuItem value="totalSales">Total Sales</MenuItem>
              <MenuItem value="onlineSales">Online Sales</MenuItem>
              <MenuItem value="inStoreSales">In-Store Sales</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData[timeFrame]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={metric} stroke="#f44336" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </CardWrapper>
  );
};

const Home = () => {
  return (
    <Grid container spacing={3} padding={2}>
      <Grid item xs={12} md={6}>
        <ProductStatisticsCard />
      </Grid>
      <Grid item xs={12} md={6}>
        <SalesTrackingGraph />
      </Grid>
    </Grid>
  );
};

// Example ProductStatisticsCard for completeness
const ProductStatisticsCard = () => {
  const totalProducts = 120;
  const outOfStock = 15;
  const lowStockAlerts = 8;

  return (
    <CardWrapper color="#4caf50">
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="center">
          <InventoryIcon fontSize="large" color="action" />
          <Box ml={2}>
            <Typography variant="h6" color="textSecondary">
              Product Statistics
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              Total Products: {totalProducts}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Out of Stock: {outOfStock}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Low Stock Alerts: {lowStockAlerts}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </CardWrapper>
  );
};

export default Home;
