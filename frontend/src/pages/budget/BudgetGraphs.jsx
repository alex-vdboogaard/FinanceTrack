import BarChart from "../../components/graph/BarChart"
import PieChart from "../../components/graph/PieChart"
import getColorShades from "../../utility/colors"

export default function BudgetGraphs({ expenses, income }) {
    const expenseColours = getColorShades(expenses.length);
    const expenseLabels = expenses.map(expense => expense.name);
    const expenseData = expenses.map(expense => expense.amount);

    const incomeColours = getColorShades(income.length);
    const incomeLabels = income.map(income => income.name);
    const incomeData = income.map(income => income.amount);
    return (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "start", marginTop: "50px" }}>
            {/* Expenses */}
            <PieChart maxWidth={"400px"} title={"Expenses"} backgroundColors={expenseColours} labels={expenseLabels} data={expenseData} />
            <PieChart maxWidth={"400px"} title={"Income"} backgroundColors={incomeColours} labels={incomeLabels} data={incomeData} />
        </div>
    )
}