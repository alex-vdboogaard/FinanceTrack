import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import { fetchData } from "../../utility/fetchData";
import pops from "pop-message";

export default function NewLoan({ onLoanCreated }) {
    const [banks, setBanks] = useState([]);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        bank: "",
        loanAmount: "",
        loanTerm: "",
        interestRate: "",
        monthlyRepayment: "",
        firstPayment: "",
        balance: 0,
        category: 0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetchData("http://localhost:3001/loans", "POST", formData).then(
            (successData) => {
                pops.simplePop("success", successData.message);
                onLoanCreated();
            }
        );
    };

    useEffect(() => {
        fetchData("http://localhost:3001/loans/data/loan-categories").then(
            (data) => {
                setBanks(data.banks);
                setCategories(data.categories);
            }
        );
    });

    return (
        <>
            <h2 className="h2">New Loan</h2>
            <form
                onSubmit={handleSubmit}
                style={{ display: "flex", position: "relative" }}
            >
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
                        <label htmlFor="category">Category</label>
                        <select
                            type="text"
                            className="normal-input"
                            id="category"
                            name="category"
                            required
                            onChange={handleInputChange}
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => {
                                return (
                                    <option value={cat.id}>{cat.name}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="bank">Bank</label>
                        <select
                            id="bank"
                            name="bank"
                            className="normal-input"
                            required
                            onChange={handleInputChange}
                        >
                            <option value="">Select a bank</option>
                            {banks.map((bank) => {
                                return (
                                    <option value={bank.id}>{bank.name}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="loanAmount">Loan Amount (R)</label>
                        <input
                            min={0}
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
                        <label htmlFor="balance">Starting Balance (R)</label>
                        <input
                            min={0}
                            value={formData.balance}
                            type="number"
                            className="normal-input"
                            id="balance"
                            name="balance"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="column">
                    <div className="input-wrapper">
                        <label htmlFor="interestRate">Interest Rate (%)</label>
                        <input
                            min={0}
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
                            min={0}
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
                    <div className="input-wrapper">
                        <label htmlFor="loanTerm">Loan Term (months)</label>
                        <input
                            min={1}
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
                <Button
                    styles={{
                        position: "absolute",
                        bottom: "20px",
                        right: "20px",
                        width: "48%",
                    }}
                    className="primary-btn"
                    type="submit"
                >
                    Create
                </Button>
            </form>
        </>
    );
}
