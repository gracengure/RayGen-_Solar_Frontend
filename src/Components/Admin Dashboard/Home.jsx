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