import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import "./Investments.css";
import pops from "pop-message";
import "../../../node_modules/pop-message/pop.css";
import { fetchData } from "../../utility/fetchData";

export default function NewInvestment({ onInvestmentCreated }) {
    const [investmentCategories, setInvestmentCategories] = useState([]);
    const [description, setDescription] = useState("");
    const [invested, setInvested] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentValue, setCurrentValue] = useState(0);
    const url = "http://localhost:3001/investments/";
    useEffect(() => {
        fetchData(`${url}investment-types`)
            .then((data) => {
                setInvestmentCategories(data.types || []);
            })
    }, []);

    const handleNewInvestment = (e) => {
        e.preventDefault();
        const newInvestmentData = {
            description: description,
            invested: Number(invested),
            currentValue: Number(currentValue),
            type: selectedCategory
        };

        fetchData(url, "POST", newInvestmentData)
            .then((successData) => {
                pops.simplePop("success", successData.message);
                onInvestmentCreated();
            })
    };

    return (
        <div className="new-investment">
            <h2>New Investment</h2>
            <form onSubmit={handleNewInvestment}>
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
                    <label htmlFor="invested">Invested</label>
                    <input
                        className="normal-input"
                        type="number"
                        required
                        name="invested"
                        id="invested"
                        value={invested}
                        onChange={(e) => setInvested(e.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="currentValue">Current value</label>
                    <input
                        className="normal-input"
                        type="number"
                        required
                        name="currentValue"
                        id="currentValue"
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
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
                        {investmentCategories.map((category, index) => (
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
