import React from "react";
import TimeSeriesChart from "../../components/graph/TimeSeriesChart";

const formatReviewLabel = (review) => {
    const date = new Date(review.year, review.month - 1);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
    });
};

export default function Reviews({ reviews }) {
    const chartData = reviews.map((review) => ({
        label: formatReviewLabel(review),
        income: review.income,
        expenses: review.expenses,
        savings: review.savings,
        invested: review.invested,
    }));

    const variables = [
        { key: "income", label: "Income", color: "rgba(75, 192, 192, 1)" },
        { key: "expenses", label: "Expenses", color: "rgba(255, 99, 132, 1)" },
        { key: "savings", label: "Savings", color: "rgba(54, 162, 235, 1)" },
        { key: "invested", label: "Invested", color: "rgba(153, 102, 255, 1)" },
    ];

    return (
        <div>
            <TimeSeriesChart
                items={chartData}
                title="Monthly Financial Review"
                variables={variables}
            />
        </div>
    );
}
