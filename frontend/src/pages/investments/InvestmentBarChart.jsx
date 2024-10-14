import BarChart from "../../components/graph/BarChart";

export default function InvestmentBarChart({ investments }) {
    const data = [];

    investments.forEach(i => {
        const dataItem = {
            value1: i.invested,
            value2: i.currentValue,
            name: i.description
        };
        data.push(dataItem);
    });

    return (
        <BarChart
            group1Label={"Invested (R)"}
            group2Label={"Current value (R)"}
            items={data}
            title={"Total invested vs current value"}
        />
    );
}
