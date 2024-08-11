import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from '@theme';  


const solarApplianceData = [
  {
    id: 'Solar Panels',
    color: 'hsl(90, 70%, 50%)',
    data: [
      { x: 'January', y: 120 },
      { x: 'February', y: 130 },
      { x: 'March', y: 140 },
      { x: 'April', y: 150 },
      { x: 'May', y: 160 },
      { x: 'June', y: 170 },
      { x: 'July', y: 180 },
      { x: 'August', y: 190 },
      { x: 'September', y: 200 },
      { x: 'October', y: 210 },
      { x: 'November', y: 220 },
      { x: 'December', y: 230 },
    ],
  },
  {
    id: 'Inverter',
    color: 'hsl(30, 70%, 50%)',
    data: [
      { x: 'January', y: 80 },
      { x: 'February', y: 85 },
      { x: 'March', y: 90 },
      { x: 'April', y: 95 },
      { x: 'May', y: 100 },
      { x: 'June', y: 105 },
      { x: 'July', y: 110 },
      { x: 'August', y: 115 },
      { x: 'September', y: 120 },
      { x: 'October', y: 125 },
      { x: 'November', y: 130 },
      { x: 'December', y: 135 },
    ],
  },
  {
    id: 'Battery',
    color: 'hsl(150, 70%, 50%)',
    data: [
      { x: 'January', y: 50 },
      { x: 'February', y: 55 },
      { x: 'March', y: 60 },
      { x: 'April', y: 65 },
      { x: 'May', y: 70 },
      { x: 'June', y: 75 },
      { x: 'July', y: 80 },
      { x: 'August', y: 85 },
      { x: 'September', y: 90 },
      { x: 'October', y: 95 },
      { x: 'November', y: 100 },
      { x: 'December', y: 105 },
    ],
  },
];

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveLine
      data={solarApplianceData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Value",
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
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;

