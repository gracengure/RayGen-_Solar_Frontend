import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/red.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, DataLabelsPlugin);

function ProductSalesChart() {
const [selectedDates, setSelectedDates] = useState([]);

const handleDateChange = (dates) => {
    setSelectedDates(dates);
};

const totalJobs = 300 + 150 + 100; // Total of Onsite, Remote, and Hybrid

return (
    <div className="BarChart" style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '1500px', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', width: '1000px', marginLeft: '20px', border: "2px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)", padding: "16px", marginBottom: "20px" }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ textAlign: "start", marginBottom: "20px", fontSize: '20px' }}> Products Sold</h2>
            <div>
            <span style={{ marginRight: '10px' }}>Filter</span>
            <DatePicker
                multiple
                value={selectedDates}
                onChange={handleDateChange}
                format="DD, MMM YYYY"
                range
                numberOfMonths={2}
                className="red"
            />
            </div>
        </div>
        <div style={{ height: '400px' }}>
            <Bar
            data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [
                {
                    data: [1552, 1319, 613, 1400, 1400, 1400, 1400, 1400, 1400, 1400, 1400, 1400],
                    backgroundColor: ["#03C4A9", "#03C4A9", "#03C4A9", "#03C4A9", '#03C4A9', "#03C4A9", "#03C4A9", "#03C4A9", "#03C4A9", "#03C4A9", "#03C4A9", "#03C4A9"],
                    borderColor: ["#03C4A9", "#03C4A9", "#03C4A9", "#03C4A9", '#03C4A9', "#03C4A9", "#03C4A9", "#03C4A9", "#03C4A9", "#03C4A9", "#03C4A9", "#03C4A9"],
                    borderWidth: 0.5,
                },
                ],
            }}
            height={400}
            options={{
                maintainAspectRatio: false,
                scales: {
                x: {
                    beginAtZero: true,
                },
                y: {
                    beginAtZero: true,
                },
                },
                plugins: {
                legend: {
                    display: false,
                },
                datalabels: {
                    display: false,
                },
                },
                barPercentage: 0.2,
            }}
            />
        </div>
        </div>

        {/* <div style={{ flex: '1', maxWidth: '600px', border: "2px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)", padding: "16px", height: '480px' }}>
        <h2 style={{ textAlign: "start", marginBottom: "20px", fontSize: '20px' }}>Project Overview</h2>
        <div style={{ height: '300px' }}>
            <Doughnut
            data={{
                labels: ["Onsite", "Remote", "Hybrid"],
                datasets: [
                {
                    data: [300, 150, 100],
                    backgroundColor: ["#03C3AA", "#5D32D9", "#FECC4C"],
                    borderColor: ["#03C3AA", "#5D32D9", "#FECC4C"],
                    borderWidth: 1,
                },
                ],
            }}
            height={300}
            options={{
                maintainAspectRatio: false,
                plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                    font: {
                        size: 14,
                    },
                    },
                },
                datalabels: {
                    color: '#000',
                    display: true,
                    formatter: (value) => `${value}`, 
                    font: {
                    size: 14,
                    },
                    anchor: 'end',
                    align: 'end',
                },
                tooltip: {
                    callbacks: {
                    label: (tooltipItem) => {
                        const dataset = tooltipItem.dataset;
                        const total = dataset.data.reduce((acc, val) => acc + val, 0);
                        return `${tooltipItem.label}: ${tooltipItem.raw} (${Math.round((tooltipItem.raw / total) * 100)}%)`;
                    },
                    },
                },
                },
            }}
            />
            <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '16px', fontWeight: 'bold' }}>
            Total: {totalJobs}
            </div>
        </div>
        </div> */}
    </div>
    </div>
);
}

export default ProductSalesChart;