import React, { useMemo } from "react";
import PieChart from "../../components/graph/PieChart";
import getColorShades from "../../utility/colors";

export default function NetWorthPie({ assets, bankAccounts, investments }) {
    const colors = getColorShades(3);

    const total1 = useMemo(() =>
        assets.reduce((acc, asset) => acc + parseFloat(asset.currentValue || 0), 0),
        [assets]
    );

    const total2 = useMemo(() =>
        bankAccounts.reduce((acc, account) => acc + parseFloat(account.balance || 0), 0),
        [bankAccounts]
    );

    const total3 = useMemo(() =>
        investments.reduce((acc, investment) => acc + parseFloat(investment.currentValue || 0), 0),
        [investments]
    );

    const data = [total1, total2, total3];
    const labels = ["Assets", "Bank Accounts", "Investments"];
    const totalNetWorth = total1 + total2 + total3;

    return (
        <>
            <h2>Networth: R{totalNetWorth}</h2>
            {totalNetWorth !== 0 && (
                <PieChart
                    labels={labels}
                    backgroundColors={colors}
                    data={data}
                    title={` `}
                />
            )}
        </>
    );

}
