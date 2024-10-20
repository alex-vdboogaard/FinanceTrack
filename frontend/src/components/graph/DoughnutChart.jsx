import React, { memo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = memo(({ labels, data, backgroundColors, title, maxWidth = "700px" }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: title || 'My Doughnut Chart',
                data: data,
                backgroundColor: backgroundColors || [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'white'
                ],
                borderWidth: 1,
                cutout: '50%',  // Makes the pie chart hollow
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
                text: title || 'Doughnut Chart',
            },
        },
    };

    return (
        <div style={{ maxWidth: maxWidth, width: "100%" }}>
            <Doughnut data={chartData} options={options} />
        </div>
    )
});

export default DoughnutChart;
