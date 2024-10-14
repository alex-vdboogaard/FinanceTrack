import BarChart from "../../components/graph/BarChart";

export default function AssetBarChart({ assets }) {
    const data = [];

    assets.forEach(a => {
        const dataItem = {
            value1: a.boughtFor,
            value2: a.currentValue,
            name: a.name
        };
        data.push(dataItem);
    });

    return (
        <BarChart
            group1Label={"Bought for (R)"}
            group2Label={"Current value (R)"}
            items={data}
            title={"Asset value when bought vs now"}
        />
    );
}
