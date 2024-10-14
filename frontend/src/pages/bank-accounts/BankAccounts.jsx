import { useEffect, useState } from "react";
import Button from "../../components/button/Button"
import Modal from "../../components/modal/Modal";
import NewBankAccount from "./NewBankAccount";
import "./BankAccounts.css"
import "../../../node_modules/pop-message/pop.css"
import pops from "pop-message"

export default function BankAccounts() {
    const [bankAccounts, setBankAccounts] = useState([]);
    const [count, setCount] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [triggerRerender, setTriggerRerender] = useState(false);

    const handleRerender = () => {
        setTriggerRerender(prev => !prev);
    };

    useEffect(() => {
        fetch(`http://localhost:3001/bank-accounts`)
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        pops.simplePop("error", errorData.message || "Network error");
                    });
                }
                return response.json();
            })
            .then((data) => {
                setBankAccounts(data.bankAccounts);
                setCount(data.bankAccounts.length);
                setTotalBalance(data.bankAccounts.reduce((acc, a) => acc + parseFloat(a.balance), 0));
            })
            .catch((error) => {
                console.log("Error: ", error)
            });
    }, [triggerRerender]);

    const handleSave = (bankAccount) => {
        fetch(`http://localhost:3001/bank-accounts`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bankAccount),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        pops.simplePop("error", errorData.message || "Network error");
                    });
                }
            })
            .catch(error => {
                pops.simplePop("error", `Error updating bank account: ${error}`);
            });
    };

    const handleUpdate = (index, field, value) => {
        const updatedBanks = [...bankAccounts];
        updatedBanks[index][field] = value;
        setBankAccounts(updatedBanks);
        if (field === "balance") {
            setTotalBalance(bankAccounts.reduce((acc, a) => acc + parseFloat(a.balance), 0));
        }
    };

    const handleDelete = async (bankAccount) => {
        const confirm = await pops.confirmPop(`Are you sure you want to delete '${bankAccount.name}'?`);
        if (confirm) {
            fetch(`http://localhost:3001/bank-accounts`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: bankAccount.id,
                    userId: bankAccount.userId
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(errorData => {
                            pops.simplePop("error", errorData.message || "Network error");
                        });
                    }
                    return response.json().then(successData => {
                        setBankAccounts(bankAccounts.filter(a => a.id !== bankAccount.id));
                        setCount(prevCount => prevCount - 1);
                        pops.simplePop("success", successData.message);
                    });
                })
                .catch(error => {
                    pops.simplePop("error", `Error deleting account: ${error}`);
                });
        }
    };

    const newBankAccount = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    return (
        <main>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h1 style={{ marginRight: "20px" }}>Bank Accounts</h1>
                <Button onClick={newBankAccount} className="primary-btn">+ New bank account</Button>
            </div>

            <Modal isOpen={isSidebarOpen} toggleSidebar={newBankAccount}>
                <NewBankAccount onBankCreated={handleRerender} />
            </Modal>

            <table>
                <thead>
                    <tr className="no-border">
                        <th>Name</th>
                        <th>Type</th>
                        <th>Balance (R)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bankAccounts.map((account, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    value={account.name}
                                    onChange={(e) => handleUpdate(index, 'name', e.target.value, account)}
                                    onBlur={() => handleSave(account)}
                                />
                            </td>
                            <td>
                                {account.type}
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={account.balance}
                                    onChange={(e) => handleUpdate(index, 'balance', parseFloat(e.target.value), account)}
                                    onBlur={() => handleSave(account)}
                                />
                            </td>
                            <td className="delete-icon">
                                <button onClick={() => handleDelete(account)}><img src="../src/assets/delete.svg" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">Count: {count}</td>
                        <td>Total: R{totalBalance}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </main >
    );
}
