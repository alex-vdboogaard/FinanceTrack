import { useState } from "react";
import { fetchData } from "../../utility/fetchData";
import pops from "pop-message";
import Button from "../../components/button/Button";

export default function NewReview({ onReviewCreated }) {
    const [formData, setFormData] = useState({
        month: "",
        year: "",
        income: "",
        expenses: "",
        invested: "",
        saved: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        fetchData("http://localhost:3001/budget/review", "POST", formData).then(
            (successData) => {
                pops.simplePop("success", successData.message);
                onReviewCreated();
            }
        );
    };

    return (
        <>
            <h2>New Monthly Review</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="month">Month:</label>
                    <select
                        className="normal-input"
                        id="month"
                        name="month"
                        required
                        value={formData.month}
                        onChange={handleChange}
                    >
                        <option value="">Select Month</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="year">Year:</label>
                    <input
                        className="normal-input"
                        id="year"
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="income">Income:</label>
                    <input
                        className="normal-input"
                        id="income"
                        type="number"
                        name="income"
                        value={formData.income}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="expenses">Expenses:</label>
                    <input
                        className="normal-input"
                        id="expenses"
                        type="number"
                        name="expenses"
                        value={formData.expenses}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="invested">Invested:</label>
                    <input
                        className="normal-input"
                        id="invested"
                        type="number"
                        name="invested"
                        value={formData.invested}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="saved">Saved:</label>
                    <input
                        className="normal-input"
                        id="saved"
                        type="number"
                        name="saved"
                        value={formData.saved}
                        onChange={handleChange}
                    />
                </div>
                <Button className={"primary-btn"} type={"submit"}>
                    Finish
                </Button>
            </form>
        </>
    );
}
