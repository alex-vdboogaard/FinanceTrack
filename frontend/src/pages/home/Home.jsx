import { useEffect, useMemo, useState } from "react";
import Button from "../../components/button/Button";
import { fetchData } from "../../utility/fetchData";
import Widget from "../../components/widget/Widget";
import "./Home.css";
import InvestmentDiv from "./InvestmentDiv";
import BankAccountDiv from "./BankAccountDiv";
import AssetDiv from "./AssetDiv";
import NetWorthPie from "./NetWorthPie";

export default function Home() {
    const [bankAccounts, setBankAccounts] = useState([]);
    const [investments, setInvestments] = useState([]);
    const [assets, setAssets] = useState([]);

    // Calculate totals using useMemo
    const totalBankAccounts = useMemo(() =>
        bankAccounts.reduce((acc, a) => acc + parseFloat(a.balance || 0), 0),
        [bankAccounts]
    );

    const totalInvestments = useMemo(() =>
        investments.reduce((acc, i) => acc + parseFloat(i.currentValue || 0), 0),
        [investments]
    );

    const totalAssets = useMemo(() =>
        assets.reduce((acc, a) => acc + parseFloat(a.currentValue || 0), 0),
        [assets]
    );

    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";

    useEffect(() => {
        fetchData("http://localhost:3001/overview")
            .then((data) => {
                setBankAccounts(data.bankAccounts);
                setInvestments(data.investments);
                setAssets(data.assets);
            })
    }, []);

    return (
        <main>
            <h1>{greeting}, Alex</h1>
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
        </main>
    );
}
