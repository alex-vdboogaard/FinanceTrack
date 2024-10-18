import { useEffect, useState } from "react";
import Button from "../../components/button/Button"
import Modal from "../../components/modal/Modal";
import NewInvestment from "./NewInvestment";
import "./Investments.css"
import "../../../node_modules/pop-message/pop.css"
import pops from "pop-message"
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

    const handleRerender = () => {
        setTriggerRerender(prev => !prev);
    };

    useEffect(() => {
        fetchData(url)
            .then((data) => {
                setInvestments(data.investments || []);
                setCount(data.investments.length);
                setTotalInvested(data.investments.reduce((acc, investment) => acc + parseFloat(investment.invested), 0));
                setTotalCurrentValue(data.investments.reduce((acc, investment) => acc + parseFloat(investment.currentValue), 0));

            })
    }, [triggerRerender]);

    const handleSave = (investment) => {
        fetchData(url, "PUT", investment)
    };

    const handleUpdate = (index, field, value) => {
        const updatedInvestments = [...investments];
        updatedInvestments[index][field] = value;
        setInvestments(updatedInvestments);
        setTotalInvested(updatedInvestments.reduce((acc, investment) => acc + parseFloat(investment.invested), 0));
        setTotalCurrentValue(updatedInvestments.reduce((acc, investment) => acc + parseFloat(investment.currentValue), 0));
    };

    const handleDelete = async (investment) => {
        const confirm = await pops.confirmPop(`Are you sure you want to delete '${investment.description}'?`);
        if (confirm) {
            fetchData(url, "DELETE", investment)
                .then((successData) => {
                    setInvestments(investments.filter(a => a.id !== investment.id));
                    setCount(prevCount => prevCount - 1);
                    setTotalInvested(investments.reduce((acc, investment) => acc + parseFloat(investment.invested), 0)); // Update to invested
                    setTotalCurrentValue(investment.reduce((acc, investment) => acc + parseFloat(investment.currentValue), 0)); // Update to invested
                    pops.simplePop("success", successData.message);
                });
        }
    };

    const newInvestment = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

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
                        <th>Growth (%)</th>
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
                                    onChange={(e) => handleUpdate(index, 'description', e.target.value, investment)} // Update to description
                                    onBlur={(e) => handleSave(investment)}
                                />
                            </td>
                            <td>
                                {investment.type}
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={investment.invested}
                                    onChange={(e) => handleUpdate(index, 'invested', parseFloat(e.target.value), investment)}
                                    onBlur={() => handleSave(investment)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={investment.currentValue}
                                    onChange={(e) => handleUpdate(index, 'currentValue', parseFloat(e.target.value), investment)}
                                    onBlur={() => handleSave(investment)}
                                />
                            </td>
                            <td
                                style={{
                                    color: ((investment.currentValue - investment.invested) / investment.invested) * 100 > 0 ? 'green' : 'red'
                                }}
                            >
                                {(Math.round(((investment.currentValue - investment.invested) / investment.invested) * 100 * 100) / 100).toFixed(2) + '%'}

                            </td>
                            <td className="delete-icon">
                                <button onClick={() => handleDelete(investment)}><img src="../src/assets/delete.svg" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">Count: {count}</td>
                        <td>Total: R{totalInvested}</td>
                        <td>Total: R{totalCurrentValue}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
            <div style={{ marginTop: "50px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap" }}>
                <InvestmentPieChart investments={investments} />
                <InvestmentBarChart investments={investments} />
            </div>
        </main >
    );
}
