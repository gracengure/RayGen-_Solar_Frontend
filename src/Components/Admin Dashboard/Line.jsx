
import React from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from '@theme';
import { mockTransactions } from "./mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "./Header";
import Line from "./Line";
import StatBox from "./StatBox";
import ProgressCircle from "./ProgressCircle";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        marginLeft: '240px', // Adjust this to match the width of the sidebar
        padding: '20px',
        '@media (max-width: 1200px)': {
          marginLeft: '0',
        }
      }}
    >
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }}>
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

          {/*  */}
        </Box>

        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
          mt="20px"
        >
          {/* ROW 1 */}
          {[{
            title: "12,361",
            subtitle: "Emails Sent",
            icon: <EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "24px" }} />,
          }, {
            title: "431,225",
            subtitle: "Sales Obtained",
            icon: <PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "24px" }} />,
          }, {
            title: "32,441",
            subtitle: "New Clients",
            icon: <PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "24px" }} />,
          }, {
            title: "1,325,134",
            subtitle: "Traffic Received",
            icon: <TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "24px" }} />,
          }].map((stat, i) => (
            <Box
              key={i}
              gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              p="10px"
            >
              <StatBox
                title={stat.title}
                subtitle={stat.subtitle}
                progress="0.75"
                increase="+14%"
                icon={stat.icon}
              />
            </Box>
          ))}

          {/* ROW 2 */}
          <Box
            gridColumn={{ xs: 'span 12', md: 'span 8' }}
            gridRow="span 5"
            backgroundColor={colors.primary[400]}
            borderRadius="10px"
            boxShadow={`0 4px 6px ${colors.shadow}`}
            overflow="hidden"
          >
            <Box
              p="15px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
            >
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  color={colors.grey[100]}
                  fontSize={{ xs: '14px', sm: '16px' }}
                >
                  Revenue Generated
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                  fontSize={{ xs: '18px', sm: '22px' }}
                >
                  $59,342.32
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{ fontSize: { xs: '20px', sm: '24px' }, color: colors.greenAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box height="250px" mt="-20px">
              <Line isDashboard={true} />
            </Box>
          </Box>
          <Box
            gridColumn={{ xs: 'span 12', md: 'span 4' }}
            gridRow="span 3"
            backgroundColor={colors.primary[400]}
            borderRadius="10px"
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
              borderRadius="10px 10px 0 0"
            >
              <Typography color={colors.grey[100]} variant="h6" fontWeight="600">
                Recent Transactions
              </Typography>
            </Box>
            {mockTransactions.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h6"
                    fontWeight="600"
                  >
                    {transaction.txId}
                  </Typography>
                  <Typography color={colors.grey[100]} fontSize={{ xs: '12px', sm: '14px' }}>
                    {transaction.user}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]} fontSize={{ xs: '12px', sm: '14px' }}>
                  {transaction.date}
                </Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${transaction.cost}
                </Box>
              </Box>
            ))}
          </Box>

          {/* ROW 3 */}
          <Box
            gridColumn={{ xs: 'span 12', md: 'span 4' }}
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="20px"
            borderRadius="10px"
            boxShadow={`0 4px 6px ${colors.shadow}`}
          >
            <Typography variant="h6" fontWeight="600">
              Campaign
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ProgressCircle size="125" />
              <Typography
                variant="h6"
                color={colors.greenAccent[500]}
                sx={{ mt: "15px" }}
                fontSize={{ xs: '16px', sm: '18px' }}
              >
                $48,352 revenue generated
              </Typography>
              <Typography fontSize={{ xs: '12px', sm: '14px' }}>
                Includes extra misc expenditures and costs
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
