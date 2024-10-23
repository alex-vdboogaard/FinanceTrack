import { useEffect, useState, useCallback } from "react";
import Modal from "../../components/modal/Modal";
import "../../../node_modules/pop-message/pop.css";
import pops from "pop-message";
import { fetchData } from "../../utility/fetchData";
import Button from "../../components/button/Button";
import NewIncome from "./NewIncome";

export default function Income({ setIncome }) {
    const [income, setIncomeState] = useState([]);
    const [count, setCount] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [triggerRerender, setTriggerRerender] = useState(false);

    const url = "http://localhost:3001/budget/income";

    const calculateTotal = useCallback((incomeList) => {
        return incomeList.reduce((acc, i) => acc + parseFloat(i.amount), 0);
    }, []);

    useEffect(() => {
        fetchData(url)
            .then((data) => {
                const incomeData = data.income || [];
                setIncomeState(incomeData);
                setIncome(incomeData);
                setCount(incomeData.length);
                setTotalIncome(calculateTotal(incomeData));
            })
    }, [triggerRerender, calculateTotal]);

    const handleRerender = useCallback(() => {
        setTriggerRerender((prev) => !prev);
    }, []);

    const handleSave = useCallback((item) => {
        fetchData(url, "PUT", item)
            .then(() => setTriggerRerender(prev => !prev))
            .catch(() => pops.simplePop("error", "Failed to save income"));
    }, []);

    const handleUpdate = useCallback((index, field, value) => {
        const updatedIncome = [...income];
        updatedIncome[index][field] = value;
        setIncomeState(updatedIncome);
        setTotalIncome(calculateTotal(updatedIncome));
    }, [income, calculateTotal]);

    const handleDelete = useCallback(async (item) => {
        const confirm = await pops.confirmPop(`Are you sure you want to delete '${item.name}'?`);
        if (confirm) {
            fetchData(url, "DELETE", item)
                .then((successData) => {
                    setTriggerRerender(prev => !prev);
                    pops.simplePop("success", successData.message);
                });
        }
    }, []);

    const newIncome = useCallback(() => {
        setSidebarOpen(prev => !prev);
    }, []);

    return (
        <>
            <Modal isOpen={isSidebarOpen} toggleSidebar={newIncome}>
                <NewIncome onIncomeCreated={handleRerender} />
            </Modal>
            <div style={{ display: "flex", alignItems: "center", marginTop: "40px" }}>
                <h2 style={{ marginRight: "1px" }}>Income</h2>
                <Button onClick={newIncome} className="secondary-btn">+</Button>
            </div>
            <table>
                <thead>
                    <tr className="no-border">
                        <th>Name</th>
                        <th>Category</th>
                        <th>Amount (R)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {income.length === 0 ? (
                        <tr>
                            <td colSpan="4">No income available.</td>
                        </tr>
                    ) : (
                        income.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => handleUpdate(index, 'name', e.target.value)}
                                        onBlur={() => handleSave(item)}
                                    />
                                </td>
                                <td>{item.type}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={item.amount}
                                        onChange={(e) => handleUpdate(index, 'amount', parseFloat(e.target.value))}
                                        onBlur={() => handleSave(item)}
                                    />
                                </td>
                                <td className="delete-icon">
                                    <button onClick={() => handleDelete(item)} aria-label="Delete income">
                                        <img src="../../src/assets/delete.svg" alt="Delete" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">Count: {count}</td>
                        <td colSpan="2">Total: R{totalIncome}</td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
}

