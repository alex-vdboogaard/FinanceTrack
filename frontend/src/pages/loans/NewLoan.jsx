import { useState } from "react";
import Button from "../../components/button/Button";
import { fetchData } from "../../utility/fetchData";
import pops from "pop-message";

export default function NewLoan({ onLoanCreated }) {
    const [formData, setFormData] = useState({ name: "" });

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
        <>
            <h2 className="h2">New Loan</h2>
            <div className="input-wrapper">
                <label htmlFor="name">Name</label>
                <input
                    value={formData.name}
                    type="text"
                    className="normal-input"
                    id="name"
                    name="name"
                    onChange={handleInputChange}
                />
            </div>
            <Button className="primary-btn" onClick={handleSubmit}>
                Create
            </Button>
        </>
    );
}
