import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
import "../../../node_modules/pop-message/pop.css";
import Expenses from "./Expenses";
import Income from "./Income";
import BudgetGraphs from "./BudgetGraphs";
import NewReview from "./NewReview";
import { useCallback, useState, useEffect } from "react";
import { fetchData } from "../../utility/fetchData";
import "./Budget.css";

export default function Budget() {
    const [expenses, setExpenses] = useState([]);
    const [income, setIncome] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [triggerRerender, setTriggerRerender] = useState(false);
    const [isReviewOpen, setIsReviewOpen] = useState(false);

    const handleRerender = useCallback(() => {
        setTriggerRerender((prev) => !prev);
        setIsReviewOpen(false);
    }, []);

    const newReview = useCallback(() => {
        setIsReviewOpen((prev) => !prev);
    });

    useEffect(() => {
        fetchData("http://localhost:3001/budget/review").then((data) => {
            setReviews(data.reviews);
        });
    }, [triggerRerender]);

    return (
        <main>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h1 style={{ marginRight: "20px" }}>Budget</h1>
                <Button onClick={newReview} className="primary-btn">
                    + Monthly review
                </Button>
            </div>
            <Expenses setExpenses={setExpenses}></Expenses>
            <Income setIncome={setIncome} />
            <BudgetGraphs
                expenses={expenses}
                income={income}
                reviews={reviews}
            ></BudgetGraphs>

            <Modal isOpen={isReviewOpen} toggleSidebar={newReview}>
                <NewReview onReviewCreated={handleRerender} />
            </Modal>
        </main>
    );
}
