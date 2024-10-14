import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import getColorShades from "../../utility/colors";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ items, title, group1Label, group2Label }) => {
    const labels = items.map((item) => item.name);
    const group1 = items.map((item) => item.value1);
    const group2 = items.map((item) => item.value2);
    const colors = getColorShades(2);

    const data = {
        labels,
        datasets: [
            {
                label: group1Label,
                data: group1,
                backgroundColor: colors[0],
            },
            {
                label: group2Label,
                data: group2,
                backgroundColor: colors[1],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ marginTop: "50px", maxWidth: "800px", width: "100%" }}>
            <Bar data={data} options={options} />
        </div>
    )
};

export default BarChart;
