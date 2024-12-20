import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchData } from "../../utility/fetchData";
import Button from "../../components/button/Button";
import pops from "pop-message";
import { formatDate } from "../../utility/dates";
import deleteIcon from "../../assets/delete.svg";

export default function LoanPage() {
    const navigate = useNavigate();
    const { id } = useParams("id");
    const [loan, setLoan] = useState({});

    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        bank: "",
        loan_amount: 0,
        term: 0,
        balance: 0,
        interest_rate: 0,
        monthly_repayment: 0,
        first_payment: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetchData("http://localhost:3001/loans", "PUT", formData).then(
            (successData) => {
                pops.simplePop("success", successData.message);
            }
        );
    };

    const handleDelete = async () => {
        const confirm = await pops.confirmPop(
            "Are you sure you want to delete this loan? It will delete all associated data"
        );
        if (confirm) {
            fetchData("http://localhost:3001/loans", "DELETE", { id }).then(
                (successData) => {
                    navigate("/loans");
                }
            );
        }
    };

    useEffect(() => {
        fetchData(`http://localhost:3001/loans/${id}`).then((data) => {
            const {
                id,
                name,
                bank,
                loan_amount,
                term,
                balance,
                interest_rate,
                monthly_repayment,
                first_payment,
            } = data.loan;
            setFormData({
                id,
                name,
                bank,
                loan_amount,
                term,
                balance,
                interest_rate,
                monthly_repayment,
                first_payment: formatDate(first_payment),
            });
        });
    }, []);

    return (
        <main>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                    type="back"
                    onClick={() => {
                        navigate("/loans");
                    }}
                ></Button>
                <h1>{formData.name}</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="bank">Bank</label>
                    <input
                        value={formData.bank}
                        id="bank"
                        name="bank"
                        className="normal-input disabled"
                        disabled
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="loanAmount">Loan Amount (R)</label>
                    <input
                        min={0}
                        value={formData.loan_amount}
                        type="number"
                        className="normal-input disabled"
                        id="loan_amount"
                        name="loan_amount"
                        disabled
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="loan_term">Loan Term (months)</label>
                    <input
                        min={1}
                        value={formData.term}
                        type="number"
                        className="normal-input disabled"
                        id="loan_term"
                        name="loan_term"
                        disabled
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="interest_rate">Interest Rate (%)</label>
                    <input
                        min={0}
                        value={formData.interest_rate}
                        type="number"
                        step="0.0001"
                        className="normal-input"
                        id="interest_rate"
                        name="interest_rate"
                        required
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="monthly_repayment">Monthly Repayment</label>
                    <input
                        min={0}
                        value={formData.monthly_repayment}
                        type="number"
                        step="0.01"
                        className="normal-input"
                        id="monthly_repayment"
                        name="monthly_repayment"
                        required
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="first_payment">First Payment Date</label>
                    <input
                        value={formData.first_payment}
                        className="normal-input disabled"
                        id="first_payment"
                        name="first_payment"
                        disabled
                    />
                </div>
                <Button onClick={handleDelete} className="secondary-btn">
                    <img src={deleteIcon} alt="delete icon" />
                </Button>
                <Button className="primary-btn" type="submit">
                    Save changes
                </Button>
            </form>
        </main>
    );
}
