import { useState } from "react";
import Button from "../../components/button/Button";
import { fetchData } from "../../utility/fetchData";
import pops from "pop-message";

export default function NewLoan({ onLoanCreated }) {
    const [formData, setFormData] = useState({
        name: "",
        bank: "",
        loanAmount: "",
        loanTerm: "",
        interestMethod: "",
        interestRate: "",
        monthlyRepayment: "",
        firstPayment: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        fetchData("http://localhost:3001/loans", "POST", formData).then(
            (successData) => {
                pops.simplePop("success", successData.message);
                onLoanCreated();
            }
        );
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <h2 className="h2">New Loan</h2>
            <div style={{ display: "flex", position: "relative" }}>
                <div className="column">
                    <div className="input-wrapper">
                        <label htmlFor="name">Name</label>
                        <input
                            value={formData.name}
                            type="text"
                            className="normal-input"
                            id="name"
                            name="name"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="bank">Bank</label>
                        <select
                            value={formData.bank}
                            id="bank"
                            name="bank"
                            className="normal-input"
                            required
                            onChange={handleInputChange}
                        >
                            <option value="">Select a bank</option>
                            <option value="Bank A">Bank A</option>
                            <option value="Bank B">Bank B</option>
                            <option value="Bank C">Bank C</option>
                        </select>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="loanAmount">Loan Amount (R)</label>
                        <input
                            value={formData.loanAmount}
                            type="number"
                            className="normal-input"
                            id="loanAmount"
                            name="loanAmount"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="loanTerm">Loan Term (months)</label>
                        <input
                            value={formData.loanTerm}
                            type="number"
                            className="normal-input"
                            id="loanTerm"
                            name="loanTerm"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="column">
                    <div className="input-wrapper">
                        <label htmlFor="interestRate">Interest Rate (%)</label>
                        <input
                            value={formData.interestRate}
                            type="number"
                            step="0.0001"
                            className="normal-input"
                            id="interestRate"
                            name="interestRate"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="monthlyRepayment">
                            Monthly Repayment
                        </label>
                        <input
                            value={formData.monthlyRepayment}
                            type="number"
                            step="0.01"
                            className="normal-input"
                            id="monthlyRepayment"
                            name="monthlyRepayment"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="firstPayment">First Payment Date</label>
                        <input
                            value={formData.firstPayment}
                            type="date"
                            className="normal-input"
                            id="firstPayment"
                            name="firstPayment"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <Button
                    styles={{
                        position: "absolute",
                        bottom: "20px",
                        right: "20px",
                        width: "48%",
                    }}
                    className="primary-btn"
                    onClick={handleSubmit}
                >
                    Create
                </Button>
            </div>
        </div>
    );
}
