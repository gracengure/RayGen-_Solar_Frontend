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
                legends: { text: { fill: colors.grey[100] } },
                tooltip: { container: { color: colors.primary[500] } },
              }}
              colors={{ scheme: "nivo" }}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
              yFormat=" >-.2f"
              curve="catmullRom"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: "bottom",
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Date",
                legendOffset: 36,
                legendPosition: "middle",
              }}
              axisLeft={{
                orient: "left",
                tickValues: 5,
                tickSize: 3,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Revenue",
                legendOffset: -40,
                legendPosition: "middle",
              }}
              enableGridX={false}
              enableGridY={false}
              pointSize={8}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [{ on: "hover", style: { itemBackground: "rgba(0, 0, 0, .03)", itemOpacity: 1 } }],
                },
              ]}
            />
             </Box>
        </Box>
        <Box gridColumn="span 4" gridRow="span 3" backgroundColor={colors.primary[400]} overflow="auto">
          <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">Recent Transactions</Typography>
          </Box>
          {/* Display recent transactions from the usersData */}
          {usersData.map((user, i) => (
            <Box key={i} display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
              <Box>
                <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">{user.name}</Typography>
                <Typography color={colors.grey[100]}>{user.email}</Typography>
              </Box>
              <Box color={colors.grey[100]}>Joined Date: {/* Add logic to display joined date */}</Box>
            </Box>
          ))}
        </Box>
        {/* ROW 3 */}
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} p="30px">
          <Typography variant="h5" fontWeight="600">Campaign</Typography>
          <Box display="flex" flexDirection="column" alignItems="center" mt="25px">
            <ProgressCircle size="125" />
            <Typography variant="h5" color={colors.greenAccent[500]} sx={{ mt: "15px" }}>
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box gridColumn="span 4" gridRow="span 4" backgroundColor={colors.primary[400]}>
          <Typography variant="h5" fontWeight="600" sx={{ padding: "30px 30px 0 30px" }}>
            Sales Quantity
          </Typography>