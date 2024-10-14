import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import "./BankAccounts.css";
import pops from "pop-message";
import "../../../node_modules/pop-message/pop.css";

export default function NewBankAccount({ onBankCreated }) {
    const [bankTypes, setBankTypes] = useState([]);
    const [name, setName] = useState("");
    const [balance, setBalance] = useState(0);
    const [selectedType, setSelectedType] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3001/bank-accounts/bank-types`)
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        pops.simplePop("error", errorData.message || "Network error");
                    });
                }
                return response.json();
            })
            .then((data) => {
                setBankTypes(data.types);
            })
            .catch((error) => {
                pops.simplePop("error", error);
            });
    }, []);

    const handleNewBank = (e) => {
        e.preventDefault();
        const newBankAccount = {
            name: name,
            balance: Number(balance),
            type: selectedType
        };

        fetch(`http://localhost:3001/bank-accounts`, {
            method: "POST",
            body: JSON.stringify(newBankAccount),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        console.error("Error data:", errorData);
                        pops.simplePop("error", errorData.message || "Network error");
                        throw new Error(errorData.message || "Network error");
                    });
                }
                return response.json();
            })
            .then((successData) => {
                pops.simplePop("success", successData.message);
                onBankCreated();
            })
            .catch((error) => {
                console.error("Catch error:", error);
                pops.simplePop("error", error.message || "An unexpected error occurred");
            });
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
