import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const TimeSeriesChart = ({ items, title, variables }) => {
    const labels = items.map((item) => item.label);

    const datasets = variables.map((variable) => {
        const data = items.map((item) => item[variable.key]);

        return {
            label: variable.label,
            data: data,
            borderColor: variable.color,
            backgroundColor: `${variable.color}33`,
            fill: false,
            tension: 0.1,
        };
    });

    const data = {
        labels,
        datasets,
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: title,
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    autoSkip: false, // Avoid skipping labels if possible
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ maxWidth: "1100px", marginTop: "50px" }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default TimeSeriesChart;
