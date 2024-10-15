import { useEffect, useState } from "react"
import Button from "../../components/button/Button"
import { fetchData } from "../../utility/fetchData"
import Widget from "../../components/widget/Widget";

export default function Home() {
    const [netWorth, setNetWorth] = useState({});
    const [bankAccounts, setBankAccounts] = useState([]);
    const [investments, setInvestments] = useState([]);

    useEffect(() => {
        fetchData("http://localhost:3001/overview")
            .then((data) => {
                setNetWorth(data.netWorth);
                setBankAccounts(data.bankAccounts || []);
                setInvestments(data.investments);
            })
    }, [netWorth, bankAccounts, investments])

    return (
        <main>
            <h1>Good morning, Alex</h1>
            <Widget width="500px" maxHeight="400px">
                <h2>Bank accounts</h2>
                {bankAccounts.map((account, index) => {
                    <p>{account.description}</p>
                })}
            </Widget>
            <Widget width="500px" maxHeight="400px">
                <h2>Investments</h2>
                {/* {investments} */}
            </Widget>
            <Widget width="500px" maxHeight="400px">
                <h2>Net worth</h2>
                {/* {netWorth} */}
            </Widget>
            <Button onClick={() => alert("Hi!")} className='primary-btn'>+ Add new asset</Button>
        </main>

    )
}