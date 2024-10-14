import getColorShades from "../../assets/colors"
import PieChart from "../../components/graph/PieChart";
export default function AssetGraph({ assets }) {
    const colorShades = getColorShades(assets.length);
    const labels = [];
    const data = [];
    assets.forEach(a => {
        labels.push(a.name);
        data.push(a.currentValue);
    });
    return (
        <PieChart backgroundColors={colorShades} labels={labels} data={data} title={"Assets"} />
    )
}