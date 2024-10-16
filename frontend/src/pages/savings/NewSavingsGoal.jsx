import { useState } from "react";
import Button from "../../components/button/Button";
import "./Savings.css";
import pops from "pop-message";
import "../../../node_modules/pop-message/pop.css";
import { fetchData } from "../../utility/fetchData";

export default function NewSavingsGoal({ onGoalCreated }) {
    const [name, setName] = useState("");
    const [balance, setBalance] = useState(0);
    const [goal, setGoal] = useState(0);

    const handleNewGoal = (e) => {
        e.preventDefault();
        if (Number(goal) <= Number(balance)) {
            pops.simplePop("error", "Goal must be more than the balance")
        }
        else {
            const newGoal = {
                name: name,
                balance: Number(balance),
                goal: Number(goal)
            };

            fetchData("http://localhost:3001/savings/goal", "POST", newGoal)
                .then((successData) => {
                    pops.simplePop("success", successData.message);
                    onGoalCreated();
                })
        }

    }
    return (
        <div className="new-goal">
            <h2>New Savings Goal</h2>
            <form onSubmit={handleNewGoal}>
                <div className="input-wrapper">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="normal-input"
                        required
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="balance">Starting balance</label>
                    <input
                        className="normal-input"
                        type="number"
                        name="balance"
                        id="balance"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="goal">Goal</label>
                    <input
                        className="normal-input"
                        type="number"
                        required
                        name="goal"
                        id="goal"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                    />
                </div>
                <Button className="primary-btn" type="submit">Create</Button>
            </form>
        </div>
    );
};

