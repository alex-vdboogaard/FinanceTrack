import PieChart from "../../components/graph/PieChart";
import getColorShades from "../../utility/colors";

export default function NetWorthPie({ assets, bankAccounts, investments }) {
    const colors = getColorShades(3);
    let total1 = assets.reduce((acc, asset) => acc + parseFloat(asset.currentValue || 0), 0);
    let total2 = bankAccounts.reduce((acc, account) => acc + parseFloat(account.balance || 0), 0);
    let total3 = investments.reduce((acc, investment) => acc + parseFloat(investment.currentValue || 0), 0);
    let data = [total1, total2, total3];
    const labels = ["Assets", "Bank Accounts", "Investments"];

    return (
        <PieChart
            labels={labels}
            backgroundColors={colors}
            data={data}
            title={`Net worth: R${total1 + total2 + total3}`}
        />
    );
}
