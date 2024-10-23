import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import pops from "pop-message";
import "../../../node_modules/pop-message/pop.css";
import { fetchData } from "../../utility/fetchData";

export default function NewExpense({ onExpenseCreated }) {
    const [expenseCategories, setExpenseCategories] = useState([]);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");

    const url = "http://localhost:3001/budget/expenses";
    useEffect(() => {
        fetchData(`${url}/expense-categories`)
            .then((data) => {
                setExpenseCategories(data.types || []);
            })
    }, []);

    const handleNewExpense = (e) => {
        e.preventDefault();
        const newExpenseData = {
            description: description,
            amount: amount,
            categoryId: selectedCategory
        };

        fetchData(url, "POST", newExpenseData)
            .then((successData) => {
                pops.simplePop("success", successData.message);
                onExpenseCreated();
            })
    };

    return (
        <div className="new-expense">
            <h2>New Expense</h2>
            <form onSubmit={handleNewExpense}>
                <div className="input-wrapper">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="normal-input"
                        required
                        name="description"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="amount">Amount (R)</label>
                    <input
                        className="normal-input"
                        type="number"
                        required
                        name="amount"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="category">Category</label>
                    <select
                        className="normal-input"
                        name="category"
                        required
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Select</option>
                        {expenseCategories.map((category, index) => (
                            <option key={index} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <Button className="primary-btn" type="submit">Create</Button>
            </form>
        </div>
    );
}
