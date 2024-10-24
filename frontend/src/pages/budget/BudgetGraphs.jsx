import BarChart from "../../components/graph/BarChart";
import PieChart from "../../components/graph/PieChart";
import getColorShades from "../../utility/colors";
import Reviews from "./Reviews";

export default function BudgetGraphs({ expenses, income, reviews }) {
    const expenseColours = getColorShades(expenses.length);
    const expenseLabels = expenses.map((expense) => expense.name);
    const expenseData = expenses.map((expense) => expense.amount);

    const incomeColours = getColorShades(income.length);
    const incomeLabels = income.map((income) => income.name);
    const incomeData = income.map((income) => income.amount);

    const incomeTotal = income.reduce(
        (acc, curr) => acc + parseFloat(curr.amount),
        0
    );
    const expenseTotal = expenses.reduce(
        (acc, curr) => acc + parseFloat(curr.amount),
        0
    );

    const barchartItems = [
        { value1: incomeTotal, value2: expenseTotal, name: " " },
    ];

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "start",
                    marginTop: "50px",
                }}
            >
                {income.length > 0 && (
                    <PieChart
                        maxWidth={"400px"}
                        title={"Income"}
                        backgroundColors={incomeColours}
                        labels={incomeLabels}
                        data={incomeData}
                    />
                )}

                {expenses.length > 0 && (
                    <PieChart
                        maxWidth={"400px"}
                        title={"Expenses"}
                        backgroundColors={expenseColours}
                        labels={expenseLabels}
                        data={expenseData}
                    />
                )}
                {income.length > 0 && expenses.length > 0 && (
                    <BarChart
                        margin={"0px"}
                        style={{ flexBasis: "100%" }}
                        title="Income vs Expenses"
                        group1Label="Income"
                        group2Label="Expenses"
                        items={barchartItems}
                    />
                )}
            </div>
            {reviews.length > 0 && <Reviews reviews={reviews} />}
        </>
    );
}
