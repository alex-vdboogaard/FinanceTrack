import getColorShades from "../../utility/colors"
import PieChart from "../../components/graph/PieChart";
import { useEffect, useState } from "react";
import { fetchData } from "../../utility/fetchData";

export default function SavingGoals({ triggerRerender }) {
    const colorShades = getColorShades(2);
    const labels = ["Balance", "Remaining"];
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        fetchData("http://localhost:3001/savings/goal")
            .then((data) => {
                setGoals(data.goals);
            })
    }, [triggerRerender])
    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {goals.length > 0 ? (
                goals.map((goal) => {
                    let remaining = goal.goal - goal.balance;
                    let data = [goal.balance, remaining];
                    return (
                        <PieChart
                            backgroundColors={colorShades}
                            labels={labels}
                            data={data}
                            title={goal.name}
                            key={goal.id}
                            maxWidth="500px"
                        />
                    );
                })
            ) : (
                <p>No goals available.</p>
            )}
        </div>

    )
}