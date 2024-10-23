import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const TimeSeriesChart = ({ items, title, variables }) => {
    const labels = items.map((item) => item.date);

    const datasets = variables.map((variable) => ({
        label: variable.label,
        data: items.map((item) => item[variable.key]),
        borderColor: variable.color,
        backgroundColor: `${variable.color}33`,
        fill: false,
        tension: 0.1,
    }));

    const data = {
        labels,
        datasets,
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
            x: {
                type: 'time',
                time: {
                    unit: 'month',
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
