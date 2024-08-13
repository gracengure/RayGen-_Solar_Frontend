import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from '@theme';  
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "./Header";
import ProgressCircle from "./ProgressCircle";
import axios from 'axios';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    
    axios.get('http://127.0.0.1:5000/lineChartData')
      .then(response => {
        setLineChartData([{ id: 'Revenue', data: response.data }]);
      })
      .catch(error => {
        console.error('Error fetching line chart data:', error);
      });

    axios.get('http://127.0.0.1:5000/barChartData')
      .then(response => {
        setBarChartData(response.data);
      })
      .catch(error => {
        console.error('Error fetching bar chart data:', error);
      });  

    axios.get('http://127.0.0.1:5000/users')
      .then(response => {
        setUsersData(response.data);
      })
      .catch(error => {
        console.error('Error fetching users data:', error);
      }); 
    }, []);

    return (
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />   
          <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} /> Reports
        </Button>    
        </Box>

      {/* GRID & CHARTS */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
        {/* ROW 1 */}
        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            Total Users
          </Typography>
          <Typography variant="h4" fontWeight="bold" color={colors.greenAccent[500]}>
            {usersData.length}
          </Typography>
        </Box>

        {/* ROW 2 */}
        <Box gridColumn="span 8" gridRow="span 5" backgroundColor={colors.primary[400]}>
          <Box mt="2px" p="0 3px" display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h10" fontWeight="600" color={colors.grey[100]}>
                Revenue Generated
              </Typography>
              <Typography variant="h5" fontWeight="bold" color={colors.greenAccent[500]}>
                $59,342.32
              </Typography>
            </Box>
            <IconButton>
              <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
            </IconButton>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <ResponsiveLine
              data={lineChartData}
              theme={{
                axis: {
                  domain: { line: { stroke: colors.grey[100] } },
                  legend: { text: { fill: colors.grey[100] } },
                  ticks: { line: { stroke: colors.grey[100], strokeWidth: 1 }, text: { fill: colors.grey[100] } },
                },