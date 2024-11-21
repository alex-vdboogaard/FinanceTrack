import { useState } from "react";
import "../../../node_modules/pop-message/pop.css";

export default function LoansList({ loans }) {
    const calcTotalBalance = () => {
        return loans.reduce((acc, l) => acc + parseFloat(l.balance), 0);
    };
    const [count, setCount] = useState(loans.length);
    const [totalBalance, setTotalBalance] = useState(calcTotalBalance);

    return (
        <table style={{ marginBottom: "50px" }}>
            <thead>
                <tr className="no-border">
                    <th>Name</th>
                    <th>Type</th>
                    <th>Bank</th>
                    <th>Balance (R)</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {loans.map((loan, index) => (
                    <tr key={index}>
                        <td>{loan.name}</td>
                        <td className="bank">
                            <img
                                src={`../src/assets/logos/${loan.bank
                                    .toLowerCase()
                                    .replace(/\s+/g, "")}.svg`}
                                alt={account.bank}
                            />
                            {loan.bank}
                        </td>
                        <td>{loan.interest_rate}</td>
                        <td>{loan.balance}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="2">Count: {count}</td>
                    <td></td>
                    <td>Total: R{totalBalance}</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    );
}
