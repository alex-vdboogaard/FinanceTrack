import { useEffect, useState } from "react";
import "../../../node_modules/pop-message/pop.css";
import { useNavigate } from "react-router-dom";

export default function LoansList({ loans }) {
    const navigate = useNavigate();
    const handleOpen = (id) => {
        navigate(`/loans/${id}`);
    };
    const calcTotalBalance = (loans) => {
        return loans.reduce((acc, l) => acc + parseFloat(l.balance), 0);
    };
    const [count, setCount] = useState(loans.length);
    const [totalBalance, setTotalBalance] = useState(0);

    useEffect(() => {
        setTotalBalance(calcTotalBalance(loans));
    });
    return (
        <table style={{ marginBottom: "50px" }}>
            <thead>
                <tr className="no-border">
                    <th>Name</th>
                    <th>Type</th>
                    <th>Bank</th>
                    <th>Interest rate (%)</th>
                    <th>Balance (R)</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {loans.map((loan, index) => (
                    <tr key={index}>
                        <td>{loan.name}</td>
                        <td>{loan.type}</td>
                        <td className="bank">
                            <img
                                src={`../src/assets/logos/${loan.bank
                                    .toLowerCase()
                                    .replace(/\s+/g, "")}.svg`}
                                alt={loan.bank}
                            />
                            {loan.bank}
                        </td>
                        <td>
                            {loan.interest_rate
                                ? loan.interest_rate.toString()
                                : "N/A"}
                        </td>
                        <td>{loan.balance}</td>
                        <td>
                            <button
                                onClick={() => {
                                    handleOpen(loan.id);
                                }}
                            >
                                <img
                                    src="../src/assets/open.svg"
                                    alt="open icon"
                                />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="2">Count: {count}</td>
                    <td></td>
                    <td></td>
                    <td>Total: R{totalBalance}</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    );
}
