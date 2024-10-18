import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import "./BankAccounts.css";
import pops from "pop-message";
import "../../../node_modules/pop-message/pop.css";
import { fetchData } from "../../utility/fetchData"

export default function NewBankAccount({ onBankCreated }) {
    const [bankTypes, setBankTypes] = useState([]);
    const [name, setName] = useState("");
    const [balance, setBalance] = useState(0);
    const [selectedType, setSelectedType] = useState("");

    useEffect(() => {
        fetchData(`http://localhost:3001/bank-accounts/bank-types`)
            .then((data) => {
                setBankTypes(data.types);
            })
    }, []);

    const handleNewBank = (e) => {
        e.preventDefault();
        const newBankAccount = {
            name: name,
            balance: Number(balance),
            type: selectedType
        };

        fetchData(`http://localhost:3001/bank-accounts`, "POST", newBankAccount)
            .then((successData) => {
                pops.simplePop("success", successData.message);
                onBankCreated();
            })
    };

    return (
        <div className="new-bank">
            <h2>New Bank Account</h2>
            <form onSubmit={handleNewBank}>
                <div className="input-wrapper">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="normal-input"
                        required
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="balance">Balance</label>
                    <input
                        className="normal-input"
                        type="number"
                        required
                        name="balance"
                        id="balance"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="type">Type</label>
                    <select
                        className="normal-input"
                        name="type"
                        required
                        id="type"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="">Select</option>
                        {bankTypes.map((type, index) => (
                            <option key={index} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>
                <Button className="primary-btn" type="submit">Create</Button>
            </form>
        </div>
    );
}
