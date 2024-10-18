import { useEffect, useState } from "react";
import Button from "../../components/button/Button"
import Modal from "../../components/modal/Modal";
import NewSavingsGoal from "./NewSavingsGoal";
import SavingGoals from "./SavingGoals";
import "./Savings.css"
import "../../../node_modules/pop-message/pop.css"
import { fetchData } from "../../utility/fetchData";

export default function Savings() {
    const [savings, setSavings] = useState([]);
    const [count, setCount] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const url = "http://localhost:3001/savings";
    const [triggerRerender, setTriggerRerender] = useState(false);

    const handleRerender = () => {
        setTriggerRerender(prev => !prev);
    };

    useEffect(() => {
        fetchData(url)
            .then((data) => {
                setSavings(data.savings);
                setCount(data.savings.length);
                setTotalBalance(data.savings.reduce((acc, s) => acc + parseFloat(s.balance), 0));
            })
    }, [triggerRerender]);

    const newGoal = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    return (
        <main>
            <h1 style={{ marginRight: "20px" }}>Savings</h1>

            <Modal isOpen={isSidebarOpen} toggleSidebar={newGoal}>
                <NewSavingsGoal onGoalCreated={handleRerender} />
            </Modal>

            <table style={{ marginBottom: "50px" }}>
                <thead>
                    <tr className="no-border">
                        <th>Name</th>
                        <th>Balance (R)</th>
                    </tr>
                </thead>
                <tbody>
                    {savings.map((account, index) => (
                        <tr key={index}>
                            <td>
                                <p>{account.name}</p>
                            </td>
                            <td>
                                {account.balance}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td>Count: {count}</td>
                        <td>Total: R{totalBalance}</td>
                    </tr>
                </tfoot>
            </table>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                <h2 className="h2">Saving goals</h2>
                <Button onClick={newGoal} className="primary-btn">+ New savings goal</Button>
            </div>
            <SavingGoals triggerRerender={handleRerender} />
        </main >
    );
}
