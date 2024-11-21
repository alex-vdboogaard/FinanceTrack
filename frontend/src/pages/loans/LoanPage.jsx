import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../utility/fetchData";

export default function LoanPage() {
    const { id } = useParams("id");
    const [loan, setLoan] = useState({});

    useEffect(() => {
        fetchData(`http://localhost:3000/loans/${id}`).then((data) => {
            setLoan(data.loan);
        });
    }, []);

    return (
        <main>
            <h1>{loan.name}</h1>
            <p>{loan}</p>
        </main>
    );
}
