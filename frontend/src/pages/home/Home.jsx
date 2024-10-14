import Button from "../../components/button/Button"
import PieChart from "../../components/graph/PieChart";
export default function Home() {
    const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
    const data = [12, 19, 3, 5, 2, 3];
    const backgroundColors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
    ];
    return (
        <main>
            <h1>Good morning, Alex</h1>
            <Button onClick={() => alert("Hi!")} className='primary-btn'>+ Add new asset</Button>
            <PieChart labels={labels} data={data} backgroundColors={backgroundColors} title="Sample Pie Chart" />
        </main>

    )
}