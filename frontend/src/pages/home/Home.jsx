import { useEffect, useState } from "react"
import Button from "../../components/button/Button"
import { fetchData } from "../../utility/fetchData"
import Widget from "../../components/widget/Widget";
import "./Home.css"
import InvestmentDiv from "./InvestmentDiv";
import BankAccountDiv from "./BankAccountDiv";
import AssetDiv from "./AssetDiv";
import NetWorthPie from "./NetWorthPie";

export default function Home() {
    const [bankAccounts, setBankAccounts] = useState([]);
    const [investments, setInvestments] = useState([]);
    const [assets, setAssets] = useState([]);
    const [totalBankAccounts, setTotalBankAccounts] = useState(0);
    const [totalInvestments, setTotalInvestments] = useState(0);
    const [totalAssets, setTotalAssets] = useState(0);

    useEffect(() => {
        fetchData("http://localhost:3001/overview")
            .then((data) => {
                setBankAccounts(data.bankAccounts);
                setInvestments(data.investments);
                setAssets(data.assets);
                setTotalBankAccounts(data.bankAccounts.reduce((acc, a) => acc + parseFloat(a.balance), 0));
                setTotalInvestments(data.investments.reduce((acc, i) => acc + parseFloat(i.currentValue), 0));
                setTotalAssets(data.assets.reduce((acc, a) => acc + parseFloat(a.currentValue), 0));
            })
    }, [bankAccounts, investments, assets])

    return (
        <main>
            <h1>Good morning, Alex</h1>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start" }}>
                <Widget width="500px" maxHeight={"auto"}>
                    <NetWorthPie assets={assets} investments={investments} bankAccounts={bankAccounts} />
                </Widget>
                <Widget width="500px" maxHeight="400px">
                    <h2>Bank accounts: R{totalBankAccounts}</h2>
                    {bankAccounts.map((account, index) => (
                        <BankAccountDiv key={index} account={account} />
                    ))}
                </Widget>
                <Widget width="500px" maxHeight="400px">
                    <h2>Investments: R{totalInvestments}</h2>
                    {investments.map((inv, index) => (
                        <InvestmentDiv key={index} investment={inv} />
                    ))}
                </Widget>
                <Widget width="500px" maxHeight="400px">
                    <h2>Assets: R{totalAssets}</h2>
                    <div style={{ display: "flex", overflowX: "auto" }}>
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