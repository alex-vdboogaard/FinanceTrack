import Button from "../../components/button/Button";
import "../../../node_modules/pop-message/pop.css";
import Expenses from "./Expenses";
import Income from "./Income"
import BudgetGraphs from "./BudgetGraphs";
import { useCallback, useState, useEffect } from "react";
import "./Budget.css"

export default function Budget() {
    const [expenses, setExpenses] = useState([]);
    const [income, setIncome] = useState([]);

    return (
        <main>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h1 style={{ marginRight: "20px" }}>Budget</h1>
                <Button onClick={() => { }} className="primary-btn">+ Monthly review</Button>
            </div>
            <Expenses setExpenses={setExpenses}></Expenses>
            <Income setIncome={setIncome} />
            <BudgetGraphs expenses={expenses} income={income}></BudgetGraphs>
        </main>
    )
}

