import { useEffect, useState, useCallback, useMemo } from "react";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
import NewInvestment from "./NewInvestment";
import "./Investments.css";
import "../../../node_modules/pop-message/pop.css";
import pops from "pop-message";
import { fetchData } from "../../utility/fetchData";
import InvestmentPieChart from "./InvestmentPieChart";
import InvestmentBarChart from "./InvestmentBarChart";

export default function Investments() {
    const [investments, setInvestments] = useState([]);
    const [count, setCount] = useState(0);
    const [totalInvested, setTotalInvested] = useState(0);
    const [totalCurrentValue, setTotalCurrentValue] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [triggerRerender, setTriggerRerender] = useState(false);

    const url = "http://localhost:3001/investments";

    const handleRerender = useCallback(() => {
        setTriggerRerender(prev => !prev);
    }, []);

    const calculateTotals = useCallback((investments) => {
        const totalInvested = investments.reduce((acc, investment) => acc + parseFloat(investment.invested), 0);
        const totalCurrentValue = investments.reduce((acc, investment) => acc + parseFloat(investment.currentValue), 0);
        return { totalInvested, totalCurrentValue };
    }, []);

    useEffect(() => {
        fetchData(url)
            .then((data) => {
                const investmentsData = data.investments || [];
                setInvestments(investmentsData);
                setCount(investmentsData.length);
                const { totalInvested, totalCurrentValue } = calculateTotals(investmentsData);
                setTotalInvested(totalInvested);
                setTotalCurrentValue(totalCurrentValue);
            })
            .catch((error) => {
                pops.simplePop("error", "Failed to fetch investments");
                console.error("Error fetching investments:", error);
            });
    }, [triggerRerender, calculateTotals]);

    const handleSave = useCallback((investment) => {
        fetchData(url, "PUT", investment)
            .catch((error) => {
                pops.simplePop("error", "Failed to save investment");
                console.error("Error saving investment:", error);
            });
    }, [url]);

    const handleUpdate = useCallback((index, field, value) => {
        const updatedInvestments = [...investments];
        updatedInvestments[index][field] = value;
        setInvestments(updatedInvestments);
        const { totalInvested, totalCurrentValue } = calculateTotals(updatedInvestments);
        setTotalInvested(totalInvested);
        setTotalCurrentValue(totalCurrentValue);
    }, [investments, calculateTotals]);

    const handleDelete = useCallback(async (investment) => {
        const confirm = await pops.confirmPop(`Are you sure you want to delete '${investment.description}'?`);
        if (confirm) {
            fetchData(url, "DELETE", investment)
                .then((successData) => {
                    const updatedInvestments = investments.filter(a => a.id !== investment.id);
                    setInvestments(updatedInvestments);
                    setCount(prevCount => prevCount - 1);
                    const { totalInvested, totalCurrentValue } = calculateTotals(updatedInvestments);
                    setTotalInvested(totalInvested);
                    setTotalCurrentValue(totalCurrentValue);
                    pops.simplePop("success", successData.message);
                })
                .catch((error) => {
                    pops.simplePop("error", "Failed to delete investment");
                    console.error("Error deleting investment:", error);
                });
        }
    }, [investments, url, calculateTotals]);

    const newInvestment = useCallback(() => {
        setIsSidebarOpen(!isSidebarOpen);
    }, [isSidebarOpen]);

    const growthPercentage = useCallback((investment) => {
        return ((investment.currentValue - investment.invested) / investment.invested) * 100;
    }, []);
    return (
        <main>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h1 style={{ marginRight: "20px" }}>Investments</h1>
                <Button onClick={newInvestment} className="primary-btn">+ New Investment</Button>
            </div>

            <Modal isOpen={isSidebarOpen} toggleSidebar={newInvestment}>
                <NewInvestment onInvestmentCreated={handleRerender} />
            </Modal>

            <table>
                <thead>
                    <tr className="no-border">
                        <th>Description</th>
                        <th>Category</th>
                        <th>Invested (R)</th>
                        <th>Current value (R)</th>
                        <th>Growth</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {investments.map((investment, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    value={investment.description}
                                    onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                                    onBlur={() => handleSave(investment)}
                                />
                            </td>
                            <td>
                                {investment.type}
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={investment.invested}
                                    onChange={(e) => handleUpdate(index, 'invested', parseFloat(e.target.value))}
                                    onBlur={() => handleSave(investment)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={investment.currentValue}
                                    onChange={(e) => handleUpdate(index, 'currentValue', parseFloat(e.target.value))}
                                    onBlur={() => handleSave(investment)}
                                />
                            </td>
                            <td
                                style={{
                                    color: growthPercentage(investment) >= 0 ? 'green' : 'red'
                                }}
                            >
                                {growthPercentage(investment).toFixed(2) + '%'}
                            </td>
                            <td className="delete-icon">
                                <button onClick={() => handleDelete(investment)} aria-label="Delete investment">
                                    <img src="../src/assets/delete.svg" alt="Delete" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">Count: {count}</td>
                        <td>Total: R{totalInvested}</td>
                        <td>Total: R{totalCurrentValue}</td>
                        {investments.length > 0 ? (
                            <td colSpan="2">
                                Total: {((totalCurrentValue - totalInvested) / totalInvested * 100).toFixed(2)}%
                            </td>
                        ) : <td colSpan="2">Total: 0</td>}
                    </tr>
                </tfoot>
            </table>
            <div style={{ marginTop: "50px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap" }}>
                {investments.length > 0 ? (
                    <>
                        <InvestmentPieChart investments={investments} />
                        <InvestmentBarChart investments={investments} />
                    </>
                ) : (
                    <></>
                )}
            </div>

        </main>
    );
}

