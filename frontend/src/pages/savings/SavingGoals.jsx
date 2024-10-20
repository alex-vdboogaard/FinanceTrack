import getColorShades from "../../utility/colors";
import DoughnutChart from "../../components/graph/DoughnutChart";
import { useEffect, useState } from "react";
import { fetchData } from "../../utility/fetchData";
import pops from "pop-message";
import Button from "../../components/button/Button";
import Widget from "../../components/widget/Widget";
export default function SavingGoals({ triggerRerender }) {
    const colorShades = getColorShades(2);
    const labels = ["Balance", "Remaining"];
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        fetchData("http://localhost:3001/savings/goal")
            .then((data) => {
                setGoals(data.goals);
            })
    }, [triggerRerender]);

    const handleDelete = async (goal) => {
        const confirm = await pops.confirmPop(`Are you sure you want to delete: ${goal.name}`);
        if (confirm) {
            fetchData("http://localhost:3001/savings/goal", "DELETE", { id: goal.id, userId: goal.userId })
                .then((successData) => {
                    pops.simplePop("success", successData.message);
                    triggerRerender();
                })
                .catch((error) => {
                    pops.simplePop("error", "Failed to delete goal");
                    console.error("Error deleting goal:", error);
                });
        }
    };

    const handleDeposit = async (goal) => {
        const currentBalance = Math.floor(parseFloat(goal.balance));
        let depositAmount = parseFloat(await pops.inputPop(`Enter deposit amount for ${goal.name}:`));
        if (!isNaN(depositAmount) && depositAmount > 0) {
            depositAmount = Math.floor(depositAmount);
            const newBalance = currentBalance + depositAmount;

            fetchData("http://localhost:3001/savings/goal/deposit", "POST", {
                id: goal.id,
                goal: goal.goal,
                balance: newBalance,
                userId: goal.userId
            })
                .then((successData) => {
                    pops.simplePop("success", successData.message);
                    triggerRerender();
                })
        }
    };

    const handleEdit = async (goal) => {
        const newGoal = await pops.inputPop(`New goal (R) for "${goal.name}"`);

        const newGoalNumber = parseFloat(newGoal);
        if (!isNaN(newGoalNumber) && newGoal.trim() !== "") {
            fetchData("http://localhost:3001/savings/goal", "PUT", {
                id: goal.id,
                userId: goal.userId,
                goal: newGoalNumber
            })
                .then((successData) => {
                    pops.simplePop("success", successData.message);
                    triggerRerender();
                })
        }
    };

    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {goals.length > 0 ? (
                goals.map((goal) => {
                    let remaining = goal.goal - goal.balance;
                    let data = [goal.balance, remaining];
                    return (
                        <Widget key={`${goal.id}-${goal.userId}`}>
                            <div style={{ margin: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <h3>{goal.name} - R{goal.goal}</h3>
                                <DoughnutChart
                                    backgroundColors={colorShades}
                                    labels={labels}
                                    data={data}
                                    title={` `}
                                    maxWidth="500px"
                                />
                                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                    <Button className="primary-btn" onClick={() => handleDeposit(goal)}>
                                        Deposit
                                    </Button>
                                    <button style={{ marginLeft: "5px" }} onClick={() => handleEdit(goal)} >
                                        <img style={{ marginTop: "3px" }} src="./src/assets/edit.svg" alt="edit icon" />
                                    </button>
                                    <button onClick={() => handleDelete(goal)} >
                                        <img src="./src/assets/delete.svg" alt="delete icon" />
                                    </button>
                                </div>

                            </div>
                        </Widget>

                    );
                })
            ) : (
                <></>
            )}
        </div>
    );
}

