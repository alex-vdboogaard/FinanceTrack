import { useEffect, useState } from "react"
import Button from "../../components/button/Button"
import { fetchData } from "../../utility/fetchData"
import Widget from "../../components/widget/Widget";
import "./Home.css"
import InvestmentDiv from "./InvestmentDiv";
import BankAccountDiv from "./BankAccountDiv";
import AssetDiv from "./AssetDiv";

export default function Home() {
    const [netWorth, setNetWorth] = useState({});
    const [bankAccounts, setBankAccounts] = useState([]);
    const [investments, setInvestments] = useState([]);
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        fetchData("http://localhost:3001/overview")
            .then((data) => {
                setNetWorth(data.netWorth.total);
                setBankAccounts(data.bankAccounts);
                setInvestments(data.investments);
                setAssets(data.assets);
            })
    }, [netWorth, bankAccounts, investments])

    return (
        <main>
            <h1>Good morning, Alex</h1>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <Widget width="500px" maxHeight="400px">
                    <h2>Bank accounts</h2>
                    {bankAccounts.map((account, index) => (
                        <BankAccountDiv key={index} account={account} />
                    ))}
                </Widget>
                <Widget width="500px" maxHeight="400px">
                    <h2>Investments</h2>
                    {investments.map((inv, index) => (
                        <InvestmentDiv key={index} investment={inv} />
                    ))}
                </Widget>
                <Widget width="500px" maxHeight="400px">
                    <h2>Assets</h2>
                    <div style={{ display: "flex", overflowY: "auto" }}>
                        {assets.map((asset, index) => (
                            <AssetDiv key={index} asset={asset} />
                        ))}
                    </div>
                </Widget>
            </div>
            <Button onClick={() => alert("Hi!")} className='primary-btn'>+ Add new asset</Button>
        </main>

    )
}