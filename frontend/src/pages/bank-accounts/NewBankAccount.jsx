import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import "./BankAccounts.css";
import pops from "pop-message";
import "../../../node_modules/pop-message/pop.css";
import { fetchData } from "../../utility/fetchData"

export default function NewBankAccount({ onBankCreated }) {
    const [bankTypes, setBankTypes] = useState([]);
    const [banks, setBanks] = useState([]);
    const [name, setName] = useState("");
    const [balance, setBalance] = useState(0);
    const [selectedType, setSelectedType] = useState("");
    const [selectedBank, setSelectedBank] = useState("");

    useEffect(() => {
        fetchData(`http://localhost:3001/bank-accounts/bank-types`)
            .then((data) => {
                setBankTypes(data.types);
            })
        fetchData(`http://localhost:3001/bank-accounts/banks`)
            .then((data) => {
                setBanks(data.banks);
            })
    }, []);

    const handleNewBank = (e) => {
        e.preventDefault();
        const newBankAccount = {
            name: name,
            balance: Number(balance),
            type: selectedType,
            bank: selectedBank
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
                    <label htmlFor="bank">Bank</label>
                    <select
                        className="normal-input"
                        name="bank"
                        required
                        id="bank"
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                    >
                        <option value="">Select</option>
                        {banks.map((bank, index) => (
                            <option key={index} value={bank.id}>
                                {bank.name}
                            </option>
                        ))}
                    </select>
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
