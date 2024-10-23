import { useEffect, useState, useCallback, useMemo } from "react";
import Modal from "../../components/modal/Modal";
import "../../../node_modules/pop-message/pop.css";
import pops from "pop-message";
import { fetchData } from "../../utility/fetchData";
import Button from "../../components/button/Button";

export default function Expenses() {
    const [state, setState] = useState({
        expenses: [],
        count: 0,
        totalExpenses: 0,
        isSidebarOpen: false,
        triggerRerender: false,
    });

    const { expenses, count, totalExpenses, isSidebarOpen, triggerRerender } = state;

    const url = "http://localhost:3001/budget/expenses";

    const calculateTotal = useCallback((expensesList) => {
        const total = expensesList.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
        return total;
    }, []);

    useEffect(() => {
        fetchData(url)
            .then((data) => {
                const expenseData = data.expenses || [];
                setState(prev => ({
                    ...prev,
                    expenses: expenseData,
                    count: expenseData.length,
                    totalExpenses: calculateTotal(expenseData)
                }));
            })
            .catch(() => {
                pops.simplePop("error", "Failed to fetch expenses");
            });
    }, [triggerRerender, calculateTotal]);

    const handleSave = useCallback((expense) => {
        fetchData(url, "PUT", expense)
            .then(() => setState(prev => ({ ...prev, triggerRerender: !prev.triggerRerender })))
            .catch(() => pops.simplePop("error", "Failed to save expense"));
    }, []);

    const handleUpdate = useCallback((index, field, value) => {
        const updatedExpenses = [...expenses];
        updatedExpenses[index][field] = value;
        setState(prev => ({
            ...prev,
            expenses: updatedExpenses,
            totalExpenses: calculateTotal(updatedExpenses),
        }));
    }, [expenses, calculateTotal]);

    const handleDelete = useCallback(async (expense) => {
        const confirm = await pops.confirmPop(`Are you sure you want to delete '${expense.name}'?`);
        if (confirm) {
            fetchData(url, "DELETE", expense)
                .then(() => setState(prev => ({ ...prev, triggerRerender: !prev.triggerRerender })))
                .catch(() => pops.simplePop("error", "Failed to delete expense"));
        }
    }, []);

    const newExpense = useCallback(() => {
        setState(prev => ({ ...prev, isSidebarOpen: !prev.isSidebarOpen }));
    }, [isSidebarOpen]);

    const NewExpenseModal = useMemo(() => (
        <Modal isOpen={isSidebarOpen} toggleSidebar={newExpense}>
            <h2>New expense</h2>
        </Modal>
    ), [isSidebarOpen, newExpense]);

    return (
        <>
            {NewExpenseModal}
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2 style={{ marginRight: "10px" }}>Expenses</h2>
                <Button onClick={newExpense} className="primary-btn">+</Button>
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
                    {expenses.length === 0 ? (
                        <tr>
                            <td colSpan="4">No expenses available.</td>
                        </tr>
                    ) : (
                        expenses.map((expense, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="text"
                                        value={expense.name}
                                        onChange={(e) => handleUpdate(index, 'name', e.target.value)}
                                        onBlur={() => handleSave(expense)}
                                    />
                                </td>
                                <td>{expense.type}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={expense.amount}
                                        onChange={(e) => handleUpdate(index, 'amount', parseFloat(e.target.value))}
                                        onBlur={() => handleSave(expense)}
                                    />
                                </td>
                                <td className="delete-icon">
                                    <button onClick={() => handleDelete(expense)} aria-label="Delete expense">
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
                        <td colSpan="2">Total: R{totalExpenses}</td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
}
