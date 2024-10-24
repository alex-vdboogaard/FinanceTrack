import getColorShades from "../../utility/colors";
import PieChart from "../../components/graph/PieChart";

export default function BankPieChart({ accounts }) {
    const colorShades = getColorShades(accounts.length);
    const labels = [];
    const data = [];
    accounts.forEach((a) => {
        labels.push(a.name);
        data.push(a.balance);
    });
    return (
        <PieChart
            backgroundColors={colorShades}
            labels={labels}
            data={data}
            title={"Bank accounts"}
            maxWidth={"500px"}
        />
    );
}
