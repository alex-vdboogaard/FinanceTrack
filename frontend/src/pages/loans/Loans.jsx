import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
import NewLoan from "./NewLoan";
import LoansList from "./LoansList";
import { fetchData } from "../../utility/fetchData";
import "./Loans.css";
import UpcomingPayment from "./UpcomingPayment";
export default function Loans() {
    const [loans, setLoans] = useState([]);
    const [newLoanOpen, setNewLoanOpen] = useState(false);
    const [rerender, setRerender] = useState(false);

    const handleRerender = () => {
        setNewLoanOpen(false);
        setRerender((prev) => !prev);
    };

    const toggleNewLoan = () => {
        setNewLoanOpen((prev) => !prev);
    };

    //fetch data
    useEffect(() => {
        fetchData("http://localhost:3001/loans").then((data) => {
            setLoans(data.loans);
        });
    }, [rerender]);

    return (
        <main>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h1 style={{ marginRight: "20px" }}>Loans</h1>
                <Button
                    className="primary-btn"
                    onClick={() => {
                        toggleNewLoan();
                    }}
                >
                    + New loan
                </Button>
                <Modal
                    type={"center"}
                    isOpen={newLoanOpen}
                    toggleSidebar={toggleNewLoan}
                >
                    <NewLoan
                        onLoanCreated={() => {
                            handleRerender;
                        }}
                    ></NewLoan>
                </Modal>
            </div>
            <LoansList loans={loans}></LoansList>
            <h2 className="h2">Upcoming payments</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Balance</th>
                        <th>Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {loans.map((loan) => (
                        <UpcomingPayment key={loan.id} loan={loan} />
                    ))}
                </tbody>
            </table>
        </main>
    );
}
