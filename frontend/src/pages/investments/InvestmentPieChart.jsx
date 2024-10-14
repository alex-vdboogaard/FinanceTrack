import getColorShades from "../../utility/colors"
import PieChart from "../../components/graph/PieChart";
export default function InvestmentPieChart({ investments }) {
    const colorShades = getColorShades(investments.length);
    const labels = [];
    const data = [];
    investments.forEach(i => {
        labels.push(i.description);
        data.push(a.currentValue);
    });
    return (
        <PieChart backgroundColors={colorShades} labels={labels} data={data} title={"Investments"} />
    )
}